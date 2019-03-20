import * as Surplus from 'surplus';
import S from 's-js';

import 'bezier-easing';
const bezier = module.exports;
delete module.exports;

const spinnerEase = bezier(0.3, 0.4, 0.4, 0.7);

function drawSpinnerFrame(c, g, {extension, angle, innerExtension}) {
	g.clearRect(0, 0, c.width, c.height);

	angle = spinnerEase(angle) * 2 * Math.PI;
	angle = (angle + (Math.PI * 1.5)) % (2 * Math.PI);

	g.fillStyle = 'transparent';
	g.strokeStyle = 'white';
	g.lineWidth = 3;
	g.beginPath();
	g.arc(c.width / 2, c.height / 2, c.width * 0.4 * extension, 0, Math.PI * 2, true);
	g.stroke();

	const posX = c.width / 2 + (Math.cos(angle) * c.width * 0.11);
	const posY = c.height / 2 + (Math.sin(angle) * c.height * 0.11);
	innerExtension = 0.83 + innerExtension * (1 - 0.83);
	g.globalCompositeOperation = 'destination-out';
	g.fillStyle = 'red';
	g.beginPath();
	g.arc(posX, posY, c.width * 0.35 * innerExtension * extension, 0, Math.PI * 2, true);
	g.fill();

	g.globalCompositeOperation = 'source-over';
	g.lineWidth = 2;
	g.beginPath();
	g.arc(posX, posY, c.width * 0.35 * innerExtension * extension, 0, Math.PI * 2, true);
	g.stroke();

	g.globalCompositeOperation = 'destination-out';
	g.beginPath();
	g.arc(c.width / 2, c.height / 2, c.width * 0.4 * extension, 0, Math.PI * 2, true);
	g.fill();

	g.globalCompositeOperation = 'source-over';
	g.fillStyle = 'white';
	g.beginPath();
	g.arc(c.width / 2, c.height / 2, c.width * 0.15 * extension, 0, Math.PI * 2, true);
	g.fill();
}

export default ({size=50, style={}}) => {
	const elem = (<canvas width={size} height={size} style={{
		...style,
		width: `${size}px`,
		height: `${size}px`
	}}></canvas>);

	const angle = S.value(0);
	const innerExtension = S.value(1);
	const extension = S.value(1);

	const g = elem.getContext('2d');

	elem.show = S.data(true);

	S(() => {
		drawSpinnerFrame(elem, g, {
			angle: angle(),
			innerExtension: innerExtension(),
			extension: extension()
		});
	});

	const interval = setInterval(() => angle((angle() + 0.02) % 1), 1000/60);
	S.cleanup(() => clearInterval(interval));

	return elem;
};
