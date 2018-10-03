import React, {Component} from 'react'
//import { connect } from 'react-redux'
import Header from './Header'
//import Pantry from './Pantry'
import Recipes from './Recipes'


class MyKitchen extends Component {
render(){
	return (
		<div id="my-kitchen">
			<Header page="1" printAllow={false} />

			<div id="kitchen-container" className="container-fluid">
				<div id="recipes-wrap">
					<Recipes />
				</div>
			</div>
		</div>
	)
}
}


export default MyKitchen;