import {
	ChampionInterface,
	ItemInterface,
	RankInterface,
	RoleInterface,
	RuneInterface,
	SpellInterface,
} from '../interfaces/GameData';
import { BuildInterface } from '../interfaces/Build';
import { BuildValidationHelper } from './buildValidationHelpers';
import { ItemType, GameMode, GameRegion } from '../constants/constants';
import { RequiredLength } from '../constants/requiredLength';
import { Message } from '../constants/validationMessages';

const HAS_BUILD_TITLE = (build: BuildInterface) => {
	if (build.buildTitle) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NO_BUILD_TITLE,
		false
	);
};

const HAS_ITEMS_SELECTED = (build: BuildInterface) => {
	if (build.itemsConfirmed.length !== 0) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NO_ITEMS_SELECTED,
		false
	);
};

const HAS_THREE_TO_SIX_PRIMARY_ITEMS = (build: BuildInterface) => {
	const lengthOfPrimaryItems = build.itemsConfirmed.filter(
		(item: ItemInterface) => item.type === 'primary'
	).length;

	const hasThreeToSixPrimaryItems =
		lengthOfPrimaryItems >= RequiredLength.ITEMS.PRIMARY.MIN_LENGTH &&
		lengthOfPrimaryItems <= RequiredLength.ITEMS.PRIMARY.MAX_LENGTH;

	if (hasThreeToSixPrimaryItems) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.DOES_NOT_HAVE_THREE_TO_SIX_PRIMARY_ITEMS,
		false
	);
};

const HAS_USERNAME = (build: BuildInterface) => {
	if (build.username) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(Message.ERROR.NO_USERNAME, false);
};

const IS_VALID_BUILD_TITLE = (build: BuildInterface) => {
	const { buildTitle } = build;

	const isTypeString = BuildValidationHelper.isValidString(buildTitle);
	const isValidLength =
		buildTitle.length >= RequiredLength.BUILD_TITLE.MIN_LENGTH &&
		buildTitle.length <= RequiredLength.BUILD_TITLE.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_BUILD_TITLE,
		false
	);
};

const IS_VALID_USERNAME = (build: BuildInterface) => {
	const { username } = build;

	const isTypeString = BuildValidationHelper.isValidString(username);
	const isValidLength =
		username.length >= RequiredLength.USERNAME.MIN_LENGTH &&
		username.length <= RequiredLength.USERNAME.MAX_LENGTH;

	if (isTypeString && isValidLength) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_USERNAME,
		false
	);
};

const IS_VALID_ROLE = (build: BuildInterface, roles: Array<RoleInterface>) => {
	const { buildRole } = build;

	// Checks if buildRole.id and buildRole.roleName has a corresponding object to roles
	const isValidRole =
		roles.filter((role) => {
			return JSON.stringify(buildRole) === JSON.stringify(role);
		}).length === 1;

	if (isValidRole) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_ROLE,
		false
	);
};

const IS_VALID_GAME_MODE = (build: BuildInterface) => {
	const { gameMode } = build;

	const isValidGameMode =
		gameMode === GameMode.NORMAL || gameMode === GameMode.ARAM;
	const isTypeString = BuildValidationHelper.isValidString(gameMode);

	if (isValidGameMode && isTypeString) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_GAME_MODE,
		false
	);
};

const IS_VALID_BUILD_DESCRIPTION = (build: BuildInterface) => {
	const { description } = build;

	const isTypeString = BuildValidationHelper.isValidString(description);
	const isValidLength = BuildValidationHelper.isValidReasonLength(description);

	if (isTypeString && isValidLength) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_BUILD_DESCRIPTION,
		false
	);
};

const IS_VALID_CHAMPION = (
	build: BuildInterface,
	champions: Array<ChampionInterface>
) => {
	const { champion: buildChampion } = build;

	const isValidChampion =
		champions.filter((champion) => {
			// Checks if both objects have same properties and corresponding values
			// THE ORDER OF PROPERTIES IS IMPORTANT
			// Source: https://stackoverflow.com/questions/1068834/object-comparison-in-javascript

			return JSON.stringify(buildChampion) === JSON.stringify(champion);
		}).length === 1;

	if (isValidChampion) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_CHAMPION,
		false
	);
};

const IS_VALID_ITEMS_SELECTED = (
	build: BuildInterface,
	items: Array<ItemInterface>
) => {
	const { itemsConfirmed } = build;

	// Checks if every reason property of an item is type string and has valid length
	const validReasonTypeAndLength = itemsConfirmed
		.map((item: ItemInterface) =>
			BuildValidationHelper.isValidReasonTypeAndLength(item)
		)
		.every((boolIsTrue) => boolIsTrue);

	// Removes "reason" and "type" property which is defined by user
	const modifiedItemsConfirmed = itemsConfirmed.map((item: ItemInterface) => {
		const { reason, type, ...modifiedObject } = item;

		return modifiedObject;
	});

	// Return items from ITEMSCONFIRMED that are in ITEMS
	const validatedItems = items.filter((item) => {
		// Check if "some" items from MODIFIEDITEMSCONFIRMED are found in ITEMS
		if (
			modifiedItemsConfirmed.some(
				(buildItem) => JSON.stringify(buildItem) === JSON.stringify(item)
			)
		) {
			return item;
		}
	});

	// Check if valid items' (items that are in ITEMS array) length is
	// equal to length of ITEMSCONFIRMED
	if (
		validatedItems.length === itemsConfirmed.length &&
		validReasonTypeAndLength
	) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_ITEMS_SELECTED,
		false
	);
};

