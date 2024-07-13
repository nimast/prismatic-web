import html2canvas from "html2canvas";

let screenshotsNo = 0;
let screenshotUrls = [];

function takeScreenShots() {
	console.log('Taking screenshot...');
	let layer2 = document.querySelector('#layer-2');
	let layer3 = document.querySelector('#layer-3');

	if (screenshotsNo == 0) {
		html2canvas(
			document.querySelector(".kix-appview-editor-container"),
			{
				width: layer2.clientWidth,
				height: layer2.clientHeight,
				scale: 1,
				onclone: async function (doc, el) {
					el.style.transform = "none";
				}
			}).then(canvas => {
				data = canvas.toDataURL("image/png");
				layer2.src = data;
				canvas.toBlob((blob) => {
					screenshotUrls.push(URL.createObjectURL(blob))
				});
		});
		screenshotsNo++;
	} 
	else if (screenshotsNo == 1){
		html2canvas(
			document.querySelector(".kix-appview-editor-container"),
			{
				width: layer3.clientWidth,
				height: layer3.clientHeight,
				scale: 1,
				onclone: async function (doc, el) {
					el.style.transform = "none";
				}
			}).then(canvas => {
				data = canvas.toDataURL("image/png");
				layer3.src = data;
				canvas.toBlob((blob) => {
					screenshotUrls.push(URL.createObjectURL(blob))
				});
			});
		screenshotsNo++;
	} else {
		html2canvas(
			document.querySelector(".kix-appview-editor-container"),
			{
				width: layer2.clientWidth,
				height: layer2.clientHeight,
				scale: 1
			}).then(canvas => {
				data = canvas.toDataURL("image/png");
				canvas.toBlob((blob) => {
					screenshotUrls.push(URL.createObjectURL(blob))
				});
		});
	}
}

function updateUI() {
	// skew editor: find the document element with class "kix-appview-editor-container" and set its style attribute to transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
	setLayers()

	document.querySelector('body').style.overflow = 'scroll';

	// hide top toolbar: find the div with id docs-chrome and set its display style attribute to none
	document.querySelector('#docs-chrome').style.display = 'none';

	// hide sidebar: find the div with class docs-companion-app-switcher-container and set its display style attribute to none
	let app_switcher_container = document.querySelector('.docs-companion-app-switcher-container');
	if (app_switcher_container) {
		app_switcher_container.style.display = 'none';
	}

	// hide left sidebar: find a div with left-sidebar-container as one of its classes and set its display style attribute to none
	document.querySelector('.left-sidebar-container').style.visibility = 'hidden';
	document.querySelector('.left-sidebar-container').style.width = '0';

	// hide top thingy: find the div with id kix-horizontal-ruler-container and hide it
	document.querySelector('#kix-horizontal-ruler-container').style.visibility = 'hidden';
	document.querySelector('#kix-horizontal-ruler-container').style.height = '0';
	document.querySelector('#kix-horizontal-ruler-container').style.display = 'none';
}

function setLayers() {
	// skew editor: find the document element with class "kix-appview-editor-container" and set its style attribute to transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
	let editor_container = document.querySelector('.kix-appview-editor-container');
	let containerWidth, containerHeight;
	if (editor_container) {
		editor_container.style.transform = `rotateX(60deg) rotateY(0deg) rotateZ(-45deg)`;
		editor_container.style.zIndex = `20`;

		containerWidth = editor_container.clientWidth;
		containerHeight = editor_container.clientHeight;
		let layer2 = document.createElement('img');
		layer2.setAttribute('id', 'layer-2');
		let layer3 = document.createElement('img');
		layer3.setAttribute('id', 'layer-3');
		editor_container.parentElement.appendChild(layer2);
		editor_container.parentElement.appendChild(layer3);

		layer2.style.height = `${containerHeight}px`;
		layer2.style.width = `${containerWidth}px`;

		layer3.style.height = `${containerHeight}px`;
		layer3.style.width = `${containerWidth}px`;
	}
}

function updateLayers() {
	let editor_container = document.querySelector('.kix-appview-editor-container');
	if (editor_container) {
		containerWidth = editor_container.clientWidth;
		containerHeight = editor_container.clientHeight;
		let layer2 = document.getElementById('layer-2');
		let layer3 = document.getElementById('layer-3');

		layer2.style.height = `${containerHeight}px`;
		layer2.style.width = `${containerWidth}px`;

		layer3.style.height = `${containerHeight}px`;
		layer3.style.width = `${containerWidth}px`;
	}
}

let shotInterval;
function toggleScreenshotting(e) {
	e.preventDefault();
	if (e.target.dataset.state == 'on') {
		e.target.dataset.state = 'off';
		control.textContent = "Start";
		clearInterval(shotInterval);
		console.log(screenshotUrls);
	} else {
		e.target.dataset.state = 'on';
		control.textContent = "Stop";
		setTimeout(() => {
			takeScreenShots();
		}, 5000);

		shotInterval = setInterval(() => {
			takeScreenShots();
		}, 60000);
	}
}

function openScreenshotUrls() {
	
}

function addControls() {
	let control = document.createElement('button');
	control.setAttribute('id', 'control');
	control.textContent = "Start";
	control.addEventListener('click', function(e) {
		toggleScreenshotting(e);
	})
	document.getElementById('docs-editor-container').appendChild(control);
}

async function init() {
	updateUI();
	addControls();
	// const observer = new MutationObserver(updateUI);
	// const observeFragment = (): void => {
	// 	const ajaxFiles = select('#files ~ include-fragment[src*="/file-list/"]');
	// 	if (ajaxFiles) {
	// 		observer.observe(ajaxFiles.parentNode!, {
	// 			childList: true
	// 		});
	// 	}
	// };
	//
	// await elementReady('[aria-labelledby="files"]');
	//
	// updateUI();
	// observeFragment();
	window.onresize = updateLayers; // Update on page resize
}

init();
