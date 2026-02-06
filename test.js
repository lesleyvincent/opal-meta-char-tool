// Test file to verify the tool works locally before deploying

const testContent = `
Introducing our amazing new product! This revolutionary solution will transform 
your marketing strategy. Our best-in-class platform delivers excellent results 
that your team will love. Don't settle for terrible alternatives when you can 
have the perfect tool for your business needs.
`;

const testKeywords = ['product', 'marketing', 'solution', 'platform'];

console.log('Testing Marketing Content Analyzer...\n');

// Test the tool endpoint
fetch('http://localhost:8000/tools/analyze-marketing-content', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    content: testContent,
    target_keywords: testKeywords
  })
})
  .then(response => response.json())
  .then(data => {
    console.log('✅ Tool Response:');
    console.log(JSON.stringify(data, null, 2));
  })
  .catch(error => {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure the server is running: npm start');
  });