const IS_VALID_NUMBER_OF_ITEMS_SELECTED = (build: BuildInterface) => {
	const { itemsConfirmed } = build;

	const primaryItems = itemsConfirmed.filter(
		(item) => item.type === ItemType.PRIMARY
	).length;
	const optionalItems = itemsConfirmed.filter(
		(item) => item.type === ItemType.OPTIONAL
	).length;

	const isValidPrimaryItemsLength =
		primaryItems >= RequiredLength.ITEMS.PRIMARY.MIN_LENGTH &&
		primaryItems <= RequiredLength.ITEMS.PRIMARY.MAX_LENGTH;
	const isValidOptionalItemsLength =
		optionalItems >= RequiredLength.ITEMS.OPTIONAL.MIN_LENGTH &&
		optionalItems <= RequiredLength.ITEMS.OPTIONAL.MAX_LENGTH;

	if (isValidPrimaryItemsLength && isValidOptionalItemsLength) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_NUMBER_OF_ITEMS_SELECTED,
		false
	);
};

const IS_VALID_RUNES = (build: BuildInterface, runes: Array<RuneInterface>) => {
	const { runes: buildRunes } = build;
	const { keystone, domination, resolve, inspiration } = buildRunes;

	const VALID_KEYSTONE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...keystoneCopy } = keystone;

			return JSON.stringify(rune) === JSON.stringify(keystoneCopy);
		}).length === 1 &&
		BuildValidationHelper.isValidReasonTypeAndLength(keystone);

	const VALID_DOMINATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...dominationCopy } = domination;

			return JSON.stringify(rune) === JSON.stringify(dominationCopy);
		}).length === 1 &&
		BuildValidationHelper.isValidReasonTypeAndLength(domination);

	const VALID_RESOLVE =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...resolveCopy } = resolve;

			return JSON.stringify(rune) === JSON.stringify(resolveCopy);
		}).length === 1 &&
		BuildValidationHelper.isValidReasonTypeAndLength(resolve);

	const VALID_INSPIRATION =
		runes.filter((rune) => {
			// Remove reason property from build rune;
			const { reason, ...inspirationCopy } = inspiration;

			return JSON.stringify(rune) === JSON.stringify(inspirationCopy);
		}).length === 1 &&
		BuildValidationHelper.isValidReasonTypeAndLength(inspiration);

	if (
		VALID_KEYSTONE &&
		VALID_DOMINATION &&
		VALID_RESOLVE &&
		VALID_INSPIRATION
	) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_RUNES,
		false
	);
};

const IS_VALID_SPELLS = (
	build: BuildInterface,
	spells: Array<SpellInterface>
) => {
	const { spells: buildSpells } = build;
	const { spellOne, spellTwo } = buildSpells;

	const VALID_SPELL_ONE =
		spells.filter((spell) => {
			return JSON.stringify(spell) === JSON.stringify(spellOne);
		}).length === 1;

	const VALID_SPELL_TWO =
		spells.filter((spell) => {
			return JSON.stringify(spell) === JSON.stringify(spellTwo);
		}).length === 1;

	if (VALID_SPELL_ONE && VALID_SPELL_TWO) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_SPELLS,
		false
	);
};

const IS_VALID_RANK = (build: BuildInterface, ranks: Array<RankInterface>) => {
	const { rank: buildRank } = build;

	const isValidRank =
		ranks.filter((rank) => {
			return JSON.stringify(rank) === JSON.stringify(buildRank);
		}).length === 1;

	if (isValidRank) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_RANK,
		false
	);
};

const IS_VALID_REGION = (build: BuildInterface) => {
	const { region } = build;

	const isValidRegion =
		region === GameRegion.SEA ||
		region === GameRegion.NA ||
		region === GameRegion.EUW;
	const isTypeString = BuildValidationHelper.isValidString(region);

	if (isValidRegion && isTypeString) {
		return BuildValidationHelper.resultHandler(null, true);
	}

	return BuildValidationHelper.resultHandler(
		Message.ERROR.NOT_VALID_REGION,
		false
	);
};

export const BuildValidation = {
	HAS_BUILD_TITLE,
	HAS_ITEMS_SELECTED,
	HAS_THREE_TO_SIX_PRIMARY_ITEMS,
	HAS_USERNAME,
	IS_VALID_BUILD_TITLE,
	IS_VALID_USERNAME,
	IS_VALID_ROLE,
	IS_VALID_GAME_MODE,
	IS_VALID_BUILD_DESCRIPTION,
	IS_VALID_CHAMPION,
	IS_VALID_ITEMS_SELECTED,
	IS_VALID_NUMBER_OF_ITEMS_SELECTED,
	IS_VALID_RUNES,
	IS_VALID_SPELLS,
	IS_VALID_RANK,
	IS_VALID_REGION,
};
