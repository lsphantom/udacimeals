import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import SecondaryNav from './SecondaryNav'
import {addToMyRecipes, deleteFromMyRecipes} from '../actions'

class MealOfDay extends Component {
state = {
	currentStep: 0,
	showIngredients: false
}

saveRecipe = (e, recipe) => {
	e.preventDefault();
	this.props.addRecipe(recipe);
}
removeRecipe = (e, recipe) => {
	e.preventDefault();
	const currentRecipes = this.props.recipes;
	const recipeId = recipe.id;
	let newRecipes = currentRecipes.filter((r) => (r.id !== recipeId));
	
	//Dispatch action
	this.props.deleteRecipe(newRecipes);
}
handlePreviousStep = (e) => {
	e.preventDefault();
	this.setState({
		currentStep: this.state.currentStep -1,
	});
}
handleNextStep = (e) => {
	e.preventDefault();
	this.setState({
		currentStep: this.state.currentStep +1,
	});
}
openIngModal = (e) => {
	e.preventDefault();
	this.setState({
		showIngredients: true,
	});
}
closeIngModal = (e) => {
	e.preventDefault();
	this.setState({
		showIngredients: false,
	});
}

render (){
	const {calendar, recipes, food} = this.props;
	const {day, meal} = this.props.match.params;
	const recipeOnScope = calendar[day][meal];
	const recipeObject = food[recipeOnScope];
	const inMyRecipes = recipes.filter((cr) => (cr.id === food[recipeOnScope].id) );
	const activeStep = this.state.currentStep;

	return (
		<div className={`meal-ofday ${meal}-container`}>
			<SecondaryNav title={day + "'s " + meal} routeBack="/" />
			<div className="container" >
			<div className="row">
				<div className="col-sm-12"><h3>{recipeOnScope}</h3> </div>
			</div>

			<div className="row">
				<div className="col-sm-6 recipe-showcase-left">
				

				{ recipeObject.steps && recipeObject.steps.length>0
					? <div className="step-showcase-counter">{activeStep + 1}</div>
					: null
				}

				{ recipeObject.source && inMyRecipes.length === 0
					? <div>
						<a href="" onClick={(e) => this.saveRecipe(e, recipeObject)} className="btn btn-primary">+ Save to my recipes</a>
					  	<br/><br/>
					  </div>
					: null
				}
				{ recipeObject.source && inMyRecipes.length > 0
					? <div>
						<a href="" onClick={(e) => this.removeRecipe(e, recipeObject)} className="btn btn-primary btn-add-recipe">- Remove from my recipes</a>
					  	<br/><br/>
					  </div>
					: null
				}


				{ recipeObject.ingredientLines && recipeObject.ingredientLines.length>0
					? <a href="" onClick={(e) => this.openIngModal(e)}>Ingredients List</a>
					: null
				}
				
					
				{ recipeObject.steps && recipeObject.steps.length>0
					? <div className="mod-steps">{/*<h6>Instructions</h6>*/}
						{recipeObject.steps.map((step, index) => 
						<div key={index} className={`mod-step ${index === activeStep ? 'active': ''} ${index === activeStep -1 ? 'pre-active' : ''}`}>
							{step}
						</div>
						)}
					  </div>
					: <div className="mod-steps no-recipes">
							<div className="mod-step">
							<p>No recipe instructions available.</p>
								{ recipeObject.url
									? <a href={recipeObject.url} target="_blank">See the original recipe &rarr;</a>
									: null
								}
							</div>
						</div>
				}

				
				<div className="step-navigator">
				{ recipeObject.steps && activeStep !== 0
					? <div className="previous-step-button">
					  	<a href="" className="btn btn-primary larr" onClick={(e) => this.handlePreviousStep(e)}>&uarr;</a>
					  </div>
					: null
				}

				{ recipeObject.steps && activeStep < recipeObject.steps.length-1
					? <div className="next-step-button">
					  	<a href="" className="btn btn-primary rarr" onClick={(e) => this.handleNextStep(e)}>&darr;</a>
					  </div>
					: null
				}
				</div>
				

				</div>

				<div className="col-sm-6 recipe-showcase-right">
					<div className="recipe-lg-thumb" style={{backgroundImage: `url(${recipeObject.image})`}}></div>
				</div>
				</div>
			</div>
			

			<Modal
				className='modal'
				overlayClassName='overlay'
				isOpen={this.state.showIngredients}
				onRequestClose={this.closeIngModal}
				ariaHideApp={false}
				contentLabel='Modal'>
				<div className="mod-ingredients">
				<h4 className="center">Ingredients List</h4>
				<hr/>
				<ul className="modal-ing-list">
					{ recipeObject.ingredients && recipeObject.ingredients.length>0 
						?	recipeObject.ingredients.map((ing, index) => 
								<li key={index}>
									{  ing.quantity
										? `${ing.quantity} ${ing.unit} - ${ing.name}`
										: `${ing.text}`
									}			
								</li> )
						: 	recipeObject.ingredientLines.map((ing, index) => 
								<li key={index}>{ing}</li> )
					}
				</ul>
				</div>
			</Modal>
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