import * as Surplus from 'surplus';
import S from 's-js';

const centerRoot = () => (<center>Hello, center!</center>);

export default function CENTER(root) {
	S.root(() => {
		root.appendChild(centerRoot());
	});
}
