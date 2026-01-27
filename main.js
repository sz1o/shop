// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
const texts = ['Freaks Shop', 'Sages Stock'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentText = texts[currentTextIndex];
    
    if (!isDeleting && currentCharIndex < currentText.length) {
        // Typing
        typewriterElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typeSpeed = 100;
    } else if (isDeleting && currentCharIndex > 0) {
        // Deleting
        typewriterElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typeSpeed = 50;
    } else if (!isDeleting && currentCharIndex === currentText.length) {
        // Finished typing, wait then start deleting
        typeSpeed = 5000; // Wait 5 seconds
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        // Finished deleting, move to next text
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        typeSpeed = 500; // Pause before starting next text
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
if (typewriterElement) {
    typeWriter();
}
