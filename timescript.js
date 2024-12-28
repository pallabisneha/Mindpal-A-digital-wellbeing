// Toggle the display of content for Setup Tips section
function toggleContent(id) {
    const element = document.getElementById(id);
    element.style.display = element.style.display === "none" ? "block" : "none";
}

// Toggle the display of video list
function toggleVideos() {
    const videoList = document.getElementById("video-list");
    videoList.style.display = videoList.style.display === "none" ? "block" : "none";
}

// Function to add solutions dynamically
function addSolution(solutionText) {
    const solutionList = document.getElementById("solution-list");
    const solutionItem = document.createElement("div");
    solutionItem.textContent = solutionText;
    solutionList.appendChild(solutionItem);
}

// Example usage of addSolution function
addSolution("Solution 1: Break tasks into smaller chunks to make them more manageable.");
addSolution("Solution 2: Try the Pomodoro Technique to stay focused in short intervals with breaks.");
addSolution("Solution 3: Set specific goals and reward yourself upon completion.");
