// Array of 100 messages
const messages = [
    "Feeling happy today? Let's find the perfect song for you!",
    "When you're sad, music can heal your soul.",
    "Dance like nobody's watching!",
    "Music is the soundtrack of your life.",
    "Let the rhythm guide your emotions.",
    "Every song tells a story. What's yours?",
    "Turn up the volume and let go!",
    "Music is the best therapy.",
    "What's your mood today?",
    "Let's find a song that matches your vibe.",
    // Add 90 more messages here...
];

// Emotion-based emojis
const emotionEmojis = {
    happy: "😊🎉🌈", // Happy emojis
    sad: "😢🌧️💔", // Sad emojis
    calm: "🧘‍♀️🍃🎵", // Calm emojis
    energetic: "🔥🎸💥", // Energetic emojis
    neutral: "😐✨🎶", // Neutral emojis
};

let currentMessageIndex = 0;

// Function to update the message every minute
function updateMessage() {
    const messageBox = document.getElementById("message_box");
    messageBox.value = messages[currentMessageIndex]; // Set the message inside the textarea

    // Move to the next message
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

// Function to update the emotion emojis
function updateEmotionEmoji(emotion) {
    const emojiContainer = document.getElementById("emotion-emoji");
    emojiContainer.innerHTML = emotionEmojis[emotion] || emotionEmojis.neutral; // Default to neutral if emotion is not found
}

// Function to detect emotion from text
function detectEmotion(text) {
    if (text.toLowerCase().includes("happy")) return "happy";
    if (text.toLowerCase().includes("sad")) return "sad";
    if (text.toLowerCase().includes("calm")) return "calm";
    if (text.toLowerCase().includes("energetic")) return "energetic";
    return "neutral"; // Default emotion
}

// Update emojis when the user clicks "READY TO GO"
document.getElementById("readyButton").addEventListener("click", function () {
    const userMessage = document.getElementById("message_box").value;
    const emotion = detectEmotion(userMessage); // Detect emotion from the message
    updateEmotionEmoji(emotion); // Update the emojis
    alert(`You seem ${emotion}. Let's find a song for you!`);
});

// Update the message every 60 seconds (60000 milliseconds)
setInterval(updateMessage, 60000);

// Display the first message immediately
updateMessage();