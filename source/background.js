// eslint-disable-next-line import/no-unassigned-import
import './options-storage.js';
console.log('here')

let screenshots = [];
let intervalID;

// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.action.onClicked.addListener(async function () {
    clearInterval(intervalID)
});

function startUp() {
    async function getScreenshot(){
        screenshots.push(await chrome.tabs.captureVisibleTab());
        console.log(screenshots)
    }
    intervalID = setInterval(getScreenshot, 500);
}

// Ensure the background script always runs.
chrome.runtime.onStartup.addListener(startUp)
chrome.runtime.onInstalled.addListener(startUp)