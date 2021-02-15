import React from 'react';

// MaterialUI
import Grid from '@material-ui/core/Grid';
// Components
import AppBar from './components/AppBar';
// CSS
//Types

const Header = () => {
	return (
		<>
			<Grid container>
				<AppBar />
			</Grid>
		</>
	);
};

export default Header;
