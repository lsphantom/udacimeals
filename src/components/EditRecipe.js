import React, {Component} from 'react'
import { connect } from 'react-redux'
import { editMyRecipe } from '../actions'
import SecondaryNav from './SecondaryNav'


class EditRecipe extends Component {
state = {
	label: '',
	imageURL: '',
	imageData: '',
	ingredients: [],
	ingredientLines: [],
	instructions: '',
	steps: [],
	wwPoints: null,
	ingredientName: '',
	ingredientQuantity: '1',
	ingredientUnit: '',
}

handleInputChange(input){
	this.setState({
		[input.target.id]: input.target.value,
	})
}
addIngredient(event){
	event.preventDefault();
	let currentIngredients = this.state.ingredients;
	let currentIngredientLines = this.state.ingredientLines;
	let newIngredient = {
		name: this.state.ingredientName,
		quantity: this.state.ingredientQuantity,
		unit: this.state.ingredientUnit,
	}
	let ingredientLine = this.state.ingredientName;

	currentIngredients.push(newIngredient);
	currentIngredientLines.push(ingredientLine);
	this.setState({
		ingredients: currentIngredients,
		ingredientLines: currentIngredientLines,
	})
	this.clearIngredientEntries();
}
addEdmIngredient(event){
	event.preventDefault();
	let currentIngredients = this.state.ingredients;
	let currentIngredientLines = this.state.ingredientLines;
	let newIngredient = `${this.state.ingredientQuantity} ${this.state.ingredientUnit} ${this.state.ingredientName} `;

	currentIngredients.push(newIngredient);
	this.setState({
		ingredients: currentIngredients,
		ingredientLines: currentIngredientLines,
	})
	this.clearIngredientEntries();
}
removeIngredient(ingredient){
	let {ingredients, ingredientLines} = this.state;
	let newIngredients = ingredients.filter(ing => ing.name !== ingredient);
	let newIngredientLines = ingredientLines.filter(ing => ing !== ingredient);
	this.setState({
		ingredients: newIngredients,
		ingredientLines: newIngredientLines,
	})
}
removeEdmIngredient(ingredient){
	let {ingredients, ingredientLines} = this.state;
	let newIngredients = ingredients.filter((ing, index) => index !== ingredient);
	let newIngredientLines = ingredientLines.filter((ing, index) => index !== ingredient);
	this.setState({
		ingredients: newIngredients,
		ingredientLines: newIngredientLines,
	})
}
clearIngredientEntries(){
	this.setState({
		ingredientName: '',
		ingredientQuantity: '1',
		ingredientUnit: '',
	})
}

addStep(event){
	event.preventDefault();
	let directions = this.state.steps;
	let currentStep = this.state.instructions;
	directions.push(currentStep);
	this.clearInstructionStep();
}
removeStep(step){
	let currentSteps = this.state.steps;
	let newSteps = currentSteps.filter( (e, index) => index !== step );
	this.setState({steps: newSteps});
}
clearInstructionStep(){
	this.setState({	instructions: '' })
}

pushChanges(recipes){
	//find index and remove recipe from array
	const currentRecipeId = this.state.currentRecipe.id;
	let currentRecipe = this.state.currentRecipe;
	const recipeIndex = recipes.map((r) => r.id).indexOf(currentRecipeId);
	let newRecipes = recipes;

	//modify recipe
		currentRecipe.label = this.state.label;
		currentRecipe.image = this.state.imageURL;
		currentRecipe.ingredientLines = this.state.ingredientLines;
		currentRecipe.steps = this.state.steps;
		currentRecipe.wwPoints = this.state.wwPoints;
	
	//modify array
		newRecipes[recipeIndex] = currentRecipe;

	//push array with modified recipe
	this.props.dispatch(editMyRecipe(newRecipes));
	this.props.history.push('/kitchen');
}

componentDidMount(){
	const thisRecipeID = this.props.match.params.recipe_id;
	const myRecipes = this.props.recipes.myRecipes;
	let thisRecipe = myRecipes.filter((r) => (r.id === thisRecipeID));
		thisRecipe = thisRecipe[0];

	if (thisRecipe.source){
		this.setState({
			label: thisRecipe.label,
			imageURL: thisRecipe.image,
			imageData: '',
			ingredients: thisRecipe.ingredientLines,
			ingredientLines: thisRecipe.ingredientLines,
			instructions: '',
			steps: thisRecipe.steps ? thisRecipe.steps : [],
			wwPoints: thisRecipe.wwPoints,
			ingredientName: '',
			ingredientQuantity: '1',
			ingredientUnit: '',
			source: thisRecipe.source,
			edm: true,
			currentRecipe: thisRecipe,
		})
	} else {
		this.setState({
			label: thisRecipe.label,
			imageURL: thisRecipe.image,
			imageData: '',
			ingredients: thisRecipe.ingredients,
			ingredientLines: thisRecipe.ingredientLines,
			instructions: thisRecipe.instructions,
			steps: thisRecipe.steps,
			wwPoints: thisRecipe.wwPoints,
			ingredientName: '',
			ingredientQuantity: '1',
			ingredientUnit: '',
			edm: false,
		})
	}
	
}

render(){
	const {label, instructions, ingredients, steps, wwPoints, edm} = this.state;
	const {recipe_id} = this.props.match.params;
	const currentRecipes = this.props.recipes.myRecipes;

	return (
		<div id="edit-recipe-container">
			<SecondaryNav title="Edit Recipe" routeBack="/kitchen" />
			<div id="add-recipe-container" className="container-fluid">
				<form className="add-recipe-form">
					<p className="add-recipe-form-heading">Recipe Name <span className="redbull">&bull;</span></p>
					<input id="label"
							type="text"
							className="form-control"
							placeholder="Recipe Name"
							value={this.state.label}
							onChange={(event) => this.handleInputChange(event)}
					 />

					 <br />

					 <input id="imageURL" type="text" className="form-control" placeholder="Image URL" value={this.state.imageURL} onChange={(e) => this.handleInputChange(e)} />

					<hr/>

					<div id="ingredients-form">
					<p className="add-recipe-form-heading">Ingredients List</p>

						<ul id="ingredients-preview-list">
							{
								!edm && ingredients.length > 0
								? ingredients.map((ingredient, index) => 
									<li key={index}>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`} <a href="" onClick={(e) => {e.preventDefault(); this.removeIngredient(ingredient.name)}}>x</a></li>
								)
								: null
							}
							{
								edm && ingredients.length > 0
								? ingredients.map((ingredient, index) => 
									<li key={index}>{ingredient} <a href="" onClick={(e) => {e.preventDefault(); this.removeEdmIngredient(index)}}>x</a></li>
								)
								: null
							}
						</ul>
						<div className="ingredient-row">
							<input id="ingredientName" type="text" className="form-control" placeholder="Ingredient" value={this.state.ingredientName} onChange={(e) => this.handleInputChange(e)} />
							<input id="ingredientQuantity" type="number" className="form-control" placeholder="1" min="1" max="99" value={this.state.ingredientQuantity} onChange={(e) => this.handleInputChange(e)} />
							<input id="ingredientUnit" type="text" className="form-control" placeholder="Unit" value={this.state.ingredientUnit} onChange={(e) => this.handleInputChange(e)} />
							<input id="ingredient-submit" type="submit" className="form-control" value="Add" disabled={this.state.ingredientName === '' ? true : false} onClick={!edm ? (event) => this.addIngredient(event) : (event) => this.addEdmIngredient(event)} />
						</div>


						<hr/>

						<p className="add-recipe-form-heading">Cooking Steps <span className="redbull">&bull;</span></p>
						
						<ol id="steps-preview-list">
							{
								steps.length > 0
								?  steps.map((step, index) => 
									<li key={index}><span className="step-identifier">{index + 1}</span> {step} <a href="" onClick={(e) => {e.preventDefault(); this.removeStep(index)}}>x</a></li>
								)
								: null
							}
						</ol>
						<div className="instructions-row">
						<textarea id="instructions"
								type="text" 
								className="form-control"
								placeholder="Recipe instruction step"
								value={this.state.instructions}
								onChange={(event) => this.handleInputChange(event)}
						></textarea>
						<input id="step-submit" type="submit" className="form-control" value="Add" disabled={instructions === '' ? true : false} onClick={(event) => this.addStep(event)} />
						</div>
					  
					  <hr/>
					  <p className="add-recipe-form-heading">Point system</p>
					  
					  	<div className="point-system">
					  	<p className="ww-logo">weightwatchers</p>
						<input id="wwPoints"
								type="number"
								className="form-control"
								value={wwPoints ? wwPoints : ''}
								onChange={(event) => this.handleInputChange(event)}
						/>
						</div>
						<input id="submit-recipe"
								type="submit"
								className="btn btn-primary btn-block"
								disabled={label.length === 0 ? true : false}
								value="Save"
								onClick={(e) => {e.preventDefault(); this.pushChanges(currentRecipes)}}
						/>
					</div>
				</form>
			</div>
		</div>
	)
}
}


function mapStateToProps({recipes, food}){
	return{ recipes, food, }
}

function mapDispatchToProps(dispatch){
	return{dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);