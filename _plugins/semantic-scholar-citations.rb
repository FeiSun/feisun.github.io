# _plugins/semantic_scholar_citations.rb

require "active_support/all"
require 'json'
require 'open-uri'

module Helpers
  extend ActiveSupport::NumberHelper
end

module Jekyll
  class SemanticScholarCitationsTag < Liquid::Tag
    # A class-level cache to store citation counts and avoid redundant lookups
    CitationsCache = {}

    def initialize(tag_name, params, tokens)
      super
      # Expecting something like {% semantic_scholar_citations some_paper_id %}
      # Or with variables, e.g. {% semantic_scholar_citations entry.sem_scholar_id %}
      splitted = params.split(" ").map(&:strip)
      @paper_id_var = splitted[0]

      if @paper_id_var.nil? || @paper_id_var.empty?
        puts "Invalid Semantic Scholar paper ID provided"
      end
    end

    def render(context)
      # Resolve the actual paper ID (handle Liquid variable if used)
      paper_id = context[@paper_id_var.strip] || @paper_id_var.strip
      
      # If we've already fetched it, just return cached
      return CitationsCache[paper_id] if CitationsCache.key?(paper_id)

      # Build the Semantic Scholar API URL
      # For docs, see: https://api.semanticscholar.org/api-docs/graph 
      # Example endpoint: https://api.semanticscholar.org/graph/v1/paper/<PAPER_ID>?fields=citationCount
      citation_count = 0
      api_url = "https://api.semanticscholar.org/graph/v1/paper/#{paper_id}?fields=citationCount"

      begin
        # Sleep to reduce the chance of being throttled if making many requests
        sleep(rand(1.5..3.5))

        # Fetch the JSON response
        response = URI.open(api_url, "User-Agent" => "Ruby/#{RUBY_VERSION}").read
        data = JSON.parse(response)

        # Extract the citationCount (if available)
        citation_count_raw = data["citationCount"] || 0

        # Convert to a human-readable format (e.g., 1.2K, 1M, etc.)
        citation_count = Helpers.number_to_human(
          citation_count_raw,
          format: '%n%u',
          precision: 2,
          units: {
            thousand: 'K',
            million: 'M',
            billion: 'B'
          }
        )
      rescue StandardError => e
        citation_count = "N/A"
        puts "Error fetching citation count for paper #{paper_id} from #{api_url}: #{e.class} - #{e.message}"
      end

      # Store and return the result
      CitationsCache[paper_id] = citation_count
      citation_count
    end
  end
end

# Register the custom tag with Liquid
Liquid::Template.register_tag('semantic_scholar_citations', Jekyll::SemanticScholarCitationsTag)