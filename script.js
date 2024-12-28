class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentTrackIndex = 0;

        // DOM Elements
        this.playPauseBtn = document.getElementById('play-pause');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.titleElement = document.getElementById('title');
        this.currentTimeElement = document.getElementById('current');
        this.totalTimeElement = document.getElementById('total');
        this.progressBar = document.querySelector('.progress');
        this.progressArea = document.querySelector('.progress-bar');
        this.coverArt = document.getElementById('cover');
        this.playlistItems = document.querySelectorAll('.playlist-item');

        this.playlist = Array.from(this.playlistItems).map(item => ({
            title: item.childNodes[0].textContent.trim(),
            src: item.dataset.src
        }));

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());

        // Previous/Next buttons
        this.prevBtn.addEventListener('click', () => this.playPrevious());
        this.nextBtn.addEventListener('click', () => this.playNext());

        // Audio event listeners
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.playNext());
        this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());

        // Progress bar click
        this.progressArea.addEventListener('click', (e) => this.setProgress(e));

        // Playlist item click
        this.playlistItems.forEach((item, index) => {
            item.addEventListener('click', () => this.playTrack(index));
        });
    }

    togglePlay() {
        if (this.audio.src) {
            if (this.isPlaying) {
                this.pause();
            } else {
                this.play();
            }
        } else {
            this.playTrack(0);
        }
    }

    play() {
        this.audio.play();
        this.isPlaying = true;
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.coverArt.classList.add('playing');
    }

    pause() {
        this.audio.pause();
        this.isPlaying = false;
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.coverArt.classList.remove('playing');
    }

    playTrack(index) {
        this.currentTrackIndex = index;
        const track = this.playlist[index];
        this.audio.src = track.src;
        this.titleElement.textContent = track.title;
        this.coverArt.src = `images/cover${index + 1}.jpg`;

        // Update active playlist item
        this.playlistItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        this.play();
    }

    playNext() {
        const nextIndex = (this.currentTrackIndex + 1) % this.playlist.length;
        this.playTrack(nextIndex);
    }

    playPrevious() {
        const prevIndex = (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
        this.playTrack(prevIndex);
    }

    updateProgress() {
        const duration = this.audio.duration;
        const currentTime = this.audio.currentTime;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
        this.currentTimeElement.textContent = this.formatTime(currentTime);
    }

    setProgress(e) {
        const width = this.progressArea.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    updateTotalTime() {
        this.totalTimeElement.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});