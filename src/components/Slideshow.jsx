import React from 'react';

import pageVisibility from '../modules/pageVisibility';
import preload from '../modules/preload';


export default class Slideshow extends React.Component {
	constructor(props) {
		super(props);

		const data = this.props.data || [];

		this.state = {
			data: data.filter(item => item.size !== 'tall'),
			currentSlide: null,
			nextSlide: null
		};

		this.invert = true;
		this.index = Math.round(Math.random() * (this.state.data.length - 1));

		pageVisibility(
			() => clearInterval(this.timeout),
			() => this.nextSlide()
		);
	}

	componentWillMount = () => this.nextSlide();

	componentWillUnmount = () => clearInterval(this.timeout);


	nextSlide = () => {
		clearInterval(this.timeout);

		this.invert = !this.invert;
		this.index = (++this.index) % this.state.data.length;


		// preload
		preload(
			this.state.data[this.index].full,
			() => {
				this.setState({
					currentSlide: (this.invert) ? this.state.currentSlide : this.state.data[this.index],
					nextSlide: (this.invert) ? this.state.data[this.index] : this.state.nextSlide
				});

				this.timeout = setTimeout(() => this.nextSlide(), 8000);
			}
		);
	}

	render() {
		if (this.state.currentSlide) {
			return (
				<section className='slideshow'>
					<div
						className='slide'
						key='current'
						style={{
							opacity: (this.invert ? 0 : 1),
							backgroundImage: (this.state.currentSlide ?
								`url('${this.state.currentSlide.full}')`
								: null
							)
						}}
					/>
					<div
						className='slide'
						key='next'
						style={{
							opacity: (this.invert ? 1 : 0),
							backgroundImage: (this.state.nextSlide ?
								`url('${this.state.nextSlide.full}')`
								: null
							)
						}}
					/>
				</section>
			)
		};
		return null;
	}
}