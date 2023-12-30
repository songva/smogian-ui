import { FC, memo } from 'react';
import { DndProvider } from 'react-dnd';
import {
	StagedContext,
	BenchContext,
	ThemeContext,
	OrientationContext,
	BumperContext,
	KidsModeContext,
	TutorialContext,
} from '../common/contexts';
import useApp from './useApp';
import HiddenPanel from '../panel/HiddenPanel';
import StagePanel from '../panel/StagePanel';
import BenchPanel from '../panel/BenchPanel';
import BlockPreview from '../block/BlockPreview';
import Banner from '../banner/Banner';
import { appStyle, lightThemeStyle, darkThemeStyle } from './App.style';
import Tutorial from '../tutorial/Tutorial';

const App: FC = () => {
	const {
		stagedBlockList,
		benchBlockList,
		palettes,
		orientation,
		bumper,
		isLandscape,
		ratio,
		stageOrientationLock,
		kidsMode,
		darkTheme,
		tutorialStep,
		setStagedBlockList,
		setBenchBlockList,
		setPalettes,
		setOrientation,
		setBumper,
		setStageOrientationLock,
		setKidsMode,
		setDarkTheme,
		setRatio,
		setTutorialStep,
		backend,
	} = useApp();

	return (
		<>
			<DndProvider backend={backend} options={{ enableMouseEvents: true }}>
				<BenchContext.Provider value={{ blockList: benchBlockList, setBlockList: setBenchBlockList }}>
					<StagedContext.Provider value={{ blockList: stagedBlockList, setBlockList: setStagedBlockList }}>
						<ThemeContext.Provider value={{ palettes, darkTheme, setPalettes, setDarkTheme }}>
							<OrientationContext.Provider
								value={{
									orientation,
									isLandscape,
									ratio,
									stageOrientationLock,
									setOrientation,
									setStageOrientationLock,
									setRatio,
								}}
							>
								<BumperContext.Provider value={{ bumper, setBumper }}>
									<KidsModeContext.Provider value={{ kidsMode, setKidsMode }}>
										<TutorialContext.Provider value={{ tutorialStep, setTutorialStep }}>
											<div style={{ ...appStyle, ...(darkTheme ? darkThemeStyle : lightThemeStyle) }}>
												<Tutorial />
												<Banner />
												<HiddenPanel>
													<StagePanel />
													<BenchPanel />
												</HiddenPanel>
												<BlockPreview />
											</div>
										</TutorialContext.Provider>
									</KidsModeContext.Provider>
								</BumperContext.Provider>
							</OrientationContext.Provider>
						</ThemeContext.Provider>
					</StagedContext.Provider>
				</BenchContext.Provider>
			</DndProvider>
		</>
	);
};

export default memo(App);
