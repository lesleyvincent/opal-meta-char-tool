const express = require("express");

const app = express();
app.use(express.json());

// GET /discovery — Opal uses this to discover your tools
app.get("/discovery", (req, res) => {
  res.json({
    functions: [
      {
        name: "meta_character_counter",
        description:
          "Counts the number of characters in a Meta post body and checks if it is within a specified limit.",
        parameters: [
          {
            name: "text",
            type: "string",
            description: "The Meta post body text to evaluate.",
            required: true
          },
          {
            name: "limit",
            type: "number",
            description: "Maximum allowed characters. Defaults to 250.",
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

// POST /tools/meta-character-counter — the tool endpoint Opal calls
app.post("/tools/meta-character-counter", (req, res) => {
  const text = req.body?.text;
  const limit = Number.isFinite(req.body?.limit) ? Number(req.body.limit) : 250;

  if (typeof text !== "string") {
    return res.status(400).json({
      error: "Invalid input: `text` must be a string."
    });
  }

  const character_count = text.length;
  const within_limit = character_count <= limit;

  res.json({
    character_count,
    within_limit,
    limit,
    over_by: within_limit ? 0 : character_count - limit
  });
});

// Optional: quick health check
app.get("/ready", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT ? Number(process.env.PORT) : 8001;
app.listen(PORT, () => {
  console.log(`Tool server running on http://localhost:${PORT}`);
  console.log(`Discovery endpoint: http://localhost:${PORT}/discovery`);
});
