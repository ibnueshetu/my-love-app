let failedAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 60000; // 30 ሰከንድ

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    if (failedAttempts >= MAX_ATTEMPTS) {
        errorMsg.textContent = "አጭበርባሪ በመሆነዎ ለ 1 ደቂቃ ያክል ተዘግቶበዎታል!";
        setTimeout(() => {
            failedAttempts = 0;
            errorMsg.textContent = "";
        }, LOCK_TIME);
        return;
    }

    if (username === "mylove" && password === "z@123") {
        failedAttempts = 0; // የስህተት ሞክሮችን ዳግም ያስጀምሩ
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("main-app").classList.remove("hidden");
    } else {
        failedAttempts++;
        const remainingAttempts = MAX_ATTEMPTS - failedAttempts;
        errorMsg.textContent = `ትክክል ያልሆነ የይለፍ ቃል ተጠቅመዋል አላህን ይፍሩ! እረስተው ከሆነ ድጋሜ ይሞክሩ ${remainingAttempts}) አድል አለዎት`;
        
        if (failedAttempts >= MAX_ATTEMPTS) {
            errorMsg.textContent += " ስርዓቱ በጊዜያዊ ሁኔታ ተሰናክሏል።";
            setTimeout(() => {
                failedAttempts = 0;
                errorMsg.textContent = "አሁን እንደገና ለመሞከር ይችላሉ!";
            }, LOCK_TIME);
        }
    }
}


function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// Navigation and auto-close sidebar
function navigateTo(sectionId) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(sectionId).classList.add('active');

  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("open"); // Auto-close sidebar on navigation
}

// Poem display logic
function showPoem(poemId) {
  const content = {
    poem1: "My heart beats for you alone, every beat a love tone.",
    poem2: "An eternal flame that never dies, your love lights up my skies."
    
  };
  document.getElementById("poem-content").innerText = content[poemId];
}

// Slideshow functionality
let slideIndex = 1;

function showSlide(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}

function plusSlides(n) {
  showSlide(slideIndex += n);
}

function currentSlide(n) {
  showSlide(slideIndex = n);
}

// Auto slideshow every 4 seconds
function autoShowSlides() {
  slideIndex++;
  showSlide(slideIndex);
  setTimeout(autoShowSlides, 4000);
}

// Start slideshow after content is ready
document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);  // Show first slide
  autoShowSlides();       // Start automatic transition
});
function togglePoem(poemId) {
  const poem = document.getElementById(poemId);
  poem.classList.toggle("hidden");
}
let quoteIndex = 0;

function showQuotes() {
  const quotes = document.querySelectorAll(".quote-slide");
  quotes.forEach(q => q.classList.remove("active"));

  quoteIndex++;
  if (quoteIndex > quotes.length) quoteIndex = 1;

  quotes[quoteIndex - 1].classList.add("active");

  setTimeout(showQuotes, 5000); // Change every 5 seconds
}

document.addEventListener("DOMContentLoaded", showQuotes);
// ሙሉ ማያ ቪድዮ ለማሳየት
function playFullscreen(videoSrc) {
  const fullscreenDiv = document.createElement('div');
  fullscreenDiv.style.position = 'fixed';
  fullscreenDiv.style.top = '0';
  fullscreenDiv.style.left = '0';
  fullscreenDiv.style.width = '100%';
  fullscreenDiv.style.height = '100%';
  fullscreenDiv.style.backgroundColor = 'rgba(0,0,0,0.9)';
  fullscreenDiv.style.zIndex = '1000';
  fullscreenDiv.style.display = 'flex';
  fullscreenDiv.style.justifyContent = 'center';
  fullscreenDiv.style.alignItems = 'center';
  
  const video = document.createElement('video');
  video.src = videoSrc;
  video.controls = true;
  video.autoplay = true;
  video.style.maxWidth = '90%';
  video.style.maxHeight = '90%';
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '20px';
  closeBtn.style.right = '20px';
  closeBtn.style.background = 'none';
  closeBtn.style.border = 'none';
  closeBtn.style.color = 'white';
  closeBtn.style.fontSize = '30px';
  closeBtn.style.cursor = 'pointer';
  
  fullscreenDiv.appendChild(video);
  fullscreenDiv.appendChild(closeBtn);
  document.body.appendChild(fullscreenDiv);
  
  closeBtn.addEventListener('click', () => {
      document.body.removeChild(fullscreenDiv);
  });
}

// የቪድዮ ፍለጋ ባህሪ
function searchVideos() {
  const searchTerm = document.getElementById('video-search').value.toLowerCase();
  const videos = document.querySelectorAll('.video-card');
  
  videos.forEach(video => {
      const title = video.getAttribute('data-title').toLowerCase();
      if (title.includes(searchTerm)) {
          video.style.display = 'block';
      } else {
          video.style.display = 'none';
      }
  });
}

// ላይክ ባህሪ
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', function() {
      this.classList.toggle('liked');
      this.innerHTML = this.classList.contains('liked') ? 
          '<i class="bi bi-heart-fill"></i>' : 
          '<i class="bi bi-heart"></i>';
  });
});