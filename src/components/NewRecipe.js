import React, {Component} from 'react'
//import { connect } from 'react-redux'
//import { addRecipe, removeFromCalendar } from '../actions'
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'

class NewRecipe extends Component {
render(){
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
				<form>
					<input id="recipe-name" type="text" className="form-control" placeholder="Recipe Name" />
					<ImageInput className="recipe-image"
								name="recipeImageURL"
								maxHeight={1150}
					/>

					<div id="ingredients-form">
						<input id="ingredient-name" type="text" className="form-control" />
						<input id="ingredient-quantity" type="number" className="form-control" />
						<input id="ingredient-unit" type="text" className="form-control" />
						<ul className="ingredients-preview-list">
							<li>Test Item 00 Unit</li>
						</ul>
						<input id="recipe-instructions" type="text" className="form-control" />
						<input id="recipe-ww-points" type="number" className="form-control" />
					</div>
				</form>
			</div>
		</div>
	)
}
}

export default NewRecipe;