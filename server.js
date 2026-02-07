const express = require("express");

const app = express();
app.use(express.json());

// GET /discovery – Opal uses this to discover your tools
app.get("/discovery", (req, res) => {
  res.json({
    functions: [
      {
        name: "meta_character_counter",
        description:
          "Validates Meta (Facebook/Instagram) ad copy against platform character limits to ensure compliance with publishing standards.",
        parameters: [
          {
            name: "primary_text",
            type: "string",
            description: "The main body copy of the Meta ad. This text is displayed prominently in feed placements.",
            required: true
          },
          {
            name: "headline",
            type: "string",
            description: "The optional headline text associated with the Meta ad.",
            required: false
          },
          {
            name: "primary_text_limit",
            type: "number",
            description: "The maximum allowed number of characters for the Meta ad primary text. Defaults to 250.",
            required: false
          },
          {
            name: "headline_limit",
            type: "number",
            description: "The maximum allowed number of characters for the Meta ad headline. Defaults to 40.",
            required: false
          },
          {
            name: "enforce_hard_limit",
            type: "boolean",
            description: "Determines whether exceeding character limits should block campaign readiness (true) or be treated as a warning (false). Defaults to true.",
            required: false
          }
        ],
        endpoint: "/tools/meta-character-counter",
        http_method: "POST",
        auth_requirements: []
      }
    ]
  });
});

// POST /tools/meta-character-counter – the tool endpoint Opal calls
app.post("/tools/meta-character-counter", (req, res) => {
  // Extract parameters
  const primary_text = req.body?.primary_text;
  const headline = req.body?.headline;
  const primary_text_limit = typeof req.body?.primary_text_limit === "number" 
    ? req.body.primary_text_limit 
    : 250;
  const headline_limit = typeof req.body?.headline_limit === "number" 
    ? req.body.headline_limit 
    : 40;
  const enforce_hard_limit = req.body?.enforce_hard_limit !== false; // Default true

  // Validate required parameter
  if (typeof primary_text !== "string") {
    return res.status(400).json({
      error: "Invalid input: `primary_text` is required and must be a string."
    });
  }

  // Normalize text (trim whitespace, handle Unicode)
  const normalized_primary_text = primary_text.trim();
  
  // Count characters for primary text
  const primary_text_count = normalized_primary_text.length;
  const primary_text_within_limit = primary_text_count <= primary_text_limit;

  // Analyze headline if provided
  let headline_result = null;
  if (headline && typeof headline === "string") {
    const normalized_headline = headline.trim();
    const headline_count = normalized_headline.length;
    const headline_within_limit = headline_count <= headline_limit;
    
    headline_result = {
      character_count: headline_count,
      character_limit: headline_limit,
      within_limit: headline_within_limit
    };
  }

  // Determine validation status and issues
  const blocking_issues = [];
  const warnings = [];

  // Check primary text
  if (!primary_text_within_limit) {
    const over_by = primary_text_count - primary_text_limit;
    const message = `Primary text exceeds ${primary_text_limit} character limit by ${over_by} characters (${primary_text_count}/${primary_text_limit})`;
    
    if (enforce_hard_limit) {
      blocking_issues.push(message);
    } else {
      warnings.push(message);
    }
  }

  // Check headline if provided
  if (headline_result && !headline_result.within_limit) {
    const over_by = headline_result.character_count - headline_limit;
    const message = `Headline exceeds ${headline_limit} character limit by ${over_by} characters (${headline_result.character_count}/${headline_limit})`;
    
    if (enforce_hard_
