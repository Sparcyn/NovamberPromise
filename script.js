// ===== Configuration =====
const VIEWABLE_ITEMS = [
    // Places
    'place-arab-sea', 'place-misfat', 'place-nazwa1', 'place-nazwa2', 
    'place-nazwa3', 'place-sohar', 'place-bathroom', 'place-bus', 
    'place-room', 'place-mall',
    // Characters
    'char-youssef', 'char-waleed', 'char-sulaiman', 'char-khaled', 
    'char-stu', 'char-omar',
    // Audio
    'audio-oman', 'audio-speech',
    // AI Demo
    'ai-demo'
];

const PLACE_DATA = {
    'arab-sea': {
        title: 'البحر العربي',
        real: 'Places Converted/REAL/Arab sea.jpg',
        converted: 'Places Converted/Converted/Arab Sea.png',
        video: 'Places Converted/Converted/arab sea video.mp4'
    },
    'misfat': {
        title: 'مسفاة العبريين',
        real: 'Places Converted/REAL/Misfat-Al-Abriyeen – Oman\'s Mountain Oasis Village.webp',
        converted: 'Places Converted/Converted/Misfat-Al-Abriyeen – Oman\'s Mountain Oasis Village.png',
        video: 'Places Converted/Converted/Misfat-Al-Abriyeen – Oman\'s Mountain Oasis Village.mp4'
    },
    'nazwa1': {
        title: 'نزوى 1',
        real: 'Places Converted/REAL/Nazwa 1.png',
        converted: 'Places Converted/Converted/Nazwa 1.png',
        video: 'Places Converted/Converted/Nazwa 1.mp4'
    },
    'nazwa2': {
        title: 'نزوى 2',
        real: 'Places Converted/REAL/Nazwa 2.png',
        converted: 'Places Converted/Converted/Nazwa 2.png',
        video: 'Places Converted/Converted/Nazwa 2.mp4'
    },
    'nazwa3': {
        title: 'نزوى 3',
        real: 'Places Converted/REAL/Nazwa 3.png',
        converted: 'Places Converted/Converted/Nazwa 3.png',
        video: 'Places Converted/Converted/Nazwa 3.mp4'
    },
    'sohar': {
        title: 'قلعة صحار',
        real: 'Places Converted/REAL/Museum of Sohar Fort.webp',
        converted: 'Places Converted/Converted/Suhar fort.png',
        video: 'Places Converted/Converted/Suhar fort.mp4'
    }
};

const CHARACTER_DATA = {
    'waleed': {
        title: 'أ. وليد الغافري',
        converted: ['شخصيات في الفيلم/Converted/أ.وليد الغافري.jpg', 'شخصيات في الفيلم/Converted/أ.وليد الغافري2.jpg'],
        real: 'شخصيات في الفيلم/REAL/أ.وليد الغافري'
    },
    'sulaiman': {
        title: 'أ. سليمان الجابري',
        converted: ['شخصيات في الفيلم/Converted/أ.سليمان الجابري.png'],
        real: 'شخصيات في الفيلم/REAL/أ.سليمان الجابري'
    },
    'khaled': {
        title: 'أ. خالد الحسني',
        converted: ['شخصيات في الفيلم/Converted/T.Khaled Al-Hassani.png', 'شخصيات في الفيلم/Converted/T.Khaled Al-Hassani Close-Up.png', 'شخصيات في الفيلم/Converted/خالد الحسني.jpg'],
        real: 'شخصيات في الفيلم/REAL/T.Khaled Al-Hassani'
    },
    'stu': {
        title: 'Stu',
        converted: ['شخصيات في الفيلم/Converted/Stu.jpg', 'شخصيات في الفيلم/Converted/stu (close up).png'],
        real: 'شخصيات في الفيلم/REAL/Stu'
    },
    'omar': {
        title: 'أ. عمر الظاهري',
        converted: ['شخصيات في الفيلم/Converted/T.Omar Alzahiri.png'],
        real: 'شخصيات في الفيلم/REAL/T.Omar Alzahiri'
    }
};

// ===== State Management =====
let viewedItems = new Set();

// Load viewed items from localStorage
function loadProgress() {
    const saved = localStorage.getItem('omanFilmProgress');
    if (saved) {
        viewedItems = new Set(JSON.parse(saved));
    }
    updateProgress();
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('omanFilmProgress', JSON.stringify([...viewedItems]));
    updateProgress();
}

