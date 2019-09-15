export const APP_FRAME = 'APP_FRAME'
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

export const SIGNUP_FAILED = 'SIGNUP_FAILED'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'

export const LOAD_DB_RECIPES = 'LOAD_DB_RECIPES'

export function setFramework (basis) {
	return {
		type: APP_FRAME,
		framework: basis
	}
}

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
//Firestore save recipe to user
export const saveRecipeToDB = ( recipe ) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		//const user = getState().firebase.auth.uid;
		//firestore.collection('userdata').doc(user).collection('recipes').doc(recipe.id).set({ // UNABLE TO WRITE TO USER COLLECTION FOR NOW.
		firestore.collection('recipes').doc(recipe.id).set(
			recipe
		).then(()=>{
			dispatch(addToMyRecipes( recipe ));
		}).catch((err) => console.log(err));
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
//Firestore edit user's recipe
export const editRecipeInDB = ( recipe ) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		const firestore = getFirestore();
		const user = getState().firebase.auth.uid;
		firestore.collection('userdata').doc(user).collection('recipes').doc(recipe.id).set({
			recipeName: recipe.label,
			recipeObj: recipe
		}).then(() => {
			//dispatch editMyRecipe but fix so that only one recipe is sent.
		}).catch((err) => console.log(err));
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

//Firebase create new user
export const signUp = (newUser) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((res) => {
			const {uid} = res.user;
			return firestore.collection('userdata').doc(uid).set({
				firstName: newUser.firstName,
				lastName: newUser.lastName
			});
		}).then(() => {
			dispatch({ type: SIGNUP_SUCCESS });
		}).catch(err => {
			dispatch({ type: SIGNUP_FAILED });
		})
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
			dispatch({type: LOGOUT_SUCCESS});
		});
	}
}

export const loadRecipes = (recipes) => {
	return {
		type: LOAD_DB_RECIPES,
		recipes
	}
}