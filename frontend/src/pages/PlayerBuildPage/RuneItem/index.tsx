import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Shared
import { ImagePath } from '../../../shared/utils/imagePath';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

// Components
import RunePopover from '../../../shared/components/Popover/RunePopover';

// Types
import { RuneInterface } from '../../../shared/interfaces/GameData';

// CSS
import styles from './Styles.module.css';

const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));
type RuneItemProps = {
	rune: RuneInterface;
};

const RuneItem = (props: RuneItemProps) => {
	const { rune } = props;
	const { id: runeId, runeName, reason } = rune;
	const classes = useStyles();

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
		<Box display='flex' p={1}>
			<Box flexGrow={1} p={1}>
				<Avatar
					variant='square'
					className={`${classes.large} ${styles.runeAvatar}`}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				>
					<LazyLoadImage
						src={ImagePath.Rune(runeId)}
						className={styles.runeImage}
						title={runeName}
						alt={runeName}
					/>
				</Avatar>
				<RunePopover
					rune={rune}
					anchorEl={anchorEl}
					open={open}
					handlePopoverClose={handlePopoverClose}
				/>
				<span className={`${styles.runeName} text-white-pure`}>{runeName}</span>
			</Box>
			{reason ? (
				<Box p={1} className={styles.runeReasonContainer}>
					<span className='text-white-primary'>
						{reason ? reason.toString() : ''}
					</span>
				</Box>
			) : null}
		</Box>
	);
};

export default RuneItem;
