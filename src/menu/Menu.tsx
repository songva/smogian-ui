import { FC } from 'react';
import { css } from 'aphrodite/no-important';
import { palettesMap } from '../common/constants';
import { Pattern, Ratio, StageOrientationLock } from '../common/interfaces';
import Block from '../block/Block';
import useMenu, { PresetTop } from './useMenu';
import useSvg from './useSvg';
import styles from './Menu.style';

const samplePattern: Pattern = [0, 0, 1, 2];

const Menu: FC = () => {
	const {
		transition,
		presetTop,
		offsetTop,
		darkTheme,
		palettes,
		stageOrientationLock,
		ratio,
		kidsMode,
		orientationButtonStyle,
		kidsModeButtonStyle,
		darkModeButtonStyle,
		menuLiftRef,
		overlayRef,
		setPalettes,
		flipStage,
		toggleKidsMode,
		toggleDarkMode,
	} = useMenu();
	const { portrait, landscape, unlocked, kidFace, adultFace, day, night, facebook, twitter, reddit, whatsapp } =
		useSvg(darkTheme);

	const commonLinerStyles = [
		styles.commonLiner,
		styles.commonLinerExLandscape,
		styles.commonLinerExPortrait,
		darkTheme && styles.commonLinerDark,
	];

	const commonMaskStyle = [
		styles.commonMask,
		styles.commonMaskExLandscape,
		styles.commonMaskExPortrait,
		darkTheme && styles.commonMaskDark,
	];

	return (
		<section className={css(styles.menu, styles.menuExLandscape)}>
			<div
				style={{
					transition,
					transform: `translateY(calc(${presetTop} + ${offsetTop}))`,
				}}
				className={css(
					styles.panel,
					styles.panelExLandscape,
					styles.panelPortrait,
					styles.panelLandscapeAndPortrait,
					styles.panelExPortrait,
					darkTheme && styles.panelDark
				)}
			>
				<div key="menu-palettes" data-testid="menu-palettes" className={css(styles.palettes, styles.palettesPortrait)}>
					{Object.entries(palettesMap).map(([samplePalettesName]) => (
						<div
							className={css(styles.paletteButton)}
							style={{ opacity: palettes !== samplePalettesName ? 0.4 : 0.8 }}
							key={`switch-button-${samplePalettesName}`}
						>
							<Block
								index={-1}
								isStage={false}
								pattern={samplePattern}
								palettes={palettesMap[samplePalettesName]}
								onClick={() => setPalettes(samplePalettesName)}
							/>
						</div>
					))}
				</div>
				<div key="menu-orientation" data-testid="menu-orientation" className={css(styles.orientation)}>
					<div className={css(...commonLinerStyles, styles.commonTriLiner)}>
						{portrait(() => flipStage(StageOrientationLock.PORTRAIT))}
						{unlocked(() => flipStage(StageOrientationLock.UNLOCKED))}
						{landscape(() => flipStage(StageOrientationLock.LANDSCAPE))}
						<div
							className={css(styles.commonButton, styles.commonTriButtons, darkTheme && styles.commonButtonDark)}
							style={orientationButtonStyle}
						>
							{stageOrientationLock === StageOrientationLock.UNLOCKED
								? unlocked()
								: stageOrientationLock === StageOrientationLock.PORTRAIT
								? portrait()
								: landscape()}
						</div>
					</div>
					<div className={css(styles.commonMaskWrapper)}>
						<div className={css(...commonMaskStyle)} />
					</div>
				</div>
				<div key="menu-kids-mode-and-dark-mode" data-testid="menu-kids-and-dark" className={css(styles.biSettingRow)}>
					<div key="menu-kids-mode">
						<div className={css(...commonLinerStyles, styles.commonDuoLiner)}>
							{kidFace(toggleKidsMode)}
							{adultFace(toggleKidsMode)}
							<div
								className={css(styles.commonButton, styles.commonDuoButtons, darkTheme && styles.commonButtonDark)}
								style={kidsModeButtonStyle}
							>
								{kidsMode ? kidFace() : adultFace()}
							</div>
						</div>
						<div className={css(styles.commonMaskWrapper)}>
							<div className={css(...commonMaskStyle)} />
						</div>
					</div>
					<div key="menu-dark-mode">
						<div className={css(...commonLinerStyles, styles.commonDuoLiner)}>
							{day(toggleDarkMode)}
							{night(toggleDarkMode)}
							<div
								className={css(styles.commonButton, styles.commonDuoButtons, darkTheme && styles.commonButtonDark)}
								style={darkModeButtonStyle}
							>
								{darkTheme ? night() : day()}
							</div>
						</div>
						<div className={css(styles.commonMaskWrapper)}>
							<div className={css(...commonMaskStyle)} />
						</div>
					</div>
				</div>
				<div key="menu-shares" data-testid="menu-shares" className={css(styles.quadSettingRow)}>
					<div />
					{facebook(() =>
						window.open('https://www.facebook.com/sharer.php?u=https://www.smogian.com&quote=MacMahon Squares Online')
					)}
					{twitter(() =>
						window.open('https://www.twitter.com/intent/tweet?url=https://www.smogian.com&text=MacMahon Squares Online')
					)}
					{reddit(() =>
						window.open('https://reddit.com/submit?url=https://www.smogian.com&title=MacMahon Squares Online')
					)}
					{whatsapp(() => window.open('https://wa.me/?text=MacMahon Squares Online https://www.smogian.com'))}
				</div>
				<div
					ref={menuLiftRef}
					key="menu-lift"
					data-testid="menu-lift"
					className={css(styles.liftPlaceholder, styles.liftPlaceholderLandscape)}
				>
					<div className={css(styles.lift, darkTheme && styles.liftDark)}>
						<div className={css(styles.liftCover)} />
					</div>
				</div>
			</div>
			{presetTop === PresetTop.SHOW && ratio <= Ratio.LANDSCAPE && (
				<div ref={overlayRef} data-testid="mask" className={css(styles.overlayStyle)} />
			)}
		</section>
	);
};

export default Menu;
