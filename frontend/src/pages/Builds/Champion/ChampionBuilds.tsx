import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
// @ts-ignore - No types for this module
import { Helmet } from 'react-helmet';
import { URL } from '../../../shared/config/config';
import axios from 'axios';

// MaterialUI
// Components
import Box from '@material-ui/core/Box';
import BuildsList from './components/BuildsList/BuildsList';
import Button from '@material-ui/core/Button';
import ChampionData from './components/ChampionData/ChampionData';
// CSS
import styles from './championbuilds.module.css';
// Types
import {
	BuildInterface,
	ChampionInterface,
} from '../../../shared/interfaces/interfaces';
type PathParamsType = {
	championName: string;
};
type ChampionBuildsType = {
	builds: Array<BuildInterface>;
	buildsCount: number;
};
type HeroBuildsProps = RouteComponentProps<PathParamsType> & {};

const HeroBuilds = (props: HeroBuildsProps) => {
	const { match } = props;
	const { championName } = match.params;

	const [championBuilds, setChampionBuilds] = useState<Array<BuildInterface>>(
		[]
	);
	const [championBuildsCount, setChampionBuildsCount] = useState(0);
	const [championData, setChampionData] = useState<ChampionInterface>({
		id: '',
		championName: '',
		counters: {
			weakAgainst: [],
			strongAgainst: [],
		},
		lane: [],
		tier: {},
		title: '',
	});

	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingMoreBuilds, setIsLoadingMoreBuilds] = useState(false);
	const [disableLoadMoreBuilds, setDisableLoadMoreBuilds] = useState(false);

	const page = useRef(1);

	// Returns 5 builds every time.
	const getBuildsForChampion = () => {
		return axios.post(`${URL.SERVER}/api/build/all/${championName}`, {
			page: page.current,
		});
	};
	const getMoreBuilds = async () => {
		setIsLoadingMoreBuilds(true);

		page.current = page.current + 1;

		const moreBuildsRequest = await getBuildsForChampion();
		const { data } = moreBuildsRequest;
		const { nextPage, hasNextPage, builds: newBuilds } = data;

		setIsLoadingMoreBuilds(false);

		// REMOVES LOAD MORE BUTTON
		// If there is no more next page
		if (!hasNextPage) {
			setDisableLoadMoreBuilds(true);
		}

		// but still display the remaining builds on the previous page
		setChampionBuilds((prev: Array<BuildInterface>) => {
			return [...prev, ...newBuilds];
		});
	};

	// Load builds and champion data
	useEffect(() => {
		const getOneChampion = axios.get(
			`${URL.SERVER}/api/champion/${championName}`
		);

		Promise.all([getBuildsForChampion(), getOneChampion]).then((values) => {
			const [{ data: buildsForChampion }, { data: dataForChampion }] = values;
			const { buildsCount, builds } = buildsForChampion;

			setChampionBuilds([...builds]);
			setChampionBuildsCount(buildsCount);

			setChampionData(dataForChampion[0]);

			setIsLoading(!isLoading);
		});
	}, []);

	return (
		<>
			{!isLoading ? (
				<>
					<Helmet>
						<title>
							{championData.championName} Builds and Guides - League of Legends:
							Wild Rift | Rift Builds
						</title>
					</Helmet>
					{/* Champion Data */}
					<ChampionData
						championData={championData}
						buildsCount={championBuildsCount}
					/>
					{/* Builds */}
					<BuildsList builds={championBuilds} />

					{/* Load More Button */}
					{championBuilds.length >= 5 && !disableLoadMoreBuilds ? (
						<Box
							display='flex'
							justifyContent='center'
							className={styles.loadMoreContainer}
						>
							<Button
								onClick={getMoreBuilds}
								variant='contained'
								className={styles.loadMoreButton}
								disabled={disableLoadMoreBuilds}
							>
								{isLoadingMoreBuilds ? 'Loading...' : 'Load more builds'}
							</Button>
						</Box>
					) : null}
				</>
			) : (
				<p>Loading...</p>
			)}
		</>
	);
};

export default withRouter(HeroBuilds);
