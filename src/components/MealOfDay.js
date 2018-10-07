import React, {Component} from 'react'
import { connect } from 'react-redux'
import SecondaryNav from './SecondaryNav'
import {addEdmRecipeToMyRecipes} from '../actions'

class MealOfDay extends Component {

addToMyRecipes = (e, recipe) => {
	e.preventDefault();
	this.props.addRecipe(recipe);
}

render (){
	const {calendar, food} = this.props;
	const {day, meal} = this.props.match.params;
	const recipeOnScope = calendar[day][meal];
	const recipeObject = food[recipeOnScope];

	return (
		<div className="meal-ofday">
			<SecondaryNav title={day + "'s " + meal} routeBack="/" />
			<div className="container">
				<h6>{recipeOnScope}</h6>
				<p>** If it contains source and not already in recipes.edamamRecipes display add to my recipes button **</p>
				<a type="button" href="" onClick={(e) => this.addToMyRecipes(e, recipeObject)} className="btn btn-primary">+ Add to my recipes</a>
			</div>
			
		</div>
	)
}
}


function mapStateToProps({calendar, recipes, food}){
	return {calendar, recipes, food}
}
function mapDispatchToProps(dispatch){
	return {
		addRecipe: (data) => dispatch(addEdmRecipeToMyRecipes(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MealOfDay);