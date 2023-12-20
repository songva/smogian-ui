import { FC, memo } from 'react';
import { DndProvider } from 'react-dnd';
import {
	StagedContext,
	BenchContext,
	ThemeContext,
	OrientationContext,
	BumperContext,
	KidsModeContext,
} from '../common/contexts';
import useApp from './useApp';
import HiddenPanel from '../panel/HiddenPanel';
import StagePanel from '../panel/StagePanel';
import BenchPanel from '../panel/BenchPanel';
import BlockPreview from '../block/BlockPreview';
import Banner from '../banner/Banner';
import { appStyle, lightThemeStyle, darkThemeStyle } from './App.styles';

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
		setStagedBlockList,
		setBenchBlockList,
		setPalettes,
		setOrientation,
		setBumper,
		setStageOrientationLock,
		setKidsMode,
		setDarkTheme,
		setRatio,
		backend,
	} = useApp();

	return (
		<DndProvider backend={backend}>
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
									<div style={{ ...appStyle, ...(darkTheme ? darkThemeStyle : lightThemeStyle) }}>
										<Banner />
										<HiddenPanel>
											<StagePanel />
											<BenchPanel />
										</HiddenPanel>
										<BlockPreview />
									</div>
								</KidsModeContext.Provider>
							</BumperContext.Provider>
						</OrientationContext.Provider>
					</ThemeContext.Provider>
				</StagedContext.Provider>
			</BenchContext.Provider>
		</DndProvider>
	);
};

export default memo(App);
