from scholarly import scholarly
from semanticscholar import SemanticScholar
import json
import time
from typing import Dict, List
import random

def get_gscholar_citations(author_id: str) -> Dict[str, int]:
    """
    Get citation counts for all publications of an author using their Google Scholar ID.
    
    Args:
        author_id (str): The Google Scholar ID of the author
        
    Returns:
        Dict[str, int]: Dictionary mapping Google Scholar IDs to citation counts
    """
    try:
        # Add random delay to avoid rate limiting
        # time.sleep(random.uniform(2, 5))
        
        # Get the author
        author = scholarly.search_author_id(author_id)
        # Fill the author object with all publication data
        author = scholarly.fill(author)
        
        citation_counts = {}
        # Get all publications
        for pub in author.get("publications", []):
            filled_pub = scholarly.fill(pub)
            # Split the author_pub_id by colon and take the second part
            full_id = filled_pub.get('author_pub_id', '')
            paper_id = full_id.split(':')[-1] if ':' in full_id else full_id
            citation_counts[paper_id] = filled_pub.get('num_citations', 0)
            # print(paper_id, filled_pub.get('num_citations', 0))
        return citation_counts
    except Exception as e:
        print(f"Error fetching publications for author {author_id}: {str(e)}")
        return {}

def get_semanticscholar_citations(author_id: int = 143770118) -> int:
    """
    Get citation counts for a paper using its Semantic Scholar ID.
    """
    sch = SemanticScholar()
    author = sch.get_author(author_id)
    
    try:
        citation_counts = {}
        for paper in author.papers:
            citation_counts[paper.paperId] = paper.influentialCitationCount
        return citation_counts
    except Exception as e:
        print(f"Error fetching publications for author {author_id}: {str(e)}")
        return {}
        

def save_to_json(citation_counts: Dict[str, int], output_file: str = "google_citation_info.json"):
    """
    Save citation counts to a JSON file.
    
    Args:
        citation_counts (Dict[str, int]): Dictionary mapping Google Scholar IDs to citation counts
        output_file (str): Name of the output JSON file
        For semantic scholar, the key is the paperId and the value is the high influential citation count
        So we will filter the record that less than 10.
    """
    with open(output_file, 'w', encoding='utf-8') as f:
        # if output_file == "semantic_citation_info.json":
        #     citation_counts = {k: v for k, v in citation_counts.items() if v >= 10}
        json.dump(citation_counts, f, indent=4, ensure_ascii=False) 
    print(f"Citation counts saved to {output_file}")

def main():
    # Your Google Scholar ID
    g_author_id = "OlRxBhcAAAAJ"
    s_author_id = 143770118
    
    print(f"Fetching publications for google scholar author ID: {g_author_id}")
    citation_counts = get_gscholar_citations(g_author_id)
    print(f"Fetching publications for semantic scholar author ID: {s_author_id}")
    semantic_citation_counts = get_semanticscholar_citations(s_author_id)
    
    if citation_counts:
        print(f"Found {len(citation_counts)} publications")
        save_to_json(citation_counts)
    else:
        print("No publications found or error occurred")
        
    if semantic_citation_counts:
        print(f"Found {len(semantic_citation_counts)} semantic scholar publications")
        save_to_json(semantic_citation_counts, "semantic_citation_info.json")
    else:
        print("No publications found or error occurred")

if __name__ == "__main__":
    main()
