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
      #   return CitationsCache[paper_id] if CitationsCache.key?(paper_id)

      # Build the Semantic Scholar API URL
      # For docs, see: https://api.semanticscholar.org/api-docs/graph 
      # Example endpoint: https://api.semanticscholar.org/graph/v1/paper/<PAPER_ID>?fields=citationCount
      citation_count = 0
      api_url = "https://api.semanticscholar.org/graph/v1/paper/#{paper_id}?fields=influentialCitationCount"

      begin
        # Sleep to reduce the chance of being throttled if making many requests
        # sleep(rand(1.5..3.5))

        max_retries = 5
        attempt = 0

        max_retries.times do |attempt|
            begin
                sleep(rand(1.5..3.5))
                # Fetch the JSON response
                response = URI.open(api_url, "User-Agent" => "Ruby/#{RUBY_VERSION}").read
                data = JSON.parse(response)
                citation_count_raw = data["citationCount"] || 0
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
                break
            rescue StandardError => e
                puts "Attempt #{attempt} failed for #{paper_id}: #{e.class} - #{e.message}"
                citation_count = "N/A" if attempt >= max_retries
            end
        end

      # Store and return the result
      #   CitationsCache[paper_id] = citation_count
      citation_count
    end
  end
end

# Register the custom tag with Liquid
Liquid::Template.register_tag('semantic_scholar_citations', Jekyll::SemanticScholarCitationsTag)