import * as Surplus from 'surplus';
import S from 's-js';

import {grid} from './util/grid';
import Spinner from './spinner';

const Galaxy = ({src, duration, blendMode, opacity}) => {
	const elem = (<img src={src} style={{
		position: 'absolute',
		maxWidth: '150vw',
		minWidth: '110vw',
		minHeight: '100vh',
		maxHeight: '110vh',
		objectFit: 'cover',
		willChange: 'transform, opacity',
		mixBlendMode: blendMode,
		opacity
	}} />);

	elem.isLoaded = S.value(false);

	const width = S.value(0);
	const height = S.value(0);
	const loaded = S.value(false);

	window.addEventListener('resize', () => {
		S.freeze(() => {
			width(elem.clientWidth);
			height(elem.clientHeight);
		});
	});

	S(() => {
		if (!loaded()) {
			return
		}

		let anim;
		S(() => {
			const currentTime = anim ? anim.currentTime : Math.random() * 1000000;

			if (anim) {
				anim.cancel();
				anim = null;
			}

			anim = elem.animate([
				{ transform: `translateX(0px) translateY(calc(100vh / 2 - ${height()}px / 2))` },
				{ transform: `translateX(calc(100vw - ${width()}px)) translateY(calc(100vh / 2 - ${height()}px / 2))` }
			], {
				direction: 'alternate-reverse',
				duration,
				easing: 'cubic-bezier(.24,0,.75,1)',
				fill: 'both',
				iterations: Infinity
			});

			anim.currentTime = currentTime;
		});

		elem.isLoaded(true);
	});

	elem.onload = () => {
		width(elem.clientWidth);
		height(elem.clientHeight);
		loaded(true);
	};

	return elem;
};

const CloudVideo = ({transform, blendMode, opacity}) => {
	const elem = (
		<video autoplay loop style={{
			position: 'absolute',
			minWidth: '100vw',
			height: '100vh',
			objectFit: 'cover',
			willChange: 'transform, opacity, contents',
			opacity,
			mixBlendMode: blendMode,
			transform
		}}>
			<source src="img/intro/clouds.webm" type="video/webm" />
		</video>
	);

	elem.addEventListener('durationchange', () => {
		elem.currentTime = Math.random() * elem.duration;
	});

	return elem;
};

export default () => {
	const galaxies = [
		<Galaxy src="img/intro/galaxy1.jpg" duration={80000} />,
		<Galaxy src="img/intro/galaxy2.jpg" duration={70000} blendMode="hard-light" />,
		<Galaxy src="img/intro/galaxy3.jpg" duration={60000} blendMode="color-dodge" />,
		<Galaxy src="img/intro/clouds1.jpg" duration={23000} blendMode="multiply" opacity="0.6" />,
		<Galaxy src="img/intro/galaxy4.jpg" duration={30000} blendMode="soft-light" />
	];

	const spinner = (
		<Spinner size="75" style={{
			...grid.child(2, 2)
		}} />
	);

	const elem = (
		<div class="non-interactive" style={{
			position: 'fixed',
			left: '0',
			top: '0',
			width: '100%',
			height: '100%',
			transition: 'opacity 1s',
			willChange: 'opacity, contents',
			opacity: '0'
		}}>
			{galaxies.slice(0, 3)}

			<!-- Sick cloud videos. -->
			<CloudVideo blendMode="multiply" transform="scaleX(-1) scaleY(-1)" opacity="0.5" />

			{galaxies.slice(3, 4)}

			<CloudVideo blendMode="hue" opacity="0.9" />

			{galaxies.slice(4)}

			<CloudVideo blendMode="luminosity" opacity="0.05" />

			<!-- A vignette around the screen - looks super nice. -->
			<div style={{
				position: 'absolute',
				width: '100vw',
				height: '100vh',
				background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 13%,rgba(0,0,0,0.86) 95%,rgba(0,0,0,0.92) 94%,rgba(0,0,0,1) 100%)'
			}}></div>

			<div style={{
				...grid('1fr 75px 1fr'),
				width: '100%',
				height: '100%',
				position: 'absolute'
			}}>
				{spinner}
			</div>
		</div>
	);

	elem.show = S.value(true);
	elem.isShowing = S.value(true);

	let timeout = -1;
	S(() => {
		// If all galaxies are loaded...
		if (galaxies.reduce((t, g) => (t && g.isLoaded()), true)) {
			// ... turn them all on
			if (elem.show()) {
				clearTimeout(timeout);
				elem.isShowing(true);
				elem.style.opacity = '0.9';
			} else {
				elem.style.opacity = '0';
				timeout = setTimeout(() => elem.isShowing(false), 1000); // Should match the opacity transition duration
			}
		}
	});

	return elem;
};
