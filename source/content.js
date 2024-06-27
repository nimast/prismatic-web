function updateUI() {

	// skew editor: find the document element with class "kix-appview-editor-container" and set its style attribute to transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
	document.querySelector('.kix-appview-editor-container').style.transform = `rotateX(60deg) rotateY(0deg) rotateZ(-45deg)`;

	// hide top toolbar: find the div with id docs-chrome and set its display style attribute to none
	document.querySelector('#docs-chrome').style.display = 'none';

	// hide sidebar: find the div with class docs-companion-app-switcher-container and set its display style attribute to none
	document.querySelector('.docs-companion-app-switcher-container').style.display = 'none';

	// hide left sidebar: find a div with left-sidebar-container as one of its classes and set its display style attribute to none
	document.querySelector('.left-sidebar-container').style.display = 'none';

	// hide top thingy: find the div with id kix-horizontal-ruler-container and hide it
	document.querySelector('#kix-horizontal-ruler-container').style.display = 'none';
}

async function init() {

	document.addEventListener('DOMContentLoaded', event => {
		updateUI();
	});

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
	document.addEventListener('pjax:end', updateUI); // Update on page change
	// document.addEventListener('pjax:end', observeFragment);
}

init();
