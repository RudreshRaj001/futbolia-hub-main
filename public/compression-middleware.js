// This file can be used with Express.js or other Node.js servers
// to enable compression for better performance

const enableCompression = (app) => {
  const compression = require('compression');
  
  // Compression middleware setup
  app.use(compression({
    level: 6,
    threshold: 1024 // 1KB
  }));
  
  console.log('Compression middleware enabled');
};

module.exports = enableCompression;

/*
INTEGRATION INSTRUCTIONS:

1. For Express.js server:
   
   const express = require('express');
   const enableCompression = require('./compression-middleware');
   
   const app = express();
   
   // Enable compression middleware
   enableCompression(app);
   
   // Rest of your server code...
   app.use(express.static('dist'));

2. For Vercel or Netlify:
   Add the following to your vercel.json or netlify.toml:
   
   {
     "headers": [
       {
         "source": "/(.*)",
         "headers": [
           {
             "key": "Cache-Control",
             "value": "public, max-age=31536000, immutable"
           },
           {
             "key": "Content-Encoding",
             "value": "br"
           }
         ]
       },
       {
         "source": "/(.*)\\.js",
         "headers": [
           {
             "key": "Content-Type",
             "value": "application/javascript; charset=utf-8"
           }
         ]
       },
       {
         "source": "/(.*)\\.css",
         "headers": [
           {
             "key": "Content-Type",
             "value": "text/css; charset=utf-8"
           }
         ]
       }
     ]
   }
*/ 