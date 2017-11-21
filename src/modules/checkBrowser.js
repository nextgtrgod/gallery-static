
(() => {
	let ua		= window.navigator.userAgent.toLowerCase();
	let msie	= ua.indexOf('msie');
	let trident	= ua.indexOf('trident');
	let edge	= ua.indexOf('edge');
	let moz		= ua.indexOf('firefox');
	let chr		= ua.indexOf('chrome');
	let saf		= ua.indexOf('safari');
	let root	= document.getElementsByTagName('html')[0];


	if (typeof window.orientation !== 'undefined') root.classList.add('mobile-device');


	if (msie > 0 || trident > 0 || edge > 0) {
		root.classList.add('any-ie');
		return;
	};

	if (moz > 0) {
		root.classList.add('any-firefox');
		return;
	};

	if (chr > 0) {
		root.classList.add('any-chrome');
		return;
	};

	if (saf > 0) {
		root.classList.add('any-safari');
		return;
	};

})();