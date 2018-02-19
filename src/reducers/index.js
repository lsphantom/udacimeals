import { combineReducers } from 'redux'
import {
	ADD_RECIPE,
	SET_DATES,
	CLEAR_DATES,
	REMOVE_FROM_CALENDAR,
	ADD_ITEM_TO_PANTRY
} from '../actions'

function food (state = {}, action) {
	switch (action.type) {
		case ADD_RECIPE :
			const { recipe } = action

			return {
				...state,
				[recipe.label]: recipe
			}
		default :
			return state
	}
}

function dates (state = {}, action) {
	switch (action.type) {
		case SET_DATES :
			const { start } = action
			return {
				...state,
				start
			}

		case CLEAR_DATES :
			return {}

		default :
			return state
	}
}

const initialCalendarState = {
	sunday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	monday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	tuesday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	wednesday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	thursday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	friday: {
		breakfast: null,
		lunch: null,
		dinner: null
	},
	saturday: {
		breakfast: null,
		lunch: null,
		dinner: null
	}
}

function calendar (state = initialCalendarState, action) {
	const { day, recipe, meal } = action

	switch (action.type){
		case ADD_RECIPE: 
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: recipe.label,
				}
			}
		case REMOVE_FROM_CALENDAR:
			return {
				...state,
				[day]: {
					...state[day],
					[meal]: null,
				}
			}
		default:
			return state
	}
}

const initialPantryState = {
	item_name: {
		name: null,
		unit: null,
		quantity: 0
	}
}

function pantry (state = initialPantryState, action) {

	switch (action.type) {
		case ADD_ITEM_TO_PANTRY:
			return state
		default:
			return state
	}
}

export default combineReducers({
	food,
	calendar,
	dates,
	pantry,
})