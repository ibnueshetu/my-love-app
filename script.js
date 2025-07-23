let failedAttempts = 0;
const MAX_ATTEMPTS = 3;
const LOCK_TIME = 60000; // 1 minute

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

    if (username === "1" && password === "1") {
        failedAttempts = 0;
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("main-app").classList.remove("hidden");
    } else {
        failedAttempts++;
        const remainingAttempts = MAX_ATTEMPTS - failedAttempts;
        errorMsg.textContent = `ትክክል ያልሆነ የይለፍ ቃል ተጠቅመዋል አላህን ይፍሩ! እረስተው ከሆነ ድጋሜ ይሞክሩ ${remainingAttempts} አድል አለዎት`;
        
        if (failedAttempts >= MAX_ATTEMPTS) {
            errorMsg.textContent += " ስርዓቱ በጊዜያዊ ሁኔታ ተሰናክሏል።";
            setTimeout(() => {
                failedAttempts = 0;
                errorMsg.textContent = "አሁን እንደገና ለመሞከር ይችላሉ!";
            }, LOCK_TIME);
        }
    }
}

let sidebarOpen = false;

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebarOpen = !sidebarOpen;
    
    if (sidebarOpen) {
        sidebar.classList.add("open");
        createOverlay();
    } else {
        sidebar.classList.remove("open");
        removeOverlay();
    }
}

function createOverlay() {
    const overlay = document.createElement("div");
    overlay.id = "sidebar-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "70px";
    overlay.style.left = "0";
    overlay.style.right = "0";
    overlay.style.bottom = "0";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
    overlay.style.zIndex = "40";
    overlay.onclick = toggleSidebar;
    document.body.appendChild(overlay);
}

function removeOverlay() {
    const overlay = document.getElementById("sidebar-overlay");
    if (overlay) {
        overlay.remove();
    }
}

function navigateTo(sectionId) {
    document.querySelectorAll('.section').forEach(s => {
        s.classList.remove('active');
    });
    
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
    
    if (sidebarOpen) {
        toggleSidebar();
    }
    
    const content = document.querySelector('.content');
    if (content) {
        content.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function togglePoem(poemId) {
    const poem = document.getElementById(poemId);
    poem.classList.toggle("hidden");
}

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

function autoShowSlides() {
    plusSlides(1);
    setTimeout(autoShowSlides, 4000);
}

let quoteIndex = 0;

function showQuotes() {
    const quotes = document.querySelectorAll(".quote-slide");
    quotes.forEach(q => q.classList.remove("active"));

    quoteIndex++;
    if (quoteIndex > quotes.length) quoteIndex = 1;

    quotes[quoteIndex - 1].classList.add("active");

    setTimeout(showQuotes, 5000);
}

/* ====================== */
/* ENHANCED VIDEO SECTION */
/* ====================== */

function createHearts(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['❤️', '💖', '💗', '💓', '💘'];
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = `${rect.left + rect.width/2}px`;
        heart.style.top = `${rect.top}px`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.opacity = '1';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        document.body.appendChild(heart);
        
        const animation = heart.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translateY(-${Math.random() * 100 + 50}px) translateX(${(Math.random() - 0.5) * 50}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => heart.remove();
    }
}

function playFullscreen(videoSrc) {
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.style.position = 'fixed';
    fullscreenDiv.style.top = '0';
    fullscreenDiv.style.left = '0';
    fullscreenDiv.style.width = '100%';
    fullscreenDiv.style.height = '100%';
    fullscreenDiv.style.backgroundColor = 'rgba(0,0,0,0.95)';
    fullscreenDiv.style.zIndex = '1000';
    fullscreenDiv.style.display = 'flex';
    fullscreenDiv.style.flexDirection = 'column';
    fullscreenDiv.style.justifyContent = 'center';
    fullscreenDiv.style.alignItems = 'center';
    fullscreenDiv.style.padding = '20px';
    fullscreenDiv.style.boxSizing = 'border-box';
    
    const videoContainer = document.createElement('div');
    videoContainer.style.position = 'relative';
    videoContainer.style.width = '90%';
    videoContainer.style.maxWidth = '900px';
    videoContainer.style.borderRadius = '10px';
    videoContainer.style.overflow = 'hidden';
    videoContainer.style.boxShadow = '0 0 0 3px #e91e63, 0 0 20px rgba(233, 30, 99, 0.5)';
    
    const video = document.createElement('video');
    video.src = videoSrc;
    video.controls = true;
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = '80vh';
    video.style.display = 'block';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '15px';
    closeBtn.style.right = '15px';
    closeBtn.style.background = 'rgba(233, 30, 99, 0.8)';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.width = '40px';
    closeBtn.style.height = '40px';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.fontSize = '20px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.display = 'flex';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.transition = 'all 0.3s ease';
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.transform = 'scale(1.1)';
        closeBtn.style.background = 'rgba(233, 30, 99, 1)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.transform = 'scale(1)';
        closeBtn.style.background = 'rgba(233, 30, 99, 0.8)';
    });
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(fullscreenDiv);
    });
    
    videoContainer.appendChild(video);
    videoContainer.appendChild(closeBtn);
    fullscreenDiv.appendChild(videoContainer);
    
    const videoCard = document.querySelector(`video[src="${videoSrc}"]`).closest('.video-card');
    if (videoCard) {
        const title = videoCard.querySelector('h3')?.textContent;
        if (title) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = title;
            titleElement.style.color = 'white';
            titleElement.style.marginTop = '15px';
            titleElement.style.fontFamily = '"Dancing Script", cursive, "Noto Sans Ethiopic", sans-serif';
            titleElement.style.fontSize = '1.8rem';
            titleElement.style.textAlign = 'center';
            fullscreenDiv.appendChild(titleElement);
        }
    }
    
    document.body.appendChild(fullscreenDiv);
}

