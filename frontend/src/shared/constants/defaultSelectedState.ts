import { GameMode, GameRegion } from './constants';

// Update object if backend data is edited
export const DefaultSelectedState = {
	ROLE: {
		id: '53f90d2a-d970-41ec-8d5c-f8775580ad7e',
		roleName: 'Top',
	},
	CHAMPION: {
		id: '48ca031a-d92e-44e6-b7b6-f3eb1dbe644c',
		championName: 'Ahri',
		lane: ['Middle'],
		tier: { Middle: 'A' },
		title: 'Nine-Tailed Fox',
		counters: {
			weakAgainst: [
				{
					championName: 'Diana',
					id: '18b6e1ed-ac12-4d68-9a63-23dae586573d',
				},
				{
					championName: 'Yasuo',
					id: 'e9759479-e2b8-45d4-84ce-6711c7371591',
				},
				{
					championName: 'Annie',
					id: '1288001a-15b1-4ab9-b78e-c70eaac4ac57',
				},
			],
			strongAgainst: [
				{
					championName: 'Orianna',
					id: '15d2e7a9-c27c-491e-8d3f-888fd05b6cca',
				},
				{
					championName: 'Twisted Fate',
					id: '85f2909d-e3c1-425b-8398-5c8b9c145633',
				},
				{
					championName: 'Katarina',
					id: '9e6cb903-c70b-49c7-84e3-8015d7ef3488',
				},
			],
		},
	},
	GAMEMODE: GameMode.NORMAL,
	ITEM: {
		id: 'a42bcabd-290c-47f2-ae68-258d412c6d8d',
		itemName: 'Abyssal Mask',
		category: 'defense',
		tier: 'upgraded',
		statistics: [
			'+300 Max Health',
			'+40 Magic Resistance',
			'+300 Max Mana',
			'+10 Ability Haste',
		],
		description: [
			'Eternity: Restore Mana equal to 15% of the damage taken from champions. Regen Health equal to 20% of Mana spent. Capped at 25 Health per cast.',
			'Abyssal: Nearby enemy champions take 15% bonus magic damage.',
		],
		price: 2800,
		status: 'active',
	},
	RANK: {
		id: 'a4938a79-f11f-4ee1-9ec5-7741a12c4ef9',
		rankName: 'Unranked',
	},
	RUNES: {
		keystone: {
			id: 'feadf691-c740-4e7d-a4e8-9c705a48ea6a',
			runeName: 'Aery',
			type: 'keystone',
			description: [
				'Basic attacks and abilities against an enemy champion signals Aery to dash to them, dealing 10 - 60 (based on level) (+ 20% bonus AD) (+ 10% AP) Adaptive damage. Healing, shielding, or buffing an ally signals Aery to dash to them, shielding them for 20 - 120 (based on level) (+ 40% bonus AD) (+ 20% AP) for 2 seconds.',
				'Aery lingers on the target for 2 seconds before flying back to the user, and cannot be sent out again until she returns. Aery is initially very slow, but gradually accelerates, and can be picked up by moving near her.',
				'Adaptive Damage: Deals either physical or magic damage depending on your bonus stats, defaulting based on the origin of the effect.',
			],
		},
		domination: {
			id: '7a61f821-168c-4817-bbdd-daf3ce5439dc',
			runeName: 'Brutal',
			type: 'secondary',
			path: 'domination',
			description: [
				'Gain 7 AD and 2% armor penetration, or 14 AP and 2% magic penetration. (Adaptive)',
			],
		},
		resolve: {
			id: 'fc2532cb-e6d9-4577-a567-4f10fff13e0a',
			runeName: 'Backbone',
			type: 'secondary',
			path: 'resolve',
			description: [
				'Gain 10 AR or 10 MR, based on whichever stat you have less of.',
			],
		},
		inspiration: {
			id: '80216900-b198-4195-ab1c-e6e309c28ff3',
			runeName: 'Hunter - Genius',
			type: 'secondary',
			path: 'inspiration',
			description: [
				'Gain 2.5 Ability Haste.',
				'Unique champion takedowns grant 2.5 Ability Haste. (Max Ability Haste 15)',
			],
		},
	},
	REGION: GameRegion.SEA,
	SPELLS: {
		spellOne: {
			id: 'dd6ff556-3b07-4be0-bd1f-c2dd9c9ce1dd',
			spellName: 'Flash',
			applicableMaps: ['wild_rift', 'howling_abyss'],
			description: [
				'Teleport a short distance forward or towards the aimed direction.',
			],
			cooldown: '150',
		},
		spellTwo: {
			id: 'aeb37ecd-ccb5-41fc-ad9c-c9b6bef39e34',
			spellName: 'Ignite',
			applicableMaps: ['wild_rift', 'howling_abyss'],
			description: [
				'Ignites target enemy champion, dealing 60−410 (based on level) true damage over 5 seconds and inflincting them with Grievous Wounds.',
				'Grievous Wounds reduces healing effects by 50%',
			],
			cooldown: '90',
		},
	},
};
