function showTips() {
    const tipsContent = document.getElementById("tips-content");
    tipsContent.style.display = tipsContent.style.display === "none" ? "block" : "none";
}

function showVideos() {
    const videoList = document.getElementById("video-list");
    if (videoList.style.display === "none") {
        videoList.style.display = "block";
        videoList.innerHTML = `
            <ul>

                <li><iframe width="560" height="315" src="https://www.youtube.com/embed/inpok4MKVLM?si=0e68RSjUQ1gABuxV"</iframe></li>
                <li><a href="https://youtu.be/iONDebHX9qk?si=bOX6TvsgAeBXcWv4" target="_blank">Video 2: Time Management</a></li>
                <li><a href="https://www.youtube.com/watch?v=exam   ple3" target="_blank">Video 3: Solving Math Problems</a></li>
            </ul>
        `;
    } else {
        videoList.style.display = "none";
    }
}

// Function to add solutions dynamically
function addSolution(solutionText) {
    const solutionList = document.getElementById("solution-list");
    const solutionItem = document.createElement("div");
    solutionItem.textContent = solutionText;
    solutionList.appendChild(solutionItem);
}

// Example usage of addSolution function
// addSolution("Example Solution 1");
// addSolution("Example Solution 2");
