import React from 'react';
import { Link } from 'react-router-dom';

import Slideshow from './Slideshow';


export default function NotFound({ data = [] }) {

	let isSlideshow = data.length;

	let layout = [
		<section
			key='not-found'
			className='not-found'
			data-slideshow={isSlideshow ? true : false}>

			<h1>404</h1>
			<h3>page not found</h3>

			<Link to='/'>go back</Link>

		</section>
	];

	if (isSlideshow) {
		layout.push(
			<Slideshow data={data} key='slideshow' />
		)
	};

	return layout;
}