import { FC, ReactNode, memo, useContext } from 'react';
import { css } from 'aphrodite/no-important';

import { bannerText, titleBackgroundPath } from '../common/constants';
import { ThemeContext } from '../common/contexts';
import { isIOSChrome, isIOSSafari } from '../common/utils';
import { ThemeContextProps } from '../common/common.types';

import Menu from '../menu/Menu';
import styles from './Banner.styles';

const title = bannerText.split('');
const letterClassName = css(
	styles.letterWrapper,
	styles.letterWrapperNarrowRatio,
	styles.letterWrapperExLandscape,
	isIOSSafari() && styles.letterWrapperIOSSafari,
	isIOSChrome() && styles.letterWrapperIOSChrome
);

const Letter: FC<{ letter: string; index: number }> = memo(({ letter, index }) => {
	return letter !== ' ' ? (
		<div className={letterClassName}>
			<span className={css(styles.letter)}>{letter}</span>
			<svg viewBox="0,0,100,100" className={css(styles.letterBorder)}>
				<path d={titleBackgroundPath[index]} className={css(styles.letterBackground)} />
			</svg>
		</div>
	) : (
		<div className={`${letterClassName} ${css(styles.spaceLetterWrapper)}`} />
	);
});

const drawLetters: () => ReactNode[] = () =>
	title.map((letter, index) => <Letter key={`banner-${index}-${letter}`} letter={letter} index={index} />);

const Banner: FC = () => {
	const { darkTheme } = useContext<ThemeContextProps>(ThemeContext);

	return (
		<section
			className={css(
				styles.banner,
				styles.bannerExLandscape,
				isIOSChrome() && styles.bannerIOSChrome,
				isIOSSafari() && styles.bannerIOSSafari,
				darkTheme && styles.bannerDark
			)}
		>
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
