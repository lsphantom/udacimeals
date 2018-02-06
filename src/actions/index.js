export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const ADD_ITEM_TO_PANTRY = 'ADD_ITEM_TO_PANTRY'

export function addRecipe ({ day, recipe, meal }) {
	return {
		type: ADD_RECIPE,
		recipe,
		day,
		meal,
	}
}

export function removeFromCalendar ({day, meal}) {
	return {
		type: REMOVE_FROM_CALENDAR,
		day,
		meal,
	}
}

export function addToPantry ({name, unit, quantity}) {
	return {
		type: ADD_ITEM_TO_PANTRY,
		name,
		unit,
		quantity,
	}
}