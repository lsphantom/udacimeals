import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Recipes extends Component {
render (){
	return (
		<div id="recipes">
			<h4>My Recipes</h4>
			<hr />
			<p>You haven't created any recipes.</p>
			
			<div className="add-recipe">
				<Link to="/recipes/new/" />
			</div>

		</div>
	)
}
}

export default Recipes