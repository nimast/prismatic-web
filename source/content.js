import html2canvas from "html2canvas";

function takeScreenShot() {
	console.log('Taking screenshot...');
	html2canvas(document.querySelector(".kix-appview-editor-container")).then(canvas => {
		document.querySelector('#layer-2').appendChild(canvas);
	});
}

function updateUI() {

	// skew editor: find the document element with class "kix-appview-editor-container" and set its style attribute to transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
	setLayers()

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

	setTimeout(() => {
		takeScreenShot();
	}, 1000);
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
		let layer2 = document.createElement('div');
		layer2.setAttribute('id', 'layer-2');
		let layer3 = document.createElement('div');
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

async function init() {
	updateUI();

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
