import React, {Component} from 'react'
import { connect } from 'react-redux'

class NewUser extends Component {

render(){
	
	return (
		<div className="new-user-wrap">
			Create new user
		</div>
	)
}
}


function mapStateToProps({firebase}){
	return{firebase}
}

function mapDispatchToProps(dispatch){
	return{dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);