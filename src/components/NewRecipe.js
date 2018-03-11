import React, {Component} from 'react'
import { connect } from 'react-redux'
import { addToMyRecipes } from '../actions'
import { Link } from 'react-router-dom'
//import ImageInput from './ImageInput'

const uuidv4 = require('uuid/v4');


class NewRecipe extends Component {
state = {
	label: '',
	imageURL: '',
	imageData: '',
	ingredients: [],
	instructions: '',
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
	let newIngredient = {
		name: this.state.ingredientName,
		quantity: this.state.ingredientQuantity,
		unit: this.state.ingredientUnit,
	}
	currentIngredients.push(newIngredient);
	this.setState({
		ingredients: currentIngredients,
	})
	this.clearIngredientEntries();
}
removeIngredient(ingredient){
	let {ingredients} = this.state;
	let newIngredients = ingredients.filter(ing => ing.name !== ingredient);
	this.setState({
		ingredients: newIngredients,
	})
}
clearIngredientEntries(){
	this.setState({
		ingredientName: '',
		ingredientQuantity: '1',
		ingredientUnit: '',
	})
}

addNewRecipe(e){
	e.preventDefault();
	let recipeID = uuidv4();

	let newRecipe = {
		id: recipeID,
		label: this.state.label,
		image: this.state.imageURL,
		ingredients: this.state.ingredients,
		instructions: this.state.instructions,
		wwPoints: this.state.wwPoints,
	}

	this.props.dispatch(addToMyRecipes(newRecipe));
	this.props.history.push('/kitchen');
}

render(){
	const {label, instructions, ingredients} = this.state;
	return (
		<div>
			<nav id="secondaryNav" className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<div className="left-nav-links">
					<Link to="/kitchen" className="close-create-recipe" />
				</div>
				<div className="app-brandname">
					<h4>Add a recipe</h4>
				</div>
			</div>
			</nav>
			<div id="add-recipe-container" className="container-fluid">
				<form className="add-recipe-form">
					<p className="add-recipe-form-heading">Let's name this recipe <span className="redbull">&bull;</span></p>
					<input id="label"
							type="text"
							className="form-control"
							placeholder="Recipe Name"
							value={this.state.name}
							onChange={(event) => this.handleInputChange(event)}
					 />

					 <br />

					 <input id="imageURL" type="text" className="form-control" placeholder="Image URL" value={this.state.imageURL} onChange={(e) => this.handleInputChange(e)} />
					{/*<ImageInput className="recipe-image"
								name="recipeImageURL"
								maxHeight={1150}
					/>*/}

					<hr/>

					<div id="ingredients-form">
					<p className="add-recipe-form-heading">Let's add some ingredients</p>
						<div className="ingredient-row">
						<input id="ingredientName" type="text" className="form-control" placeholder="Ingredient" value={this.state.ingredientName} onChange={(e) => this.handleInputChange(e)} />
						<input id="ingredientQuantity" type="number" className="form-control" placeholder="1" min="1" max="99" value={this.state.ingredientQuantity} onChange={(e) => this.handleInputChange(e)} />
						<input id="ingredientUnit" type="text" className="form-control" placeholder="Unit" value={this.state.ingredientUnit} onChange={(e) => this.handleInputChange(e)} />
						<input id="ingredient-submit" type="submit" className="form-control" value="Add" disabled={this.state.ingredientName === '' ? true : false} onClick={(event) => this.addIngredient(event)} />
						</div>

						<ul id="ingredients-preview-list">
							{
								ingredients.length === 0
								? null
								: ingredients.map((ingredient, index) => 
									<li key={index}>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`} <a href="" onClick={(e) => {e.preventDefault(); this.removeIngredient(ingredient.name)}}>x</a></li>
								)
							}
						</ul>


						<hr/>

						<p className="add-recipe-form-heading">Let's add some cooking instructions <span className="redbull">&bull;</span></p>
						<textarea id="instructions"
								type="text" 
								className="form-control"
								placeholder="Recipe instructions"
								value={this.state.instructions}
								onChange={(event) => this.handleInputChange(event)}
						></textarea>
					  
					  <hr/>
					  <p className="add-recipe-form-heading">Let's add a point system</p>
					  
					  	<div className="point-system">
					  	<p className="ww-logo">weightwatchers</p>
						<input id="wwPoints"
								type="number"
								className="form-control"
								onChange={(event) => this.handleInputChange(event)}
						/>
						</div>
						<input id="submit-recipe"
								type="submit"
								className="btn btn-primary btn-block"
								disabled={label.length === 0 || instructions.length === 0 ? true : false}
								value="Submit"
								onClick={(e) => this.addNewRecipe(e)}
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

export default connect(mapStateToProps, mapDispatchToProps)(NewRecipe);