import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Shared
import { ImagePath } from '../../../shared/utils/imagePath';

// MaterialUI
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

// Components
import ItemPopover from '../../../shared/components/Popover/ItemPopover';

// Types
import { ItemInterface } from '../../../shared/interfaces/GameData';

// CSS
import styles from './Styles.module.css';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
		popover: {
			pointerEvents: 'none',
		},
		paper: {
			padding: '20px',
			backgroundColor: '#171717',
			color: '#FFFFFF',
			width: '400px',
		},
	})
);

type BuildItemProps = {
	item: ItemInterface;
};

const BuildItem = (props: BuildItemProps) => {
	const { item } = props;
	const { id: itemId, itemName, reason } = item;

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
			<Box p={1} flexGrow={1}>
				<Avatar
					variant='square'
					className={`${classes.large} ${styles.itemAvatar}`}
					onMouseEnter={handlePopoverOpen}
					onMouseLeave={handlePopoverClose}
				>
					<LazyLoadImage
						src={ImagePath.Item(itemId)}
						className={styles.itemImage}
						title={itemName}
						alt={itemName}
					/>
				</Avatar>
				<ItemPopover
					item={item}
					anchorEl={anchorEl}
					open={open}
					handlePopoverClose={handlePopoverClose}
				/>
				<span className={`${styles.itemName} text-white-pure`}>{itemName}</span>
			</Box>
			{reason ? (
				<Box p={1} className={styles.itemReasonContainer}>
					<span className='text-white-primary'>{reason.toString()}</span>
				</Box>
			) : null}
		</Box>
	);
};

export default BuildItem;
