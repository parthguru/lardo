// Simple test to verify the blog API is working
const https = require('https');
const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const request = http.get(url, (response) => {
      let data = '';
      response.on('data', chunk => data += chunk);
      response.on('end', () => {
        if (response.statusCode === 200) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      });
    });
    request.on('error', reject);
  });
}

async function testAPI() {
  try {
    console.log('Testing blog data loading...');
    
    // Test index.json
    const data = await makeRequest('http://localhost:3000/data/articles/index.json');
    console.log(`✅ Successfully loaded ${data.articles.length} articles from index.json`);
    
    // Test individual article
    const firstArticle = data.articles[0];
    if (firstArticle) {
      console.log(`📰 First article: ${firstArticle.title.en}`);
      
      try {
        const articleData = await makeRequest(`http://localhost:3000/data/articles/${firstArticle.id}.json`);
        console.log(`✅ Successfully loaded individual article: ${articleData.title.en}`);
        console.log(`📝 Content length: ${articleData.content.en.length} characters`);
      } catch (error) {
        console.error(`❌ Failed to load individual article: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

testAPI();