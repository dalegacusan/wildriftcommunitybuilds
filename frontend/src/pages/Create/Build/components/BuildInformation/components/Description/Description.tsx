import React, { useState } from 'react';

import { Validation } from '../../../../../../../shared/constants/validation';

// Redux
import { connect, ConnectedProps } from 'react-redux';
import actionTypes from '../../../../../../../store/actions';

// MaterialUI
import Box from '@material-ui/core/Box';
// Components
// CSS
import globalstyles from '../../../../createbuild.module.css';
import styles from './description.module.css';
// Types
import { RootState } from '../../../../../../../shared/constants/interfaces';

const BuildDescription = (props: BuildDescriptionProps) => {
	// Build PROPS
	const { buildDescription, setBuildDescription } = props;

	const handleBuildDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { value } = e.target;

		setBuildDescription(value);
	};

	return (
		<Box className={styles.descriptionContainer}>
			<p className={globalstyles.inputLabel}>4. Describe your build</p>
			<p className={globalstyles.inputDescription}>
				Tell us more about your build
			</p>
			<textarea
				id='itemReason'
				name='itemReason'
				rows={10}
				value={buildDescription}
				placeholder='Describe your build'
				className={styles.explanationTextArea}
				maxLength={Validation.REASON.MAX_LENGTH}
				onChange={(e) => handleBuildDescriptionChange(e)}
			/>
		</Box>
	);
};

// https://redux.js.org/recipes/usage-with-typescript
const mapStateToProps = (state: RootState) => {
	return {
		buildDescription: state.build.description,
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		setBuildDescription: (newBuildDescription: string) =>
			dispatch({
				type: actionTypes.BUILD_SET_DESCRIPTION,
				data: newBuildDescription,
			}),
	};
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type BuildDescriptionProps = PropsFromRedux;

export default connector(BuildDescription);