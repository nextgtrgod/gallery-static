import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


export default function Link(props) {
	return (
		<RouterLink
			className='gallery__link' data-direction={props.direction}
			to={props.to}
			style={{ gridArea: props.grid }}>

			<svg viewBox='0 0 24 17' width='100%' height='100%'>
				<polygon points='14.1333333 2.61666667 18.9333333 7.41666667 0 7.41666667 0 10.0833333 18.9333333 10.0833333 14.1333333 14.8833333 16 16.75 24 8.75 16 0.75'></polygon>
			</svg>
		</RouterLink>
	)
}