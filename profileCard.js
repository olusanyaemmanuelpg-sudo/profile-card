/** @format */

(function setupTime() {
	const el = document.getElementById('timeNow');
	function tick() {
		el.textContent = Date.now().toString();
	}
	tick();

	setInterval(tick, 500);
})();
