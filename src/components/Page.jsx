import React from 'react';

import NotFound from './NotFound';
import Gallery from './Gallery';
import Lightbox from './Lightbox';


export default class Page extends React.Component {
	constructor(props) {
		super(props);
	
		this.number = +(this.props.match.params.page || 1);
		
		const count = 12;
		const pagesCount = Math.ceil(this.props.data.length / count);
		const chunkStart = count * (this.number - 1);

		this.content = this.props.data.slice(chunkStart, chunkStart + count);

		this.link = {
			prev: (this.number - 1) || pagesCount,
			next: ((this.number + 1) % (pagesCount + 1)) || 1
		};

		// if 404
		let isExist = true;
		if (this.number !== this.number ||
			this.number < 1 ||
			this.number > pagesCount) { isExist = false };

		this.state = {
			isExist,
			lightboxImageID: null,
			lightboxVisible: false
		};
	}

	openLightbox = id => {
		this.setState({
			lightboxImageID: id,
			lightboxVisible: true
		});
	}

	setLightbox = param => {

		if (this.state.lightboxVisible) {

			switch (param) {
				case 'prev':
					this.setState({
						lightboxImageID: this.state.lightboxImageID ?
							(this.state.lightboxImageID - 1)
							:
							(this.content.length - 1)
					});
					break;
	
				case 'next':
					this.setState({
						lightboxImageID: (this.state.lightboxImageID + 1) % this.content.length
					});
					break;
				
				default:
					this.setState({ lightboxVisible: false });
					break;
			};

		}
	}

	keyHandler = (e = window.event) => {
		switch (e.keyCode) {
			case 37: // <-
				this.setLightbox('prev');
				break;

			case 39: // ->
				this.setLightbox('next');
				break;

			case 27: // esc
				this.setLightbox('close');
				break;
		};
	}

	componentWillMount() {
		document.addEventListener('keydown', this.keyHandler);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.keyHandler);
	}

	render() {

		if (!this.state.isExist) {
			return (
				<NotFound key='page-not-found' data={this.props.data} />
			)
		};

		return [
			<Gallery
				key='gallery'
				data={this.content}
				pageNumber={this.number}
				link={this.link}
				imageClick={this.openLightbox}
			/>,

			<Lightbox
				key='lightbox'
				image={(this.state.lightboxImageID !== null) ?
					this.content[this.state.lightboxImageID].full
					: null
				}
				isVisible={this.state.lightboxVisible}
				prevImage={() => this.setLightbox('prev')}
				nextImage={() => this.setLightbox('next')}
				onClose={() => this.setLightbox('close')}
				data={this.content}
			/>
		]
	}
}