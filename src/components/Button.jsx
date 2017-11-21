import React from 'react';


export default function Button(props) {

	let cls = 'lightbox__nav';
	let icon;

	switch (props.type) {
		case 'prev':
			cls += '--prev';
			icon = (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
					<path d='M10.28,26.48a1.12,1.12,0,0,0,1.59-1.57l-8-8H30.38a1.11,1.11,0,0,0,1.11-1.11,1.12,1.12,0,0,0-1.11-1.13H3.82l8-8a1.14,1.14,0,0,0,0-1.59,1.11,1.11,0,0,0-1.59,0l-10,10a1.09,1.09,0,0,0,0,1.57Z'/>
				</svg>
			);
			break;
		case 'next':
			cls += '--next';
			icon = (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
					<path d='M21.2,5a1.12,1.12,0,1,0-1.59,1.57l8,8H1.11A1.11,1.11,0,0,0,0,15.74a1.12,1.12,0,0,0,1.11,1.13H27.67l-8,8a1.14,1.14,0,0,0,0,1.59,1.11,1.11,0,0,0,1.59,0l10-10a1.09,1.09,0,0,0,0-1.57Z'/>
				</svg>
			);
			break;
		default:
			cls += '--close';
			icon = (
				<svg fill='#FFF' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'>
					<path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
					<path d='M0 0h24v24H0z' fill='none' />
				</svg>
			);
			break;
	}

	return (
		<button
			className={cls}
			onClick={props.onClick}>
			{icon}
		</button>
	)
}