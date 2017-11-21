import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Button from './Button';


export default function Lightbox({isVisible, image, prevImage, nextImage, onClose}) {
	return (
		<div className='lightbox' data-visible={isVisible}>
			<Button onClick={prevImage} type='prev'/>

			{image ?
				<TransitionGroup>
					<CSSTransition
						key={image}
						timeout={200}
						classNames='lightbox-transition'
						mountOnEnter={true}
						unmountOnExit={true}>

						<div
							className='lightbox__image'
							style={{ backgroundImage: `url(${image})` }}
							onClick={nextImage}
						/>

					</CSSTransition>
				</TransitionGroup>
				: null
			}

			<Button onClick={nextImage} type='next'/>

			<Button onClick={onClose}/>
		</div>
	)
}