/** @format */

(function setupTime() {
	const el = document.getElementById('timeNow');
	function tick() {
		el.textContent = Date.now().toString();
	}
	tick();

	setInterval(tick, 500);
})();

(function avatarLogic() {
	const fileInput = document.getElementById('fileUpload');
	const urlInput = document.getElementById('urlInput');
	const applyBtn = document.getElementById('applyUrl');
	const avatarContainer = document.getElementById('avatarContainer');

	// helper to set image (replaces initials)
	function setAvatarFromSrc(src) {
		const img = document.createElement('img');
		img.src = src;
		img.alt = 'Avatar for Web Deji';
		img.onload = () => {
			// replace contents
			avatarContainer.innerHTML = '';
			avatarContainer.appendChild(img);
			avatarContainer.setAttribute('aria-label', 'Avatar for Web Deji');
		};
		img.onerror = () => {
			// failed to load, keep initials and notify
			avatarContainer.innerHTML = 'Wd';
			avatarContainer.setAttribute(
				'aria-label',
				'Avatar failed to load, showing initials'
			);
			alert('Failed to load image from the URL or file. Try another image.');
		};
	}

	// file upload handler
	fileInput.addEventListener('change', (ev) => {
		const f = ev.target.files && ev.target.files[0];
		if (!f) return;
		const reader = new FileReader();
		reader.onload = function (e) {
			setAvatarFromSrc(e.target.result);
		};
		reader.readAsDataURL(f);
	});

	// apply URL button
	applyBtn.addEventListener('click', () => {
		const url = urlInput.value.trim();
		if (!url) {
			alert('Please paste an image URL first');
			return;
		}
		setAvatarFromSrc(url);
	});

	// allow label to trigger file input via keyboard
	const fileLabel = document.querySelector('label[for="fileUpload"]');
	fileLabel.addEventListener('keydown', (e) => {
		if (e.key === 'Enter' || e.key === ' ') fileInput.click();
	});
})();
