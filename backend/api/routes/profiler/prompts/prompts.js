// utils/prompts.js

'use strict'

const PROMPT_1_EXTRACTION = `
You are an assistant specialized in extracting company profile information from unstructured text.
Analyze the provided website text and extract the following details:

## Key Information:
* **Company Name**: The official name of the company.
* **Company Description**: A concise, one-paragraph summary of the company's mission and core offerings.
* **Service Lines**: A list of distinct services the company provides. Do not list product features as services.

This JSON schema must be followed during the extraction:
{
  "company_name": "The official name of the company.",
  "company_description": "A concise, one-paragraph summary of the company's mission and core offerings.",
  "service_line": ["An array of strings, with each string representing a distinct service line."]
}

## Example:
Website Text: """SecureCloud IT helps businesses transition to the digital-first era..."""
Correct JSON Output:
{
  "company_name": "SecureCloud IT",
  "company_description": "SecureCloud IT assists businesses in modernization by providing specialized services...",
  "service_line": ["Cybersecurity Auditing", "Cloud Migration"]
}

## Website Text to Analyze:
{scraped_text}

Output JSON:
`

const PROMPT_2_KEYWORDS = `
You are a government procurement expert and RFP (Request for Proposal) specialist with expertise in keyword strategy.
Based on the provided company profile JSON, your task is to generate two lists of keywords that this company should use to find government opportunities.

## Keyword Categories:
* **Tier 1 Keywords**: Primary, high-intent keywords for searching contract databases.
* **Tier 2 Keywords**: Secondary, broader keywords.

This JSON schema must be followed:
{
  "tier1_keywords": ["An array of 5-7 primary, high-intent keywords."],
  "tier2_keywords": ["An array of 5-7 secondary or related keywords."]
}

## Example:
Input Company Profile JSON:
{
  "company_name": "Helios Future Energy",
  "company_description": "Helios Future Energy is a full-service provider specializing in the design and installation of photovoltaic (solar) systems...",
  "service_line": ["Solar Panel Installation"]
}
Correct JSON Output:
{
  "tier1_keywords": ["photovoltaic systems", "solar panel installation", "commercial solar", "residential solar", "solar energy contractors", "EPC solar"],
  "tier2_keywords": ["renewable energy grants", "grid interconnection", "sustainable infrastructure", "net metering", "clean energy projects"]
}

## Company Profile to Analyze:
{core_profile_json}

Output JSON:
`

module.exports = {
  PROMPT_1_EXTRACTION,
  PROMPT_2_KEYWORDS
}
