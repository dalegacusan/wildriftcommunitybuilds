import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Redux
import { connect, ConnectedProps } from 'react-redux';

// Shared
import { ImagePath } from '../../../../../../shared/utils/imagePath';
import { RequiredLength } from '../../../../../../shared/constants/requiredLength';
import { Rune } from '../../../../../../shared/constants/constants';

// MaterialUI
import Grid from '@material-ui/core/Grid';

// Components
import RunePopover from '../../../../../../shared/components/Popover/RunePopover';

// CSS
import globalstyles from '../../../Styles.module.css';
import styles from './rune.module.css';

// Types
import { RuneInterface } from '../../../../../../shared/interfaces/GameData';
import { RootState } from '../../../../../../shared/interfaces/GlobalStore';

const Domination = (props: DominationProps) => {
	const { handleRuneSelectChange, handleRuneExplanationChange } = props;
	// Game Data PROPS
	const { runes } = props;
	// Build PROPS
	const { runeDomination } = props;

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	const handlePopoverOpen = (
		event: React.MouseEvent<HTMLElement, MouseEvent>
	) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<Grid item xs={12} sm={6}>
				<LazyLoadImage
					src={ImagePath.Rune(runeDomination.id)}
					className={styles.runeImage}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				/>
				<RunePopover
					rune={runeDomination}
					anchorEl={anchorEl}
					open={open}
					handlePopoverClose={handlePopoverClose}
				/>

				<select
					onChange={(e) =>
						handleRuneSelectChange(e, Rune.TYPE.SECONDARY, Rune.PATH.DOMINATION)
					}
					value={runeDomination.id}
					className={globalstyles.buildSelectInput}
				>
					{runes
						.filter(
							(rune: RuneInterface) =>
								rune.type === Rune.TYPE.SECONDARY &&
								rune.path === Rune.PATH.DOMINATION
						)
						.map((rune: RuneInterface, index: number) => {
							const { id: runeId, runeName } = rune;

							return (
								<option
									key={index}
									value={runeId}
									className={globalstyles.buildSelectOption}
								>
									{runeName}
								</option>
							);
						})}
				</select>
			</Grid>
			<Grid item xs={12} sm={6}>
				<textarea
					id='runeDomination'
					name='runeDomination'
					rows={5}
					value={runeDomination.reason}
					placeholder='Explanation'
					className={styles.explanationTextArea}
					maxLength={RequiredLength.REASON.MAX_LENGTH}
					onChange={(e) => handleRuneExplanationChange(e, Rune.PATH.DOMINATION)}
				/>
			</Grid>
		</>
	);
};

const mapStateToProps = (state: RootState) => {
	return {
		runeDomination: state.build.runes.domination,
		runes: state.gameData.runes,
	};
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type DominationProps = PropsFromRedux & {
	handleRuneSelectChange: (
		e: React.ChangeEvent<HTMLSelectElement>,
		runeType: string,
		runePath?: string
	) => void;
	handleRuneExplanationChange: (
		e: React.ChangeEvent<HTMLTextAreaElement>,
		runeName: string
	) => void;
};

export default connector(Domination);
