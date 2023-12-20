import { CSSProperties, FC, ReactNode, memo, useContext } from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { titleBackgroundPath } from '../common/constants';
import { OrientationContext, OrientationContextProps, ThemeContext, ThemeContextProps } from '../common/contexts';
import Menu from '../menu/Menu';

const styles = StyleSheet.create({
	banner: {
		display: 'flex',
		justifyContent: 'center',
		boxShadow: '#77777780 0px 1px 2px 1px',
		marginBottom: '3px',
		backgroundColor: 'white',
		fontWeight: 300,
		width: '100%',
		flexDirection: 'column',
		alignItems: 'center',
	},
	bannerExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(50dvw - 53dvmin)',
			height: '100dvh',
			position: 'absolute',
			boxShadow: '#77777760 1px 0px 3px 1px',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
		},
	},
	bannerDark: {
		backgroundColor: '#3c3c3c',
		boxShadow: '#161616cc 0px 1px 3px 2px',
	},

	liner: {
		display: 'grid',
		justifyContent: 'center',
		padding: '1dvh 20dvw',
		borderBottom: '1px solid #77777785',
		background: 'white',
		gridTemplateColumns: '0 repeat(8, 1fr) 0 1fr 0 repeat(7, 1fr) 0',
		zIndex: 6,
		width: 'calc(min(144dvh, 84dvw))',
	},
	linerExLandscapeAndExPortrait: {
		'@media (min-aspect-ratio: 2), (max-width: 450px)': {
			padding: '1dvh 0',
			width: '100%',
			gridTemplateColumns: '1fr repeat(8, auto) 1fr',
		},
	},
	linerPortrait: {
		'@media (max-aspect-ratio: 1)': {
			padding: '0.5dvw',
			width: '100%',
			boxSizing: 'border-box',
		},
	},
	linerDark: {
		color: 'white',
		borderBottom: '1px solid #1f1f1f',
		backgroundColor: '#282828',
	},

	letter: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		boxShadow: '-0.5px 0.5px 0px 1px #a2a2a280',
		borderRadius: '0.3vh',
		position: 'relative',
		fontFamily: 'system-ui, "Segoe UI"',
		margin: '0.5dvh',
		fontSize: '3dvmin',
		userSelect: 'none',
		aspectRatio: '1 / 1',
	},
	spaceLetter: {
		boxShadow: 'none',
	},
	letterNarrowRatio: {
		'@media (max-width: 450px)': {
			width: 'min(7dvh, 10dvw)',
			height: 'min(7dvh, 10dvw)',
			fontSize: '5dvmin',
		},
	},
	letterExLandscape: {
		'@media (min-aspect-ratio: 2)': {
			width: 'calc(6dvw - 7.5dvmin)',
			height: 'calc(6dvw - 7.5dvmin)',
			fontSize: '1.5dvW',
		},
	},
});

const svgStyle: CSSProperties = {
	position: 'absolute',
};

const title = ' MACMAHON   SQUARES '.split('');
const letterClassName = css(styles.letter, styles.letterNarrowRatio, styles.letterExLandscape);

const Letter: FC<{ letter: string; index: number }> = memo(({ letter, index }) => {
	return letter !== ' ' ? (
		<div className={letterClassName}>
			<span style={{ zIndex: 1 }}>{letter}</span>
			<svg viewBox="0,0,100,100" style={svgStyle}>
				<path d={titleBackgroundPath[index]} strokeWidth="1px" stroke="#a2a2a280" fill="none" />
			</svg>
		</div>
	) : (
		<div className={`${letterClassName} ${css(styles.spaceLetter)}`} />
	);
});

const drawLetters: () => ReactNode[] = () =>
	title.map((l, i) => <Letter key={`banner-${i}-${l}`} letter={l} index={i} />);

const Banner: FC = () => {
	const { darkTheme } = useContext<ThemeContextProps>(ThemeContext);

	return (
		<section className={`${css(styles.banner, styles.bannerExLandscape)} ${darkTheme && css(styles.bannerDark)}`}>
			<div
				className={css(
					styles.liner,
					styles.linerExLandscapeAndExPortrait,
					styles.linerPortrait,
					darkTheme && styles.linerDark
				)}
			>
				{drawLetters()}
			</div>
			<Menu />
		</section>
	);
};

export default memo(Banner);
