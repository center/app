import * as Surplus from 'surplus';
import S from 's-js';

import Intro from './intro';

const centerRoot = () => {
	const intro = <Intro />;

	setTimeout(() => intro.show(false), 5000);

	return (
		<div>
			{ intro.isShowing() ? intro : 'No more intro!' }
		</div>
	);
};

export default function CENTER(root) {
	S.root(() => {
		root.appendChild(centerRoot());
	});
}
