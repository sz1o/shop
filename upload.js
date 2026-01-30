const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const OWNER_USER = "Admin";
const OWNER_PASS = "SageStock123";

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    const { username, password, imageData } = req.body;

    // Check authentication
    if (username !== OWNER_USER || password !== OWNER_PASS) {
      return res.status(403).json({ error: 'Invalid credentials' });
    }

    try {
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(imageData, {
        folder: 'sage-stock'
      });

      res.status(200).json({ 
        success: true, 
        url: result.secure_url 
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
