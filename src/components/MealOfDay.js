import React, {Component} from 'react'
import { connect } from 'react-redux'
import SecondaryNav from './SecondaryNav'
import {addToMyRecipes, deleteFromMyRecipes} from '../actions'

class MealOfDay extends Component {
state = {
	currentStep: 0,
}

saveRecipe = (e, recipe) => {
	e.preventDefault();
	this.props.addRecipe(recipe);
}
removeRecipe = (e, recipe) => {
	e.preventDefault();
	const currentRecipes = this.props.recipes.myRecipes;
	const recipeId = recipe.id;
	let newRecipes = currentRecipes.filter((r) => (r.id !== recipeId));
	
	//Dispatch action
	this.props.deleteRecipe(newRecipes);
}

render (){
	const {calendar, recipes, food} = this.props;
	const {day, meal} = this.props.match.params;
	const recipeOnScope = calendar[day][meal];
	const recipeObject = food[recipeOnScope];
	const inMyRecipes = recipes.myRecipes.filter((cr) => (cr.id === food[recipeOnScope].id) );
	const activeStep = this.state.currentStep;

	return (
		<div className={`meal-ofday ${meal}-container`}>
			<SecondaryNav title={day + "'s " + meal} routeBack="/" />
			<div className="container" >
			<div className="row">
				<div className="col-sm-6 recipe-showcase-left">
				<h3>{recipeOnScope}</h3> 
				{ recipeObject.steps && recipeObject.steps.length>0
					? <div className="step-showcase-counter">{activeStep + 1}</div>
					: null
				}

				{ recipeObject.source && inMyRecipes.length === 0
					? <a href="" onClick={(e) => this.saveRecipe(e, recipeObject)} className="btn btn-primary">+ Save to my recipes</a>
					: null
				}
				{ recipeObject.source && inMyRecipes.length > 0
					? <a href="" onClick={(e) => this.removeRecipe(e, recipeObject)} className="btn btn-primary btn-add-recipe">- Remove from my recipes</a>
					: null
				}

				{ recipeObject.url
					? <a href={recipeObject.url} target="_blank">Open original recipe &rarr;</a>
					: null
				}

					
				{ recipeObject.steps && recipeObject.steps.length>0
					? <div className="mod-steps">
						{recipeObject.steps.map((step, index) => 
						<div key={index} className={`mod-step ${index === activeStep ? 'active': ''} ${index === activeStep -1 ? 'pre-active' : ''}`}>
							{step}
						</div>
						)}
					  </div>
					: null
				}
				
				</div>

				<div className="col-sm-6 recipe-showcase-right">
					<div className="recipe-lg-thumb" style={{backgroundImage: `url(${recipeObject.image})`}}></div>
				</div>
				</div>
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
		addRecipe: (data) => dispatch(addToMyRecipes(data)),
		deleteRecipe: (data) => dispatch(deleteFromMyRecipes(data))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MealOfDay);