// Mark item as viewed
function markAsViewed(itemId) {
    if (!viewedItems.has(itemId)) {
        viewedItems.add(itemId);
        saveProgress();
        
        // Add visual feedback
        const element = document.querySelector(`[data-item-id="${itemId}"]`);
        if (element) {
            element.classList.add('viewed');
        }
    }
}

// Update progress bars
function updateProgress() {
    const total = VIEWABLE_ITEMS.length;
    const viewed = viewedItems.size;
    const percentage = (viewed / total) * 100;
    
    // Update top progress bar
    document.documentElement.style.setProperty('--progress-width', `${percentage}%`);
    document.getElementById('viewedCount').textContent = viewed;
    document.getElementById('totalCount').textContent = total;
    
    // Update percentage display
    const percentageElement = document.getElementById('progressPercentage');
    if (percentageElement) {
        percentageElement.textContent = Math.round(percentage) + '%';
    }
    
    // Update unlock progress
    document.documentElement.style.setProperty('--unlock-progress', `${percentage}%`);
    document.getElementById('unlockViewedCount').textContent = viewed;
    document.getElementById('unlockTotalCount').textContent = total;
    
    // Check if film should be unlocked
    if (viewed === total) {
        unlockFilm();
    }
}

// Unlock the final film
function unlockFilm() {
    document.getElementById('filmLocked').style.display = 'none';
    document.getElementById('filmUnlocked').style.display = 'block';
    
    // Confetti effect
    createConfetti();
    
    setTimeout(() => {
        alert('🎉 تهانينا! لقد شاهدت جميع المحتويات وفتحت الفيلم النهائي!');
    }, 300);
}

// ===== Scroll Functions =====
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===== Modal Functions =====
function openComparison(placeId) {
    const data = PLACE_DATA[placeId];
    if (!data) return;
    
    const modal = document.getElementById('comparisonModal');
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalRealImage').src = data.real;
    document.getElementById('modalConvertedImage').src = data.converted;
    
    // Show video if available
    const videoContainer = document.getElementById('modalVideo');
    const videoPlayer = document.getElementById('modalVideoPlayer');
    if (data.video) {
        videoPlayer.src = data.video;
        videoContainer.style.display = 'block';
    } else {
        videoContainer.style.display = 'none';
    }
    
    modal.classList.add('open');
    markAsViewed(`place-${placeId}`);
}

function closeModal() {
    const modal = document.getElementById('comparisonModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
    
    // Pause and reset video
    const videoPlayer = document.getElementById('modalVideoPlayer');
    if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }
    
    // Reset modal state - show all elements
    const mainImage = document.querySelector('.modal-main-image');
    const comparisonContainer = document.querySelector('.comparison-slider-container');
    const videoContainer = document.getElementById('modalVideo');
    
    if (mainImage) mainImage.style.display = 'block';
    if (comparisonContainer) comparisonContainer.style.display = 'block';
    if (videoContainer) {
        videoContainer.classList.remove('video-only');
        const videoTitle = videoContainer.querySelector('h4');
        if (videoTitle) videoTitle.style.display = 'block';
    }
}

function openCharacterComparison(charId) {
    const data = CHARACTER_DATA[charId];
    if (!data) return;
    
    const modal = document.getElementById('characterModal');
    document.getElementById('characterModalTitle').textContent = data.title;
    
    const grid = document.getElementById('characterComparisonGrid');
    grid.innerHTML = '';
    
    // Add converted images
    data.converted.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'character-comparison-item';
        item.innerHTML = `
            <img src="${img}" alt="${data.title} - نسخة ${index + 1}">
            <p>نسخة الذكاء الاصطناعي ${index + 1}</p>
        `;
        grid.appendChild(item);
    });
    
    // Add note about real images
    const note = document.createElement('div');
    note.className = 'character-comparison-item';
    note.innerHTML = `
        <div style="padding: 2rem; background: rgba(139, 21, 56, 0.1); border-radius: 16px; border: 1px solid var(--color-primary);">
            <p style="color: var(--color-text-secondary); text-align: center;">
                <i class="fas fa-lock" style="color: var(--color-primary); font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                صور الشخصيات الحقيقية تم تشويشها حتى الحصول على إذن وللحفاظ على الخصوصية
            </p>
        </div>
    `;
    grid.appendChild(note);
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    markAsViewed(`char-${charId}`);
}

