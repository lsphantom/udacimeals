import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Recipes extends Component {
render (){
	const {myRecipes} = this.props.recipes;
	return (
		<div id="recipes">
			<h4>My Recipes</h4>
			<hr />


			<div className="add-recipe">
				<Link to="/recipes/new/" />
			</div>


			{myRecipes.length > 0 
				? null
				: <p>You haven't created any recipes.</p>
			}
			

			<div className="my-recipes-list">
			{myRecipes.length > 0
				? myRecipes.map((recipe) =>
					<Link to={`/recipes/${recipe.id}`}>
					<div className="my-recipes-item">
					<div className="my-recipes-item-thumb">
						<img className="img-fluid" src={recipe.image} alt={recipe.label} />
					</div>
					<p className="my-recipes-item-label">{recipe.label}</p>
					</div>
					</Link> )
				: null
			}
			</div>


			

		</div>
	)
}
}

function mapStateToProps ({recipes}){
	return {recipes}
}

export default connect(mapStateToProps)(Recipes)