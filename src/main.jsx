import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { images } from '../api/images';

import main from './styles/main.styl';

import makeRequest from './modules/makeRequest';
import Page from './components/Page';
import NotFound from './components/NotFound';

import detectSupport from './modules/detectSupport';
import gridAnimation from './modules/gridAnimation';

import './modules/checkBrowser';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: images,
			onLoading: true
		};
	}

	componentWillMount() {

		if (!detectSupport('grid')) {
			const root = document.getElementsByTagName('html')[0];
			root.classList.add('no-grid');
		};
	}

	componentDidMount() {
		document.body.classList.add('loaded');
	}

	render() {
		return (
			<Router basename='/gallery-static'>
				<Route render={({ location }) =>
					<TransitionGroup className='page'>
						<CSSTransition
							key={location.key}
							timeout={2550}
							classNames='page-transition'
							mountOnEnter={true}
							unmountOnExit={true}>

							<Switch location={location}>

								{this.state.data ?
									<Route
										path='/:page?'
										render={props => <Page data={this.state.data} {...props} />}
									/>
									: null
								}
				
							</Switch>

						</CSSTransition>
					</TransitionGroup>
				} />
			</Router>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('root'));