import React, { useState } from 'react';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
import Stepper from './components/Stepper/Stepper';
import BuildInformation from './components/BuildInformation/BuildInformation';
import BuildSelection from './components/BuildSelection/BuildSelection';
import CreateBuildHeader from './components/CreateBuildHeader/CreateBuildHeader';
import PlayerInformation from './components/PlayerInformation/PlayerInformation';
// CSS
import styles from './createbuild.module.css';
// Types
import {
	BuildInterface,
	CountersInterface,
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RuneInterface,
	SpellInterface,
} from '../../../utils/interfaces';
type CreateBuildProps = {
	champions: Array<ChampionInterface>;
	items: Array<ItemInterface>;
	runes: Array<RuneInterface>;
	spells: Array<SpellInterface>;
};

const CreateBuild = (props: CreateBuildProps) => {
	const { champions, items, runes, spells } = props;
	const [activeStep, setActiveStep] = useState(0);

	let componentToDisplay;
	if (activeStep === 0) {
		componentToDisplay = <BuildInformation />;
	} else if (activeStep === 1) {
		componentToDisplay = (
			<BuildSelection
				champions={champions}
				items={items}
				runes={runes}
				spells={spells}
			/>
		);
	} else if (activeStep === 2) {
		componentToDisplay = <PlayerInformation />;
	}

	return (
		<Box>
			<CreateBuildHeader />

			<Stepper
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				componentToDisplay={componentToDisplay}
			/>
		</Box>
	);
};

export default CreateBuild;
