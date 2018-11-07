export const ADD_RECIPE = 'ADD_RECIPE'
export const REMOVE_RECIPE = 'REMOVE_RECIPE'

export const MY_RECIPES_ADD = 'MY_RECIPES_ADD'
export const MY_RECIPES_REMOVE = 'MY_RECIPES_REMOVE'
export const MY_RECIPES_EDIT = 'MY_RECIPES_EDIT'

export const SET_DATES = 'SET_DATES'
export const CLEAR_DATES = 'CLEAR_DATES'

export const REMOVE_FROM_CALENDAR = 'REMOVE_FROM_CALENDAR'
export const CLEAR_MEALS = 'CLEAR_MEALS'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export function addRecipe ({ day, meal, recipe }) {
	return {
		type: ADD_RECIPE,
		recipe,
		day,
		meal,
	}
}

export const addMealToDay = ({day, meal, recipe}) => {
	return {
		type: REMOVE_RECIPE,
		recipe,
		day,
		meal
	}
}

//Firestore addRecipe testing
/*export const addRecipe = ({day, meal, recipe}) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		firestore.collection('recipes').add({
			title: recipe.label,
			content: recipe
		}).then(()=>{
			dispatch({type: ADD_RECIPE, recipe, day, meal})
		}).catch((err) => console.log(err));
	}
}*/

export function removeRecipe ({day, meal, recipes}) {
	return {
		type: REMOVE_RECIPE,
		day,
		meal,
		recipes,
	}
}

export function addToMyRecipes ( recipe ) {
	return {
		type: MY_RECIPES_ADD,
		recipe
	}
}

export function deleteFromMyRecipes ( recipes ) {
	return {
		type: MY_RECIPES_REMOVE,
		recipes
	}
}

export function editMyRecipe ( recipes ) {
	return {
		type: MY_RECIPES_EDIT,
		recipes
	}
}

export function setDates (start) {
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

export function clearCalendar () {
	return {
		type: CLEAR_MEALS,
	}
}


export const signIn = (credentials) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: LOGIN_SUCCESS });
		}).catch((err) => {
			dispatch({ type: LOGIN_ERROR, err });
		})
	}
}

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({type: LOGOUT_SUCCESS})
		});
	}
}