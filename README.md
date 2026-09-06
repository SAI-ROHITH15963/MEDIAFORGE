<div align="center">
  <img src="assets/icon.ico" width="128" alt="MediaForge Logo" />
  <h1>MediaForge</h1>
  <p><strong>Next-Gen Offline Media Converter</strong></p>

  <p>
    <a href="https://github.com/SAI-ROHITH15963/MEDIAFORGE/releases/latest">
      <img src="https://img.shields.io/github/v/release/SAI-ROHITH15963/MEDIAFORGE?style=for-the-badge&color=3b82f6" alt="Latest Release" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Windows-blue?style=for-the-badge&logo=windows" alt="Platform" />
    <img src="https://img.shields.io/badge/100%25-Offline-success?style=for-the-badge" alt="Offline" />
    <img src="https://img.shields.io/badge/Codec-AV1%20Ready-f43f5e?style=for-the-badge" alt="AV1 Ready" />
  </p>
</div>

---

**MediaForge** is a lightning-fast, zero-API, GPU-accelerated media converter wrapped in a stunning "Obsidian Glass" UI. Built to solve the frustration of online converters stealing your data, imposing file limits, and lacking modern codec support. 

Say goodbye to Adobe Media Encoder and sketchy online tools. Drop your files in, and let your GPU do the heavy lifting.

## ✨ Killer Features

- 🎯 **Target File Size Calculator:** Sick of Discord's "Max 25MB" limit? Type 25 into the Target Size box and MediaForge will mathematically calculate the exact video bitrate required to fit underneath the limit perfectly.
- ✂️ **Instant Trimming:** Type in a Start and End time to slice out the exact clip you need. Uses FFmpeg's ultra-fast seek algorithms so you don't have to process the entire movie.
- 🚀 **Next-Gen Hardware Acceleration:** Auto-detects and utilizes **NVIDIA NVENC, AMD AMF, and Intel QSV**. 
- 🎥 **Future-Proof Codecs:** Full support for **AV1**, **HEVC (H.265)**, H.264, WebM (VP9), and more.
- 💧 **Custom Watermarking:** Drag-and-drop overlay support. Add your logo to the bottom right of any video.
- 🎨 **WebP & GIF Maker:** Batch convert video clips or image sequences into lightweight, looping WebP/GIF animations.
- 🎵 **Smart Audio Extraction:** Instantly rip audio from videos to MP3, WAV, FLAC, or OGG.
- ⚡ **Sub-Second Cold Starts:** Custom PyInstaller optimizations and local binary caching means the app boots in under 1 second.

## 🖼️ The "Obsidian Glass" Interface

Built from the ground up using a modern web-stack bridging into a Python backend.
* **Frameless Design** with custom titlebars.
* **Color Customization:** Switch the accent color to Blue, Purple, Emerald, Rose, or Amber.
* **Theme Persistence:** Dark/Light mode that saves your preferences instantly.
* **Native OS Integrations:** Features Windows Toast Notifications when your batch queue completes.

---

## 📥 Installation

1. Head to the [Releases Tab](https://github.com/SAI-ROHITH15963/MEDIAFORGE/releases/latest) or our [Official Website](https://mediaforge-project.vercel.app/).
2. Download the latest MediaForge-v1.5.exe.
3. Double-click and run! No installation wizard required. 

*(Note: On the very first launch, it will take ~3 seconds to unpack the FFmpeg engine to your local AppData. Every launch after that is instantaneous).*

---

## 🛠️ For Developers (Build it yourself)

MediaForge uses a modern pywebview architecture (Python backend + React/JS frontend) and leverages fmpeg for core processing.

### Requirements
- Python 3.12+
- uv (recommended) or pip

### 1. Setup Environment
`ash
git clone https://github.com/SAI-ROHITH15963/MEDIAFORGE.git
cd mediaforge
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
`

### 2. FFmpeg Binaries
Ensure you download fmpeg.exe and fprobe.exe and compress them into a fmpeg.zip file placed in the root directory for the bootloader cache system to work.

### 3. Run Locally
`ash
python main.py
`

### 4. Compile to Standalone .EXE
`ash
pyinstaller --clean MediaForge-v1.5.spec
`

## 🤝 Contributing
Found a bug or want to add a feature? Feel free to open an issue or submit a pull request! Feature requests can also be submitted directly through the form on our website.
