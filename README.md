# خلف الكواليس - فيلم عُمان القصير
## Behind the Scenes - Oman Short Film

### 📁 Project Structure

```
├── index.html              # Main HTML file
├── styles.css              # Stylesheet
├── script.js               # JavaScript functionality
└── assets/
    ├── fonts/              # Custom fonts
    │   └── alfont_com_AlFont_com_Ahlan-World-.otf
    ├── audio/              # Audio files
    │   ├── عمان الأبية (320 KBps).mp3
    │   └── خطاب يوسف في الاذاعة المدرسية.mp3
    ├── videos/             # Video files (if any)
    └── images/
        ├── locations/      # Location images
        │   ├── converted/  # AI-converted location images & videos
        │   └── original/   # Original location photos
        ├── characters/     # Character images
        │   ├── converted/  # AI-converted character images
        │   └── original/   # Original character photos (blurred for privacy)
        └── scenes/         # Film scene images
            ├── BathRoom.png
            ├── Bus Station.png
            └── Youssef Room.jpg
```

### 🎨 Features

- **Full Film Player**: Watch the complete film directly via Google Drive embedded player
- **Interactive Image Comparison**: Slide to compare original vs AI-converted images
- **Progress Tracking**: Track your viewing progress through all content
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Audio Players**: Premium audio players with subtitles
- **Character Versions**: Multiple AI-generated versions of characters

### 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. Navigate through sections using the floating navigation menu
3. Click on images to view full comparisons
4. Play videos and audio to experience the full behind-the-scenes journey

### 📝 Notes

- All paths use relative URLs starting with `./assets/`
- Original character photos are blurred for privacy
- AI-converted images are displayed clearly
- Videos are stored in `locations/converted/` folder

### 👨‍💻 Created By

**يوسف محمد صبح** (Youssef Mohammed Sobh)
مدرسة الإمام المهنا بن سلطان
٢٨ نوفمبر ٢٠٢٥

---

### 🔧 Technical Details

- **HTML5** for structure
- **CSS3** with custom properties for theming
- **Vanilla JavaScript** for interactivity
- **Image Comparison Slider** library for before/after views
- **Font Awesome** for icons
