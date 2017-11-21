
export default function preload(src, callback) {
	let img = new Image();
	
	img.onload = () => {

		callback();

		img = null;
	};

	img.src = src;
}