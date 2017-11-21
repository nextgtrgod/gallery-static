import React from 'react';
import classNames from 'classnames';

import preload from '../modules/preload';
import gridAnimation from '../modules/gridAnimation';


export default class Image extends React.Component {
	constructor(props) {	
		super(props);

		this.state = {
			data: this.props.data,
			background: null
		};
	}

	componentWillMount() {
		preload(
			this.state.data.small,
			() => this.setState({ background: this.state.data.small })
		);
	}

	componentDidMount() {
		this.animation = new gridAnimation();
		this.animation.subscribe(this.node);
	}

	componentWillUnmount() {
		this.animation.unsubscribe(this.node);
	}

	render() {
		let cls = classNames({
			'gallery__item': true,
			'loaded': this.state.background
		});

		return (
			<div
				className={cls}
				ref={node => this.node = node}
				style={{
					color: this.state.data.hover,
					gridArea: this.props.grid
				}}
				tabIndex={0}
				onClick={() => this.props.onClick(this.props.index)}>
				<div
					className='image'
					style={{
						backgroundImage: (this.state.background ? `url(${this.state.background})` : null)
					}}>
				</div>
				<div className='revealer'></div>	
			</div>
		)
	}
}