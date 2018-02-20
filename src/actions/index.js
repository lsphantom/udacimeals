export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'
export const SET_DATES = 'SET_DATES'
export const CLEAR_DATES = 'CLEAR_DATES'
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

export function removeRecipe ({day, meal, recipes}) {
	return {
		type: REMOVE_RECIPE,
		day,
		meal,
		recipes,
	}
}


export function setDates ( {start} ) {
	return {
		type: SET_DATES,
		start,
	}
}

export function clearDates () {
	return {
		type: CLEAR_DATES,
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