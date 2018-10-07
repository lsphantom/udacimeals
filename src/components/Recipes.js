import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Recipes extends Component {

trim (str) {
return str.length > 36
	? str.slice(0, 36) + '...'
	: str
}

render (){
	const {myRecipes} = this.props.recipes;
	
	return (
		<div id="recipes">
			<h4>My Recipes</h4>
			<hr />


			<Link to="/recipes/new/" className="btn btn-primary btn-add-recipe">+ Add a recipe</Link>


			{myRecipes.length > 0 
				? null
				: <p className="i-note">- You have not created any recipes yet -</p>
			}
			
			<div className="my-recipes-list">
			{myRecipes.length > 0
				? myRecipes.map((recipe, index) =>
					<Link to={`/recipes/${recipe.id}`} key={index} title={recipe.label}>
					<div className="my-recipes-item">
					<div className="my-recipes-item-thumb">
						<div className="img-thumb" style={{backgroundImage: `url(${recipe.image})`}}></div>
						{/*<img className="img-fluid" src={recipe.image} alt={recipe.label} />*/}
					</div>
					<p className={`my-recipes-item-label ${recipe.source ? 'ed-rec' : 'my-rec'}`}>{this.trim(recipe.label)}</p>
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