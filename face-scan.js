// Load FaceAPI models
async function loadModels() {
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('./models');
        await faceapi.nets.faceExpressionNet.loadFromUri('./models');
        console.log("Models loaded successfully!");
    } catch (err) {
        console.error("Error loading models: ", err);
    }
}

// Start video and detect emotions
async function startVideo() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const emotionResult = document.getElementById('detected-emotion');
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const nowPlaying = document.getElementById('now-playing');

    // Check if the browser supports mediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error("getUserMedia is not supported in this browser");
        return;
    }

    // Get user media (camera access)
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play(); // Start playing the video
            console.log("Camera started successfully!");
        };
    } catch (err) {
        console.error("Error accessing camera: ", err);
        alert("Unable to access the camera. Please allow camera permissions and refresh the page.");
    }

    // Add event listener for the OK button
    const okButton = document.getElementById('ok-button');
    if (okButton) {
        okButton.addEventListener('click', async () => {
            console.log("OK button clicked!"); // Debugging: Check if the button click is detected

            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections.length > 0) {
                const emotions = detections[0].expressions;
                console.log("Detected emotions: ", emotions); // Debugging: Check detected emotions

                const dominantEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
                console.log("Dominant emotion: ", dominantEmotion); // Debugging: Check dominant emotion

                // Update detected emotion
                emotionResult.textContent = dominantEmotion;

                // Play a song based on the detected emotion
                playSong(dominantEmotion);
            } else {
                alert("No face detected. Please try again.");
            }
        });
    } else {
        console.error("OK button not found!"); // Debugging: Check if the button exists
    }
}

function playSong(emotion) {
    const audioPlayer = document.getElementById('audio-player'); // ✅ Get audio player
    const audioSource = document.getElementById('audio-source'); // ✅ Define audioSource
    const nowPlaying = document.getElementById('now-playing');

    const songs = {
        happy: 'songs/happy.mp3',
        sad: 'songs/sad.mp3',
        angry: 'songs/angry.mp3',
        surprised: 'songs/surprised.mp3',
        neutral: 'songs/neutral.mp3',
        relief: 'songs/relief.mp3',
        cry: 'songs/cry.mp3',
        excitement: 'songs/excitement.mp3',
        sleep: 'songs/sleep.mp3',
    };

    const songPath = songs[emotion] || songs.neutral;
    console.log("🎵 Playing song: ", songPath);

    if (audioSource && audioPlayer) {
        audioSource.src = songPath;
        audioPlayer.load();
        audioPlayer.play();
        nowPlaying.textContent = `Now Playing: Song for ${emotion}`;
    } else {
        console.error("❌ Error: Audio elements not found!");
    }
}


// Initialize
loadModels().then(startVideo);