function closeCharacterModal() {
    const modal = document.getElementById('characterModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== Audio Functions =====
function setupAudioTracking() {
    const audioOman = document.getElementById('audio-oman-player');
    const audioSpeech = document.getElementById('audio-speech-player');
    
    let omanPlayed = false;
    let speechPlayed = false;
    
    audioOman.addEventListener('play', () => {
        if (!omanPlayed) {
            markAsViewed('audio-oman');
            omanPlayed = true;
        }
    });
    
    audioSpeech.addEventListener('play', () => {
        if (!speechPlayed) {
            markAsViewed('audio-speech');
            speechPlayed = true;
        }
    });
}

// ===== Transcript Toggle =====
function toggleTranscript() {
    const content = document.getElementById('transcript-content');
    const toggleText = document.getElementById('transcript-toggle-text');
    const arrow = document.getElementById('transcript-arrow');
    
    if (content.classList.contains('open')) {
        content.classList.remove('open');
        toggleText.textContent = 'عرض النص المكتوب';
        arrow.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('open');
        toggleText.textContent = 'إخفاء النص المكتوب';
        arrow.style.transform = 'rotate(180deg)';
    }
}

// ===== Intersection Observer for View Tracking =====
function setupIntersectionObserver() {
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const itemId = entry.target.dataset.itemId;
                if (itemId && VIEWABLE_ITEMS.includes(itemId)) {
                    // Mark as viewed after 2 seconds of viewing
                    setTimeout(() => {
                        if (entry.isIntersecting) {
                            markAsViewed(itemId);
                        }
                    }, 2000);
                }
            }
        });
    }, options);
    
    // Observe all items with data-item-id
    document.querySelectorAll('[data-item-id]').forEach(element => {
        observer.observe(element);
    });
}

// ===== Smooth Scroll Progress =====
function updateScrollProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    
    // You can use this for additional effects if needed
}

window.addEventListener('scroll', updateScrollProgress);

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCharacterModal();
    }
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    setupAudioTracking();
    setupIntersectionObserver();
    
    // Add viewed class to already viewed items
    viewedItems.forEach(itemId => {
        const element = document.querySelector(`[data-item-id="${itemId}"]`);
        if (element) {
            element.classList.add('viewed');
        }
    });
    
    console.log('🎬 Behind the Scenes website loaded successfully!');
    console.log(`📊 Progress: ${viewedItems.size}/${VIEWABLE_ITEMS.length} items viewed`);
});

// ===== Premium Audio Player Functions =====
const audioPlayers = {
    oman: null,
    speech: null
};

function initAudioPlayers() {
    audioPlayers.oman = document.getElementById('audio-oman-player');
    audioPlayers.speech = document.getElementById('audio-speech-player');
    
    // Setup event listeners for both players
    Object.keys(audioPlayers).forEach(key => {
        const audio = audioPlayers[key];
        if (!audio) return;
        
        audio.addEventListener('loadedmetadata', () => {
            document.getElementById(`duration-${key}`).textContent = formatTime(audio.duration);
        });
        
        audio.addEventListener('timeupdate', () => {
            updateProgress(key);
        });
        
        audio.addEventListener('ended', () => {
            document.getElementById(`play-icon-${key}`).className = 'fas fa-play';
            document.getElementById(`premium-player-${key}`).classList.remove('playing');
        });
    });
}

function togglePlay(playerId) {
    const audio = audioPlayers[playerId];
    const playIcon = document.getElementById(`play-icon-${playerId}`);
    const player = document.getElementById(`premium-player-${playerId}`);
    
    if (!audio || !playIcon || !player) return;
    
    if (audio.paused) {
        audio.play().catch(err => {
            console.error('Error playing audio:', err);
        });
        playIcon.className = 'fas fa-pause';
        player.classList.add('playing');
    } else {
        audio.pause();
        playIcon.className = 'fas fa-play';
        player.classList.remove('playing');
    }
}

