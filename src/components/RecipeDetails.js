import React, {Component} from 'react'
import { connect } from 'react-redux'
import { deleteFromMyRecipes } from '../actions'
import Modal from 'react-modal'
import SecondaryNav from './SecondaryNav'
import {Link} from 'react-router-dom'

class RecipeDetails extends Component {

state = {
	confirmationModalShow: false
}
showModal = (e) => {
	e.preventDefault();
	this.setState({confirmationModalShow: true});
}
hideModal = (e) => {
	e.preventDefault();
	this.setState({confirmationModalShow: false});
}

confirmPrompt = (e) => {
	e.preventDefault();
	if (window.confirm("Are you sure you want to delete this recipe?")) {
		// Trash it!
		this.deleteRecipe();
	} else {
		// Keep it!
	}
}

deleteRecipe = () => {
	//e.preventDefault();
	const currentRecipes = this.props.recipes.myRecipes;
	const recipe = this.props.match.params.recipe_id;
	let newRecipes = currentRecipes.filter((r) => (r.id !== recipe));
	
	//Dispatch and nav back to kitchen
	this.props.dispatch(deleteFromMyRecipes(newRecipes));
	this.props.history.push('/kitchen');
}

render(){
	const {recipe_id} = this.props.match.params;
	return (
		<div className="recipe-wrap">
			<SecondaryNav title="Recipe Details" routeBack="/kitchen" />
			{ this.props.recipes.myRecipes.filter((recipe) => recipe.id === recipe_id).map((recipe, index) => 
				<div className="recipe-detail-item" key={index}>
				<div className="recipe-image-banner" style={{backgroundImage: `url(${recipe.image})`}}>
				<div className="banner-fade-overlay">
					<div className="container">
						<p className="recipe-detail-title">{recipe.label}</p>
					</div>
				</div>
				

				</div>

					<div className="container recipe-detail-textbox">
					<div className="row">
						<div className="col-sm-6">
						{/* Add fave heart */}
						</div>
						<div className="col-sm-6" style={{textAlign:"right"}}>
							<Link to={`/recipes/edit/${recipe_id}`} className="btn btn-sm btn-primary">Edit Recipe</Link>
							&nbsp;
							<a href="" className="btn btn-sm btn-danger" onClick={(e) => this.confirmPrompt(e)}>Delete Recipe</a>
						</div>
					</div>


					{recipe.source == null && recipe.ingredients.length > 0
						? <div className="recipe-detail-ingredients">
							<h6>Ingredients:</h6>
							<ul>
								{ recipe.ingredients.map((ing, index) =>
									<li key={index}>{`${ing.quantity} ${ing.unit} ${ing.name}`}</li>
									)
								}
							</ul>
						  </div>
						: null
					}

					{recipe.source && recipe.ingredientLines.length > 0
						? <div className="recipe-detail-ingredients">
							<h6>Ingredients:</h6>
							<ul>
								{ recipe.ingredientLines.map((ing, index) =>
									<li key={index}>{ing}</li>
									)
								}
							</ul>
						  </div>
						: null
					}

					{ recipe.instructions
						? <div className="recipe-detail-instructions">
							<h6>Instructions:</h6>
							<p>{recipe.instructions}</p>
						  </div>
						: null
					}

					{ recipe.steps && recipe.steps.length>0
						? <div className="recipe-detail-instructions">
								<h6>Instructions:</h6>
								<ol id="steps-preview-list">
									{
										recipe.steps.length === 0
										? null
										: recipe.steps.map((step, index) => 
											<li key={index}><span className="step-identifier">{index + 1}</span> {step}</li>
										)
									}
								</ol>
							</div>
						: null
					}

					{ recipe.url
						? <div className="recipe-detail-instructions">
						<h6>Source URL:</h6>
							<a href={recipe.url} target="_blank">{recipe.url}</a>
						  </div>
						: null
					}

					
					{ recipe.source == null && recipe.wwPoints !== null
						? <div className="recipe-detail-instructions">
							<h6><span className="ww-circle-logo"></span> {recipe.wwPoints} {recipe.wwPoints > 1 ? 'Points' : 'Point'}</h6>
						  </div>
						: null
					}

					<br/>
					
					</div>
				</div>
			)}


			<Modal
				className="modal"
				overlayClassName="overlay"
				isOpen={this.state.confirmationModalShow}
				onRequestClose={this.hideModal}
				ariaHideApp={false}
				contentLabel="Modal"
			>
				<div id="delete-prompt-modal">
				<h2>Are you sure you want to delete this recipe?</h2>
				<p><em>There's no way to get it back...</em></p>
					<a href="" className="btn btn-sm btn-danger" onClick={(e) => this.deleteRecipe(e)}>Yes, Delete Recipe</a>
					<a href="" className="btn btn-sm btn-default" onClick={(e) => this.hideModal(e)}>No, Cancel</a>		
				</div>
			</Modal>

		</div>
	)
}
}

function mapStateToProps({recipes}){
	return {recipes}
}

export default connect(mapStateToProps)(RecipeDetails);