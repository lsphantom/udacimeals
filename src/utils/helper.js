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
		const serializedState = JSON.stringify(state);
		localStorage.setItem('state', serializedState);
	} catch (err) {
		// Log errors
	}
}

/*const baseRecipe = {
	id: 12345,
	name: "+Recipe Name+",
	image: "+??+",
	source: "My Recipes",
	ingredients: [{
		item: "Ground Beef",
		quantity: 0.0,
		unit: "+unit+",
	}],
	instructions: "",
	wwPoints: "",
}*/