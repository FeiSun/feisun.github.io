# _plugins/semantic_scholar_citations.rb

require "active_support/all"
require "json"
require "open-uri"

module Helpers
  extend ActiveSupport::NumberHelper
end

module Jekyll
  class SemanticScholarCitationsTag < Liquid::Tag
    def initialize(tag_name, params, tokens)
      super
      # Expecting something like {% semantic_scholar_citations some_paper_id %}
      @paper_id_var = params.strip

      if @paper_id_var.nil? || @paper_id_var.empty?
        puts "Invalid Semantic Scholar paper ID provided"
      end
    end

    def render(context)
      # Resolve the actual paper ID (handle Liquid variable if used)
      paper_id = context[@paper_id_var.strip] || @paper_id_var.strip

      # Build the Semantic Scholar API URL
      citation_count = 0
      max_retries = 10
      api_url = "https://api.semanticscholar.org/graph/v1/paper/#{paper_id}?fields=influentialCitationCount"
      puts "[Debug] API URL: #{api_url}"

      max_retries.times do |attempt|
        begin
          # Sleep to avoid being throttled
          sleep(rand(2.0))

          # Fetch the JSON response
          response = URI.open(api_url, "User-Agent" => "Ruby/#{RUBY_VERSION}").read
          puts "[Debug] Raw API Response: #{response}"
          data = JSON.parse(response)
          puts "[Debug] Parsed JSON: #{data.inspect}"

          # Extract influential citation count
          citation_count_raw = data["influentialCitationCount"] || 0
          puts "[Debug] raw citation count: #{citation_count_raw}"

          citation_count = Helpers.number_to_human(
            citation_count_raw,
            format: "%n%u",
            precision: 2,
            units: {
              thousand: "K",
              million: "M",
              billion: "B"
            }
          )
          puts "[Debug] Formatted citation count: #{citation_count}"

          # Exit the retry loop if successful
          break
        rescue StandardError => e
          puts "Attempt #{attempt + 1} failed for #{paper_id}: #{e.class} - #{e.message}"
          citation_count = "N/A" if attempt + 1 >= max_retries
        end
      end

      # Return the result
      # final_value = citation_count.to_s.strip.empty? ? "N/A" : citation_count.to_s.strip
      # puts "Debug - Final citation count for #{paper_id}: '#{final_value}'"
      # final_value
      puts "[Debug] Final return value: '#{citation_count}'"

      return "#{citation_count}"
    end
  end
end

# Register the custom tag with Liquid
Liquid::Template.register_tag("semantic_scholar_citations", Jekyll::SemanticScholarCitationsTag)