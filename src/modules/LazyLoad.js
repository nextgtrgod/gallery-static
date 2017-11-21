
export default class LazyLoad {
	constructor(selector) {

		this.items = document.getElementsByClassName('gallery__item');

		this.offset = window.innerHeight;


		window.addEventListener('scroll', this.loadImages);

		this.loadImages(); // load first screen
	}

	loadImages = () => {

		if (!this.items.length) {
			window.removeEventListener('scroll', this.loadImages);
			return;
		};
		
		this.items = [...this.items].filter(item => {
			if (item.dataset.loaded == 'false') {
	
				if ((item.offsetTop - window.pageYOffset) <= this.offset) {
					let img = new Image();

					img.onload = () => {
						item.style.backgroundImage = `url(${item.dataset.src})`;
						item.dataset.loaded = true;
						delete item.dataset.src;
						img = null;
					};

					img.src = item.dataset.src;
					
					return false;
				};

			};
			return true;
		});
	};

}