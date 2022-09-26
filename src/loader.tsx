import * as React from 'react';

export const Loader: React.FC = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38">
		<g transform="translate(1 1)" strokeWidth="2" fill="none" fillRule="evenodd">
			<circle cx="18" cy="18" r="18" strokeOpacity=".5" />

			<path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(0 18 18)">
				<animateTransform
					to="360 18 18"
					dur="1.5s"
					type="rotate"
					from="0 18 18"
					repeatCount="indefinite"
					attributeName="transform"
				/>
			</path>
		</g>
	</svg>
);
