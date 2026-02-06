# Opal Custom Tool - Marketing Content Analyzer

A custom tool for Opal that analyzes marketing content for readability, sentiment, and keyword density.

## Features

- **Readability Score**: Calculates Flesch Reading Ease score
- **Sentiment Analysis**: Detects positive/negative/neutral sentiment
- **Keyword Density**: Tracks occurrence and density of target keywords
- **Word Count**: Provides basic content statistics

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

The server will run on `http://localhost:8000`

### 3. Expose with ngrok (in a separate terminal)

```bash
ngrok http 8000
```

Copy the HTTPS URL from ngrok (e.g., `https://abc123.ngrok.io`)

### 4. Register in Opal

1. Go to Opal Tools Registry
2. Click "Add Tool Registry"
3. Enter Registry URL: `https://your-ngrok-url.ngrok.io/discovery`
4. Give it a name: "Marketing Content Analyzer"
5. Save

## Testing Locally

Test the discovery endpoint:
```bash
curl http://localhost:8000/discovery
```

Test the tool:
```bash
curl -X POST http://localhost:8000/tools/analyze-marketing-content \
  -H "Content-Type: application/json" \
  -d '{
    "content": "This is amazing marketing copy! Our product is the best solution for your needs.",
    "target_keywords": ["product", "solution", "best"]
  }'
```

## API Endpoints

### Discovery Endpoint
- **GET** `/discovery`
- Returns metadata about available tools

### Tool Endpoint
- **POST** `/tools/analyze-marketing-content`
- **Request Body**:
  ```json
  {
    "content": "Your marketing text here",
    "target_keywords": ["keyword1", "keyword2"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "analysis": {
      "word_count": 15,
      "sentence_count": 2,
      "avg_words_per_sentence": 7.5,
      "readability_score": 85,
      "readability_level": "Easy (6th grade)",
      "sentiment": "positive",
      "sentiment_score": 3,
      "keyword_analysis": [...]
    }
  }
  ```

## Use Cases

This tool is perfect for:
- Analyzing blog posts before publishing
- Checking email campaign copy
- Optimizing social media content
- Ensuring brand voice consistency
- SEO keyword optimization
