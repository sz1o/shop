// Vercel Serverless Function
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (you'll set these in Vercel environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// In-memory storage (you can upgrade to a database later)
let images = [];
let ownerMessage = "Wanna buy? click this <a href='https://www.roblox.com/game-pass/1693266272/Account-Stock' target='_blank'>google form!</a>";

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    // Return current data
    res.status(200).json({ images, ownerMessage });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
