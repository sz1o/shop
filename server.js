const express = require("express");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// === CONFIGURATION ===
const OWNER_USER = "Admin";
const OWNER_PASS = "SageStock123";
let ownerMessage = "Wanna buy? click this <a href='https://www.roblox.com/game-pass/1693266272/Account-Stock' target='_blank'>google form!</a>";

// Set up uploads folder
const UPLOAD_DIR = path.join(__dirname, "uploads");
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});
const upload = multer({ storage });

// Session setup
app.use(session({
    secret: "super-secret-key",
    resave: false,
    saveUninitialized: true
}));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(UPLOAD_DIR));

// === ROUTES ===

// Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if(username === OWNER_USER && password === OWNER_PASS){
        req.session.owner = true;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Upload images (owner only)
app.post("/upload", upload.array("images"), (req,res)=>{
    if(!req.session.owner) return res.status(403).send("Forbidden");
    const filePaths = req.files.map(f => "/uploads/" + f.filename);
    io.emit("newImages", filePaths); // notify all clients
    res.json({ uploaded: filePaths });
});

// Update owner message
app.post("/message", (req,res)=>{
    if(!req.session.owner) return res.status(403).send("Forbidden");
    ownerMessage = req.body.message || ownerMessage;
    io.emit("updateMessage", ownerMessage);
    res.json({ success: true });
});

// Delete image (owner only)
app.post("/delete", (req,res)=>{
    if(!req.session.owner) return res.status(403).send("Forbidden");
    const filename = req.body.filename;
    const filePath = path.join(UPLOAD_DIR, filename);
    if(fs.existsSync(filePath)){
        fs.unlinkSync(filePath);
        io.emit("deleteImage", filename);
        res.json({ success: true });
    } else {
        res.status(404).json({ success: false });
    }
});

// Get initial data
app.get("/data", (req,res)=>{
    const images = fs.readdirSync(UPLOAD_DIR).map(f => "/uploads/" + f);
    res.json({ images, ownerMessage });
});

// Start server
http.listen(3000, ()=>console.log("Server running on http://localhost:3000"));

// Socket.io connections
io.on("connection", socket=>{
    console.log("User connected");
});
