import getMousePos from './getMousePos';

// helpers
const getDistance = (x1, x2, y1, y2) => {
	const dx = x1 - x2;
	const dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
};


let instance = null;

export default class gridAnimation {
	constructor() {
		if (!instance) { instance = this };

		this.items = [];

		let WIDTH = window.innerWidth;
		let HEIGHT = window.innerHeight;

		this.params = {
			width: WIDTH,
			height: HEIGHT,
			center: {
				x: WIDTH / 2,
				y: HEIGHT / 2
			},
			mousePos: {
				x: WIDTH / 2,
				y: HEIGHT / 2
			},
			tilt: {
				x: 16,
				y: 16
			}
		}
	
		window.addEventListener('resize', () => {
			WIDTH = window.innerWidth;
			HEIGHT = window.innerHeight;
		}, false);

		// gyroscope
		let gyroPresent = false;
		let gyroscope = {
			x: 0,
			y: 0,
		};
		window.addEventListener('deviceorientation', event => {
			
			if (event.beta && event.gamma) {
				gyroPresent = true;
		
				gyroscope.x = event.gamma;	// -90..90
				gyroscope.y = event.beta;	// -180..180
		
				if (gyroscope.x > 90)  { gyroscope.x = 90 };
				if (gyroscope.x < -90) { gyroscope.x = -90 };
		
				if (gyroscope.y > 45)  { gyroscope.y = 45 };
				if (gyroscope.y < -45) { gyroscope.y = -45 };

				this.params.mousePos = {
					x: (gyroscope.x / 90) * WIDTH,
					y: (gyroscope.y / 45) * HEIGHT
				};
			};
		}, true);

		if (!gyroPresent) {
			document.addEventListener('mousemove', e => {
				this.params.mousePos = getMousePos(e);
			});
		};

		(document.getElementsByTagName('html')[0].className)
			.includes('any-chrome') && this.animate();

		return instance;
	}

	subscribe = (node) => {
		this.items.push(node);
	}

	unsubscribe = (node) => {
		this.items = this.items.filter(item => item !== node);
	}

	animate = () => {
		this.items.map(item => {
			const transX = 2 * this.params.tilt.x / this.params.width * this.params.mousePos.x - this.params.tilt.x;
			const transY = 2 * this.params.tilt.y / this.params.height * this.params.mousePos.y - this.params.tilt.y;

			const bcr = item.getBoundingClientRect();
			const itemCenter = {
				x: bcr.left + bcr.width / 2,
				y: bcr.top + bcr.height / 2
			};
			
			const dist = getDistance(itemCenter.x, itemCenter.y, this.params.center.x, this.params.center.y);

			const tx = transX / this.params.width * dist || 0;
			const ty = transY / this.params.height * dist || 0;
			
			item.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
		});

		requestAnimationFrame(this.animate);
	}
}