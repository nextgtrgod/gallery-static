import React from 'react';

import Image from './Image';
import Link from './Link';

import { layoutConfig } from './layoutConfig';


export default function Gallery(props) {

	const layout = layoutConfig[(props.pageNumber - 1) % layoutConfig.length];

	return (
		<div
			className='gallery'
			data-page={('0' + props.pageNumber).slice(-2)}
			key='gallery'>

			<Link grid={layout.links[0]} direction='prev' to={`/${props.link.prev}`}/>

			{props.data.map((item, i) => 
				<Image
					key={i}
					index={i}
					data={item}
					grid={layout.images[i]}
					onClick={props.imageClick}
				/>
			)}

			<Link grid={layout.links[1]} direction='next' to={`/${props.link.next}`} />
		</div>
	)
}