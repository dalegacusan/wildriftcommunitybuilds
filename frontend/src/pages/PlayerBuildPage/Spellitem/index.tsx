import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Shared
import { ImagePath } from '../../../shared/utils/imagePath';

// MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

// Components
import SpellPopover from '../../../shared/components/Popover/SpellPopover';

// Types
import { SpellInterface } from '../../../shared/interfaces/GameData';

// CSS
import styles from './Styles.module.css';
const useStyles = makeStyles((theme) => ({
	large: {
		width: theme.spacing(7),
		height: theme.spacing(7),
	},
}));

type SpellItemProps = {
	spell: SpellInterface;
};

const SpellItem = (props: SpellItemProps) => {
	const { spell } = props;
	const { id: spellId, spellName } = spell;
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
		<Box className={styles.spellItemContainer}>
			<Avatar
				variant='square'
				className={`${classes.large} ${styles.spellAvatar}`}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			>
				<LazyLoadImage
					src={ImagePath.Spell(spellId)}
					className={styles.spellImage}
					title={spellName}
					alt={spellName}
				/>
			</Avatar>
			<SpellPopover
				spell={spell}
				anchorEl={anchorEl}
				open={open}
				handlePopoverClose={handlePopoverClose}
			/>
			<span className={styles.spellName}>{spellName}</span>
		</Box>
	);
};

export default SpellItem;
