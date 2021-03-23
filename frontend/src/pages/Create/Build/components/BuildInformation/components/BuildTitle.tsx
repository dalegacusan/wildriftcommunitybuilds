import React, { useState } from 'react';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// CSS
import globalstyles from '../../../createbuild.module.css';
// Types
import { RootState } from '../../../../../../shared/constants/interfaces';

const BuildTitle = (props: BuildTitleProps) => {
	// Build PROPS
	const { buildTitle, setBuildTitle } = props;

	const maximumCharactersForBuildTitle = 24;
	const [charactersRemaining, setCharactersRemaining] = useState(
		maximumCharactersForBuildTitle
	);

	const handleBuildTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setCharactersRemaining(maximumCharactersForBuildTitle - value.length);
		setBuildTitle(value);
	};

	return (
		<Box>
			<p className={globalstyles.inputLabel}>1. Build Title</p>
			<p className={globalstyles.inputDescription}>Give your build a title</p>
			<input
				type='text'
				value={buildTitle}
				placeholder='Build title'
				className={globalstyles.buildInput}
				onChange={(e) => handleBuildTitleChange(e)}
				maxLength={maximumCharactersForBuildTitle}
			/>
			<p
				className={globalstyles.inputDescription}
				style={{ fontStyle: 'italic' }}
			>
				{charactersRemaining} characters remaining
			</p>
		</Box>
	);
};
// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		buildTitle: state.build.buildTitle,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildTitle: (newBuildTitle: string) =>
			dispatch({ type: actionTypes.BUILD_SET_BUILDTITLE, data: newBuildTitle }),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildTitleProps = PropsFromRedux;

export default connector(BuildTitle);