function searchVideos() {
    const searchTerm = document.getElementById('video-search').value.toLowerCase();
    const videos = document.querySelectorAll('.video-card');
    const noResults = document.getElementById('no-video-results');
    
    let hasResults = false;
    
    videos.forEach(video => {
        const title = video.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            video.style.display = 'block';
            hasResults = true;
        } else {
            video.style.display = 'none';
        }
    });
    
    if (!hasResults) {
        if (!noResults) {
            const noResultsMsg = document.createElement('div');
            noResultsMsg.id = 'no-video-results';
            noResultsMsg.textContent = 'No videos found matching your search';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = '2rem';
            noResultsMsg.style.color = '#e91e63';
            noResultsMsg.style.fontFamily = '"Dancing Script", cursive';
            noResultsMsg.style.fontSize = '1.5rem';
            document.querySelector('.video-gallery').appendChild(noResultsMsg);
        }
    } else if (noResults) {
        noResults.remove();
    }
}

function initVideoSection() {
    document.querySelectorAll('.video-card').forEach(card => {
      const video = card.querySelector('video');
      const playBtn = card.querySelector('.play-btn');
      
      // Ensure video has controls
      if (video) {
        video.controls = true;
        
        // Click to play (fallback for autoplay restrictions)
        video.addEventListener('click', (e) => {
          e.stopPropagation();
          if (video.paused) {
            video.play();
            playBtn.style.display = 'none';
          } else {
            video.pause();
            playBtn.style.display = 'block';
          }
        });
      }
  
      // Play button visibility
      if (playBtn) {
        playBtn.style.display = 'block'; // Force show initially
        
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          playFullscreen(video.src);
        });
      }
    });
  }

document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('liked');
        
        if (this.classList.contains('liked')) {
            this.innerHTML = '<i class="bi bi-heart-fill"></i>';
            createHearts(this);
        } else {
            this.innerHTML = '<i class="bi bi-heart"></i>';
        }
    });
});

document.querySelector('.youtube-container')?.addEventListener('click', function() {
    this.querySelector('iframe').src += "&autoplay=1";
});

document.addEventListener("DOMContentLoaded", () => {
    showSlide(slideIndex);
    autoShowSlides();
    showQuotes();
    initVideoSection();
    
    document.querySelectorAll('.sidebar li').forEach(item => {
        item.addEventListener('click', function(e) {
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            navigateTo(sectionId);
            e.preventDefault();
        });
    });
});
function logout() {
    // Hide main app, show login screen
    document.getElementById("main-app").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
    
    // Clear input fields
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    
    // Reset error message
    document.getElementById("error-msg").textContent = "";
}

// Add event listener (place this in your DOMContentLoaded or at the bottom of script.js)
document.getElementById("logout-btn")?.addEventListener("click", logout);
// YouTube API Loader
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
  
  // Initialize players after API loads
  function initYouTubePlayers() {
    document.querySelectorAll('.youtube-embed').forEach(embed => {
      const videoId = embed.dataset.id;
      
      new YT.Player(embed, {
        videoId: videoId,
        playerVars: {
          'autoplay': 0,
          'controls': 1,
          'rel': 0, // Disable related videos
          'modestbranding': 1, // Smaller YouTube logo
          'fs': 1 // Allow fullscreen
        },
        events: {
          'onReady': (event) => {
            // Optional: Custom play button overlay
            embed.parentElement.querySelector('.play-btn')?.addEventListener('click', () => {
              event.target.playVideo();
            });
          }
        }
      });
    });
  }
  
  // Call this when page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadYouTubeAPI();
    window.onYouTubeIframeAPIReady = initYouTubePlayers;
  });