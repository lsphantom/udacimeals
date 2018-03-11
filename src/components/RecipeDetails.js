import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
//import { addRecipe, removeFromCalendar } from '../actions'


class RecipeDetails extends Component {
render(){
	const {recipe_id} = this.props.match.params;
	return (
		<div className="recipe-wrap">
			<nav id="secondaryNav" className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<div className="left-nav-links">
					<Link to="/kitchen" className="close-create-recipe" />
				</div>
				<div className="app-brandname">
					<h4>Recipe Details</h4>
				</div>
			</div>
			</nav>

			<p>{recipe_id}</p>
			<p>{JSON.stringify(this.props.recipes.myRecipes)}</p>

		</div>
	)
}
}

function mapStateToProps({recipes}){
	return {recipes}
}

export default connect(mapStateToProps)(RecipeDetails);