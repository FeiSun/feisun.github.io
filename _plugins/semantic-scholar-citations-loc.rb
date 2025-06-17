require "active_support/all"
require 'json'

module Helpers
  extend ActiveSupport::NumberHelper
end

module Jekyll
  class SemanticScholarCitationsLocTag < Liquid::Tag
    Citations = { }

    def initialize(tag_name, params, tokens)
      super
      @paper_id = params.strip

      if @paper_id.nil? || @paper_id.empty?
        puts "Invalid paper_id provided"
      end
    end

    def render(context)
      paper_id = context[@paper_id.strip]

      begin
        # If the citation count has already been fetched, return it
        if SemanticScholarCitationsLocTag::Citations[paper_id]
          return SemanticScholarCitationsLocTag::Citations[paper_id]
        end

        # Read the JSON file
        json_file = File.join(File.dirname(File.dirname(__FILE__)), '_utils', 'semantic_citation_info.json')
        if File.exist?(json_file)
          citation_data = JSON.parse(File.read(json_file))
          citation_count = citation_data[paper_id] || 0
        else
          puts "Citation info file not found at #{json_file}"
          citation_count = 0
        end

        # Format the citation count
        citation_count = Helpers.number_to_human(citation_count, :format => '%n%u', :precision => 2, :units => { :thousand => 'K', :million => 'M', :billion => 'B' })

      rescue Exception => e
        # Handle any errors that may occur during reading
        citation_count = "N/A"
        puts "Error reading citation count for #{paper_id}: #{e.class} - #{e.message}"
      end

      SemanticScholarCitationsLocTag::Citations[paper_id] = citation_count
      return "#{citation_count}"
    end
  end
end

Liquid::Template.register_tag('semantic_scholar_citations_loc', Jekyll::SemanticScholarCitationsLocTag)
