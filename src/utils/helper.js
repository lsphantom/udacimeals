export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}


// Local storage functions
export const loadState = () => {
	try	{
		const serializedState = localStorage.getItem('state');
		if (serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		let mutatedState = state;
			//delete mutatedState.firebase;
			//delete mutatedState.firestore;
			//delete mutatedState.auth;
		const serializedState = JSON.stringify(mutatedState);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// Log errors
		console.log(err);
	}
}
