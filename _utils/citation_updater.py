from scholarly import scholarly, ProxyGenerator
from semanticscholar import SemanticScholar
import json
import logging
import os
import threading
import time
from pathlib import Path
from typing import Any, Callable, Dict, Optional

import random

# --- Logging Setup ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger(__name__)

# --- Configuration ---
SCRAPER_API_KEY = None  # Optional: set your ScraperAPI key for paid proxy
SCHOLARLY_TIMEOUT = 60  # seconds per scholarly call before giving up


def setup_scholarly_proxy() -> bool:
    """Configure ScraperAPI proxy if key is provided.

    Free proxy services (sslproxies.org etc.) are unreliable and often down.
    For light usage (only 2 requests), proxy is usually unnecessary.

    Returns:
        True if a proxy was successfully configured, False otherwise.
    """
    if not SCRAPER_API_KEY:
        logger.info(
            "No proxy configured (not needed for batch author fetch — only 2 requests)."
        )
        return False

    pg = ProxyGenerator()
    logger.info("Setting up ScraperAPI proxy...")
    success = pg.ScraperAPI(SCRAPER_API_KEY)
    if success:
        scholarly.use_proxy(pg)
        logger.info("ScraperAPI proxy configured successfully.")
        return True
    logger.warning("ScraperAPI proxy setup failed. Proceeding without proxy.")
    return False


def load_json(filepath: str) -> Dict:
    """Load existing JSON data from file, returning empty dict if not found."""
    path = Path(filepath)
    if path.exists():
        try:
            with open(path, encoding="utf-8") as f:
                data = json.load(f)
            logger.info("Loaded %d existing records from '%s'.", len(data), filepath)
            return data
        except (json.JSONDecodeError, OSError) as e:
            logger.warning("Could not load '%s': %s. Starting fresh.", filepath, e)
    return {}


def save_json(data: Dict, filepath: str) -> None:
    """Atomically save dict to JSON (write to tmp then rename)."""
    tmp_path = filepath + ".tmp"
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)
    os.replace(tmp_path, filepath)


def call_with_timeout(
    func: Callable, *args: Any, timeout_sec: int = SCHOLARLY_TIMEOUT, **kwargs: Any
) -> Optional[Any]:
    """Run a function in a daemon thread with hard timeout.

    Unlike signal.SIGALRM, this cannot be swallowed by scholarly's internal
    exception handling.

    Returns:
        The function result, or None if timed out.
    """
    result: Dict[str, Any] = {}

    def _worker():
        try:
            result["value"] = func(*args, **kwargs)
        except Exception as e:
            result["error"] = e

    thread = threading.Thread(target=_worker, daemon=True)
    thread.start()
    thread.join(timeout=timeout_sec)

    if thread.is_alive():
        logger.error(
            "%s timed out after %ds (likely CAPTCHA). Daemon thread abandoned.",
            func.__name__ if hasattr(func, "__name__") else "call",
            timeout_sec,
        )
        return None

    if "error" in result:
        raise result["error"]

    return result.get("value")


def get_gscholar_citations(
    author_id: str, output_file: str = "google_citation_info.json"
) -> Dict[str, int]:
    """Get citation counts for all publications from the author profile page.

    Key optimization: scholarly.fill(author, sections=['publications']) returns
    num_citations and author_pub_id for ALL publications in a single page load
    (just 2 HTTP requests total). No need to fill each publication individually.

    Args:
        author_id: The Google Scholar author ID.
        output_file: Path to the JSON file for saving results.

    Returns:
        Dictionary mapping paper IDs to citation counts (merged old + new).
    """
    citation_counts = load_json(output_file)

    try:
        logger.info("Step 1/2: scholarly.search_author_id('%s')...", author_id)
        author = call_with_timeout(scholarly.search_author_id, author_id)
        if author is None:
            logger.error("Timed out fetching author profile. Returning existing data.")
            return citation_counts
        logger.info("  search_author_id OK.")

        time.sleep(random.uniform(1, 3))

        logger.info("Step 2/2: scholarly.fill(author, sections=['publications'])...")
        author = call_with_timeout(
            scholarly.fill, author, sections=["publications"]
        )
        if author is None:
            logger.error("Timed out filling author profile. Returning existing data.")
            return citation_counts

        pubs = author.get("publications", [])
        logger.info(
            "  Got %d publications for '%s' in 2 requests (no per-paper fetching needed).",
            len(pubs),
            author.get("name", "unknown"),
        )

        for pub in pubs:
            full_id = pub.get("author_pub_id", "")
            paper_id = full_id.split(":")[-1] if ":" in full_id else full_id
            num_citations = pub.get("num_citations", 0)
            title = pub.get("bib", {}).get("title", "<unknown>")

            citation_counts[paper_id] = num_citations
            logger.info("  %s  citations=%d  '%s'", paper_id, num_citations, title)

        save_json(citation_counts, output_file)
        logger.info(
            "All %d papers processed. Saved to '%s'.", len(pubs), output_file
        )
        return citation_counts

    except Exception as e:
        logger.error(
            "Error fetching publications for author %s: %s",
            author_id,
            e,
            exc_info=True,
        )
        if citation_counts:
            save_json(citation_counts, output_file)
            logger.info("Existing data preserved in '%s'.", output_file)
        return citation_counts


def get_semanticscholar_citations(author_id: int = 143770118) -> Dict[str, int]:
    """Get citation counts using Semantic Scholar API.

    Args:
        author_id: Semantic Scholar author ID.

    Returns:
        Dictionary mapping paper IDs to influential citation counts.
    """
    try:
        sch = SemanticScholar()
        author = sch.get_author(author_id)
        citation_counts: Dict[str, int] = {}
        for paper in author.papers:
            citation_counts[paper.paperId] = paper.influentialCitationCount
        return citation_counts
    except Exception as e:
        logger.error(
            "Error fetching Semantic Scholar publications for author %s: %s",
            author_id,
            e,
        )
        return {}


def save_to_json(
    citation_counts: Dict[str, int],
    output_file: str = "google_citation_info.json",
) -> None:
    """Save citation counts to a JSON file.

    Args:
        citation_counts: Dictionary mapping IDs to citation counts.
        output_file: Output JSON file path.
    """
    save_json(citation_counts, output_file)
    logger.info("Citation counts saved to '%s'.", output_file)


def main():
    g_author_id = "OlRxBhcAAAAJ"
    s_author_id = 143770118

    setup_scholarly_proxy()

    logger.info("=" * 50)
    logger.info("Fetching Google Scholar citations...")
    logger.info("=" * 50)
    citation_counts = get_gscholar_citations(g_author_id)

    logger.info("=" * 50)
    logger.info("Fetching Semantic Scholar citations...")
    logger.info("=" * 50)
    semantic_citation_counts = get_semanticscholar_citations(s_author_id)

    if citation_counts:
        logger.info("Google Scholar: %d records.", len(citation_counts))
        save_to_json(citation_counts)
    else:
        logger.warning("No Google Scholar publications found or error occurred.")

    if semantic_citation_counts:
        logger.info("Semantic Scholar: %d records.", len(semantic_citation_counts))
        save_to_json(semantic_citation_counts, "semantic_citation_info.json")
    else:
        logger.warning("No Semantic Scholar publications found or error occurred.")


if __name__ == "__main__":
    main()