function updateProgress(playerId) {
    const audio = audioPlayers[playerId];
    const progress = document.getElementById(`progress-${playerId}`);
    const currentTime = document.getElementById(`current-time-${playerId}`);
    
    if (!audio || !progress || !currentTime) return;
    
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percentage + '%';
    currentTime.textContent = formatTime(audio.currentTime);
    
    // Update subtitles for speech
    if (playerId === 'speech') {
        updateSubtitles(audio.currentTime);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function toggleMute(playerId) {
    const audio = audioPlayers[playerId];
    const volumeIcon = document.getElementById(`volume-icon-${playerId}`);
    const volumeSlider = document.getElementById(`volume-${playerId}`);
    
    if (!audio || !volumeIcon || !volumeSlider) return;
    
    if (audio.muted) {
        audio.muted = false;
        volumeIcon.className = 'fas fa-volume-up';
        volumeSlider.value = audio.volume * 100;
    } else {
        audio.muted = true;
        volumeIcon.className = 'fas fa-volume-mute';
    }
}

function changeVolume(playerId) {
    const audio = audioPlayers[playerId];
    const volumeSlider = document.getElementById(`volume-${playerId}`);
    const volumeIcon = document.getElementById(`volume-icon-${playerId}`);
    
    if (!audio || !volumeSlider || !volumeIcon) return;
    
    audio.volume = volumeSlider.value / 100;
    audio.muted = false;
    
    if (audio.volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (audio.volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
}

// ===== Subtitles System =====
const subtitles = [
    { start: 0, end: 8, text: "في هذا اليوم… لا نحتفل فقط بتاريخٍ كُتب… بل نحتفل بأيدٍ ستكتب ما بعده." },
    { start: 8, end: 16, text: "في هذا اليوم… نتذكر رجلاً بنى… ورجالاً حملوا… ونحن جيلٌ أقسم ألا يترك الشعلة تنطفئ." },
    { start: 16, end: 28, text: "في العشرين من نوفمبر… نحن لا نُعيد مجرد ذكرى، بل نُعيد وعداً: أن تظل هذه الأرض عالية… وهذه الراية خفّاقة… وهذا الوطن ممتداً في قلوبنا قبل خرائطنا." },
    { start: 28, end: 40, text: "ونعدكم… أننا سنكون جيلاً يبني، يفكر… يعمل… يتقدم… ويحمل المشعل بيدٍ لا ترتجف، وقلبٍ لا يتراجع، وروحٍ لا تنكسر." }
];

function updateSubtitles(currentTime) {
    const subtitleElement = document.querySelector('#subtitles-speech .subtitle-text');
    if (!subtitleElement) return;
    
    const currentSubtitle = subtitles.find(sub => 
        currentTime >= sub.start && currentTime < sub.end
    );
    
    if (currentSubtitle) {
        // Split text into 4-word chunks
        const words = currentSubtitle.text.split(' ');
        const chunks = [];
        for (let i = 0; i < words.length; i += 4) {
            chunks.push(words.slice(i, i + 4).join(' '));
        }
        subtitleElement.textContent = chunks.join(' • ');
        subtitleElement.style.opacity = '1';
    } else {
        subtitleElement.style.opacity = '0.3';
        subtitleElement.textContent = '...';
    }
}

// ===== Video Player Functions =====
function playModalVideo() {
    const video = document.getElementById('modalVideoPlayer');
    const overlay = document.querySelector('.video-play-overlay');
    
    if (video) {
        if (video.paused) {
            video.play();
            overlay.classList.add('hidden');
        } else {
            video.pause();
            overlay.classList.remove('hidden');
        }
    }
}

// Setup video controls
function setupVideoControls() {
    const video = document.getElementById('modalVideoPlayer');
    if (!video) return;
    
    video.addEventListener('play', () => {
        const overlay = document.querySelector('.video-play-overlay');
        if (overlay) overlay.classList.add('hidden');
    });
    
    video.addEventListener('pause', () => {
        const overlay = document.querySelector('.video-play-overlay');
        if (overlay) overlay.classList.remove('hidden');
    });
    
    video.addEventListener('ended', () => {
        const overlay = document.querySelector('.video-play-overlay');
        if (overlay) overlay.classList.remove('hidden');
    });
    
    // Make video clickable
    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// ===== Enhanced Modal Functions =====
function openComparison(placeId) {
    const data = PLACE_DATA[placeId];
    if (!data) return;
    
    const modal = document.getElementById('comparisonModal');
    document.getElementById('modalTitle').textContent = data.title;
    
    // Set main image
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.src = data.converted;
        mainImg.style.display = 'block';
    }
    
    // Set images for comparison slider
    const realImg = document.getElementById('modalRealImage');
    const convertedImg = document.getElementById('modalConvertedImage');
    
    realImg.src = data.real;
    convertedImg.src = data.converted;
    
    // Show main image and comparison slider
    const mainImage = document.querySelector('.modal-main-image');
    const comparisonContainer = document.querySelector('.comparison-slider-container');
    if (mainImage) mainImage.style.display = 'block';
    if (comparisonContainer) comparisonContainer.style.display = 'block';
    
    // Remove video-only class if present and reset video container
    const videoContainer = document.getElementById('modalVideo');
    const videoPlayer = document.getElementById('modalVideoPlayer');
    const videoOverlay = document.querySelector('.video-play-overlay');
    
    if (videoContainer) {
        videoContainer.classList.remove('video-only');
        const videoTitle = videoContainer.querySelector('h4');
        if (videoTitle) videoTitle.style.display = 'block';
    }
    
    if (data.video) {
        const source = videoPlayer.querySelector('source');
        if (source) {
            source.src = data.video;
        } else {
            videoPlayer.src = data.video;
        }
        videoPlayer.load();
        videoPlayer.poster = data.converted;
        videoPlayer.controls = true;
        videoContainer.style.display = 'block';
        if (videoOverlay) videoOverlay.classList.remove('hidden');
        
        // Setup video controls after loading
        setTimeout(setupVideoControls, 100);
    } else {
        videoContainer.style.display = 'none';
    }
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    markAsViewed(`place-${placeId}`);
}

// ===== Play Place Video =====
function playPlaceVideo(placeId) {
    const data = PLACE_DATA[placeId];
    if (!data || !data.video) return;
    
    const modal = document.getElementById('comparisonModal');
    document.getElementById('modalTitle').textContent = data.title;
    
    // Hide main image and comparison slider
    const mainImage = document.querySelector('.modal-main-image');
    const comparisonContainer = document.querySelector('.comparison-slider-container');
    if (mainImage) mainImage.style.display = 'none';
    if (comparisonContainer) comparisonContainer.style.display = 'none';
    
    // Show and setup video
    const videoContainer = document.getElementById('modalVideo');
    const videoPlayer = document.getElementById('modalVideoPlayer');
    
    if (videoContainer && videoPlayer) {
        videoContainer.classList.add('video-only');
        const source = videoPlayer.querySelector('source');
        if (source) {
            source.src = data.video;
        } else {
            videoPlayer.src = data.video;
        }
        videoPlayer.load();
        videoPlayer.poster = data.converted;
        videoPlayer.controls = true;
        videoContainer.style.display = 'block';
        
        // Remove h4 title for video-only mode
        const videoTitle = videoContainer.querySelector('h4');
        if (videoTitle) videoTitle.style.display = 'none';
    }
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    
    // Auto-play video after modal opens
    setTimeout(() => {
        if (videoPlayer) {
            videoPlayer.play().catch(err => {
                console.error('Error playing video:', err);
            });
        }
    }, 500);
    
    markAsViewed(`place-${placeId}`);
}

// ===== Preview Image =====
function previewImage(imageSrc, title) {
    const modal = document.getElementById('comparisonModal');
    document.getElementById('modalTitle').textContent = title;
    
    // Set main image
    const mainImg = document.getElementById('modalMainImage');
    if (mainImg) {
        mainImg.src = imageSrc;
    }
    
    // Hide comparison slider and video
    const comparisonContainer = document.querySelector('.comparison-slider-container');
    const videoContainer = document.getElementById('modalVideo');
    if (comparisonContainer) comparisonContainer.style.display = 'none';
    if (videoContainer) videoContainer.style.display = 'none';
    
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Check which places have videos and show play buttons
function setupVideoButtons() {
    document.querySelectorAll('[data-place-id]').forEach(card => {
        const placeId = card.dataset.placeId;
        const data = PLACE_DATA[placeId];
        if (data && data.video) {
            const playBtn = card.querySelector('.video-play-btn-card');
            if (playBtn) {
                playBtn.style.display = 'flex';
            }
        }
    });
}

// ===== Preview Character Image =====
function previewCharacterImage(imageSrc, title) {
    previewImage(imageSrc, title);
}

// ===== Switch Character Version =====
function switchCharacterVersion(charId, versionIndex) {
    const data = CHARACTER_DATA[charId];
    if (!data || !data.converted[versionIndex]) return;
    
    const card = document.querySelector(`[data-character-id="${charId}"]`);
    if (!card) return;
    
    const img = card.querySelector('.character-image');
    if (img) {
        img.src = data.converted[versionIndex];
    }
    
    // Update active button
    const buttons = card.querySelectorAll('.version-btn');
    buttons.forEach((btn, index) => {
        if (index === versionIndex) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ===== Filter Places =====
function filterPlaces(category) {
    const cards = document.querySelectorAll('.place-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.filter-btn').classList.add('active');
    
    // Clear search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    document.querySelector('.clear-search').style.display = 'none';
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            const cardCategory = card.dataset.category;
            if (cardCategory === category) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// ===== Search Places =====
function searchPlaces() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.place-card');
    const clearBtn = document.querySelector('.clear-search');
    
    // Show/hide clear button
    clearBtn.style.display = searchTerm ? 'block' : 'none';
    
    // Reset filters
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.filter-btn').classList.add('active');
    
    // Search
    cards.forEach(card => {
        const placeName = card.querySelector('.place-name');
        if (placeName) {
            const text = placeName.textContent.toLowerCase();
            if (text.includes(searchTerm) || searchTerm === '') {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// ===== Clear Search =====
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = '';
    document.querySelector('.clear-search').style.display = 'none';
    searchPlaces();
}

// ===== Stats Counter Animation =====
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ===== Theme Toggle =====
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
}

// ===== Scroll to Top Button =====
function createScrollToTop() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
}

// ===== Keyboard Shortcuts =====
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape key
        if (e.key === 'Escape') {
            closeModal();
            closeCharacterModal();
        }
        
        // Space bar for audio play/pause
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            const activeAudio = document.querySelector('.premium-player.playing');
            if (activeAudio) {
                const playerId = activeAudio.id.includes('oman') ? 'oman' : 'speech';
                togglePlay(playerId);
            }
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            window.scrollBy({ top: 300, behavior: 'smooth' });
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            window.scrollBy({ top: -300, behavior: 'smooth' });
        }
    });
}

// ===== Lazy Loading Images =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== Welcome Message =====
function showWelcomeMessage() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

// ===== Share Functionality =====
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'خلف الكواليس - فيلم عُمان القصير',
            text: 'شاهد رحلة إنشاء فيلم عُمان القصير بالذكاء الاصطناعي',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ الرابط!');
    }
}

// ===== Download Progress =====
function downloadProgress() {
    const progressData = {
        totalItems: VIEWABLE_ITEMS.length,
        viewedItems: viewedItems.size,
        percentage: Math.round((viewedItems.size / VIEWABLE_ITEMS.length) * 100),
        viewedList: [...viewedItems],
        date: new Date().toLocaleDateString('ar-EG'),
        filmTitle: 'خلف الكواليس - فيلم عُمان القصير'
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'oman-film-progress.json';
    link.click();
    URL.revokeObjectURL(url);
    
    alert(`تم تحميل التقدم!\n${progressData.viewedItems}/${progressData.totalItems} (${progressData.percentage}%)`);
}

// ===== Confetti Effect =====
function createConfetti() {
    const colors = ['#8B1538', '#D4AF37', '#C17B3C'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// ===== Fullscreen Toggle =====
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Error attempting to enable fullscreen:', err);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Update fullscreen icon
document.addEventListener('fullscreenchange', () => {
    const icon = document.querySelector('.nav-icon-btn:last-child i');
    if (icon) {
        icon.className = document.fullscreenElement ? 'fas fa-compress' : 'fas fa-expand';
    }
});

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    setupAudioTracking();
    setupIntersectionObserver();
    initAudioPlayers();
    loadTheme();
    createScrollToTop();
    setupKeyboardShortcuts();
    
    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }
    
    // Add viewed class to already viewed items
    viewedItems.forEach(itemId => {
        const element = document.querySelector(`[data-item-id="${itemId}"]`);
        if (element) {
            element.classList.add('viewed');
        }
    });
    
    // Make timeline bars clickable
    document.querySelectorAll('.timeline-bar').forEach((bar, index) => {
        const playerId = index === 0 ? 'oman' : 'speech';
        bar.addEventListener('click', (e) => {
            const audio = audioPlayers[playerId];
            const rect = bar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            audio.currentTime = percent * audio.duration;
        });
    });
    
    console.log('🎬 Behind the Scenes website loaded successfully!');
    console.log(`📊 Progress: ${viewedItems.size}/${VIEWABLE_ITEMS.length} items viewed`);
    console.log('✨ New features: Filter, Stats Counter, Theme Toggle, Scroll to Top, Keyboard Shortcuts');
});
