
export default function detectSupport(prop) {
	
	const el = document.createElement('div');

	return (typeof el.style[prop] === 'string');
}