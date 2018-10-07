import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class SecondaryNav extends Component {

render (){
	const {title, routeBack} = this.props;

	return (
		<nav id="secondaryNav" className="navbar navbar-expand-lg">
			<div className="container-fluid">
				<div className="left-nav-links">
					<Link to={routeBack} className="close-create-recipe" />
				</div>
				<div className="app-brandname">
					<h4>{title}</h4>
				</div>
			</div>
		</nav>
	)
}
}

export default SecondaryNav;