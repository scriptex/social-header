import 'react-app-polyfill/ie11';
import 'scriptex-socials';
import 'normalize.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GoogleFontLoader from 'react-google-font-loader';

import { fonts } from './settings';
import { Studio } from './studio';

const App = () => (
	<>
		<GoogleFontLoader fonts={fonts.map(font => ({ font, weights: [400] }))} />

		<div className="app">
			<Studio />
		</div>

		<social-links></social-links>
	</>
);

ReactDOM.render(<App />, document.getElementById('root'));
