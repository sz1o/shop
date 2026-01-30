const typeEl = document.getElementById("typewriter");
const home = document.getElementById("home");
const galleryContainer = document.getElementById("galleryContainer");
const imageGallery = document.getElementById("imageGallery");
const updatesBox = document.getElementById("updatesBox");
const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

// === Typewriter ===
const text = "Sage's Service Stock";
let i = 0;
function typeWriter(){
    if(i < text.length){
        typeEl.innerHTML += text[i];
        i++;
        setTimeout(typeWriter, 100);
    } else {
        home.style.opacity = 0;
        setTimeout(()=> {
            home.style.display = "none";
            updatesBox.classList.remove("hidden");
        }, 1500);
    }
}
typeWriter();

// === Updates box ===
document.getElementById("closeUpdates").onclick = ()=>{
    updatesBox.classList.add("hidden");
    loadGallery();
};

// === Load gallery images from images.json ===
async function loadGallery(){
    galleryContainer.classList.add("show");
    
    try {
        const response = await fetch('images.json');
        const data = await response.json();
        
        if(!data.images || data.images.length === 0){
            imageGallery.innerHTML = "<p style='color:white; font-size:1.2em;'>Nothing in stock.</p>";
        } else {
            imageGallery.innerHTML = "";
            data.images.forEach(src=>{
                const img = document.createElement("img");
                img.src = src;
                img.onclick = ()=> showImageModal(src);
                imageGallery.appendChild(img);
            });
        }
    } catch (error) {
        console.error('Error loading images:', error);
        imageGallery.innerHTML = "<p style='color:white; font-size:1.2em;'>Nothing in stock.</p>";
    }
}

// === Show image modal ===
function showImageModal(src){
    modalImg.src = src;
    imageModal.classList.remove("hidden");
}

// === Close image modal ===
document.getElementById("closeImage").onclick = ()=>{
    imageModal.classList.add("hidden");
};

// === Grey Matrix Rain Background ===
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
const cols = Math.floor(width/20)+1;
const ypos = Array(cols).fill(0);

function matrix(){
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = "#888"; // GREY numbers
    ctx.font = "15px monospace";
    ypos.forEach((y, ind)=>{
        const text = Math.floor(Math.random()*10);
        ctx.fillText(text, ind*20, y);
        ypos[ind] = (y > height + Math.random()*10000) ? 0 : y + 20;
    });
}
setInterval(matrix,50);
window.addEventListener("resize", ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
