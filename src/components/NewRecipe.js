import React, {Component} from 'react'
//import { connect } from 'react-redux'
//import { addRecipe, removeFromCalendar } from '../actions'
import { Link } from 'react-router-dom'
//import ImageInput from './ImageInput'

class NewRecipe extends Component {
state = {
	name: '',
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
clearIngredientEntries(){
	this.setState({
		ingredientName: '',
		ingredientQuantity: '1',
		ingredientUnit: '',
	})
}

render(){
	const {ingredients} = this.state;
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
					<p className="add-recipe-form-heading">Let's name this recipe</p>
					<input id="name"
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
								: ingredients.map(ingredient => 
									<li>{`${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`}</li>
								)
							}
						</ul>


						<hr/>

						<p className="add-recipe-form-heading">Let's add some cooking instructions</p>
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
						<input id="submit-recipe" type="submit" className="btn btn-primary btn-block" value="Submit" />
					</div>
				</form>
			</div>
		</div>
	)
}
}


export default NewRecipe;