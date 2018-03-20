import { combineReducers } from 'redux'
import {
	ADD_RECIPE,
	REMOVE_RECIPE,
	MY_RECIPES_ADD,
	MY_RECIPES_REMOVE,
	EX_RECIPES_ADD,
	EX_RECIPES_REMOVE,
	SET_DATES,
	CLEAR_DATES,
	REMOVE_FROM_CALENDAR,
	CLEAR_MEALS,
	ADD_ITEM_TO_PANTRY
} from '../actions'

function food (state = {}, action) {
	const { recipe, newSet } = action
	switch (action.type) {
		case ADD_RECIPE :
			return {
				...state,
				[recipe.label]: recipe
			}
		case REMOVE_RECIPE :
			return { newSet }
		default :
			return state
	}
}

const initialRecipesState = {
	myRecipes: [],
	edamamRecipes: [],
}

function recipes (state = initialRecipesState, action) {
	const {recipe, recipes} = action
	switch (action.type) {
		case MY_RECIPES_ADD :
			return {
				myRecipes: [...state.myRecipes, recipe],
				edamamRecipes: [...state.edamamRecipes],
			}
		case MY_RECIPES_REMOVE :
			return {
				myRecipes: recipes,
				edamamRecipes: [...state.edamamRecipes],
			}
		case EX_RECIPES_ADD :
			return {
				myRecipes: [...state.myRecipes],
				edamamRecipes: [...state.edamamRecipes, recipe],
			}
		case EX_RECIPES_REMOVE :
			return {
				myRecipes: [...state.myRecipes],
				edamamRecipes: recipes,
			}
		default:
			return state
	}
}

function dates (state = '', action) {
	switch (action.type) {
		case SET_DATES :
			const start = action.start
			return start

		case CLEAR_DATES :
			return ''

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
	const { day, meal, recipe } = action

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
		case CLEAR_MEALS:
			return initialCalendarState
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
	recipes,
	calendar,
	dates,
	pantry,
})