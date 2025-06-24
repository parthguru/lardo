const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;
const STRAPI_PORT = process.env.STRAPI_PORT || 1337;

// Serve Strapi API and admin
app.use('/api', createProxyMiddleware({
  target: `http://localhost:${STRAPI_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  }
}));

app.use('/admin', createProxyMiddleware({
  target: `http://localhost:${STRAPI_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/admin': '/admin'
  }
}));

app.use('/uploads', createProxyMiddleware({
  target: `http://localhost:${STRAPI_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    '^/uploads': '/uploads'
  }
}));

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch all handler for React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 Strapi Admin: http://localhost:${PORT}/admin`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
});