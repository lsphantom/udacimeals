import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import {
	ADD_RECIPE,
	REMOVE_RECIPE,
	MY_RECIPES_ADD,
	MY_RECIPES_REMOVE,
	MY_RECIPES_EDIT,
	SET_DATES,
	CLEAR_DATES,
	REMOVE_FROM_CALENDAR,
	CLEAR_MEALS,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT_SUCCESS,
	SIGNUP_FAILED,
	SIGNUP_SUCCESS,
	LOAD_DB_RECIPES
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

function recipes (state = [], action) {
	const {recipe, recipes} = action
	switch (action.type) {
		case MY_RECIPES_ADD :
			return [...state, recipe]
				
		case MY_RECIPES_REMOVE :
			return [...recipes]

		case MY_RECIPES_EDIT :
			return [...recipes]
		
		case LOAD_DB_RECIPES:
			return [...state, ...recipes]

		default:
			return state
	}
}

function startdate (state = 'default', action) {
	switch (action.type) {
		case SET_DATES :
			const start = action.start
			return start

		case CLEAR_DATES :
			return 'default'

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

const initAuthState = {}

const auth = (state = initAuthState, action) => {
	switch(action.type){
		case LOGIN_ERROR:
			console.log('login error');
			return {
				...state,
				authError: 'Login Failed!'
			}
		case LOGIN_SUCCESS:
			console.log('login success');
			return {
				...state,
				authError: null
			}
		case LOGOUT_SUCCESS:
			console.log('logout success');
			return state;

		case SIGNUP_FAILED:
			console.log('signup failed');
			return {
				...state,
				authError: action.err.message
			}
		case SIGNUP_SUCCESS:
			console.log('signup success');
			return {
				...state,
				authError: null
			}
		default:
			return state;
	}
}


export default combineReducers({
	food,
	recipes,
	calendar,
	startdate,
	auth,
	firestore: firestoreReducer,
	firebase: firebaseReducer
})