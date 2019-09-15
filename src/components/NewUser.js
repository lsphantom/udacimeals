import React, {Component} from 'react'
import { connect } from 'react-redux'

class NewUser extends Component {

state = {
	nuem: '',
	nufn: '',
	nuln: '',
	nupw: ''
}

handleChange(e) {
	this.setState({
		[e.target.id]: e.target.value
	})
}

render(){
	
	return (
		<div className="new-user-wrap">
			<div id="new-user-container" className="container">
				<h1>Create an account</h1>
				<p>Already have an account? <a href="">Sign in</a></p>
				<div className="">
				<form>
					<label htmlFor="nuem">Email address</label>
					<input id="nuem" type="email" className="form-control" onChange={(e) => this.handleChange(e)}></input>

					<label htmlFor="nufn">First name</label>
					<input id="nufn" type="text" className="form-control" onChange={(e) => this.handleChange(e)}></input>

					<label htmlFor="nuln">Last name</label>
					<input id="nuln" type="text" className="form-control" onChange={(e) => this.handleChange(e)}></input>

					<label htmlFor="nupw">Password</label>
					<input id="nupw" type="password" className="form-control" onChange={(e) => this.handleChange(e)}></input>

					<hr/>
					<div className="fineprint">
						<p>By clicking Create account, I agree that:</p>
						<p>I have read and accepted the Terms of Use.<br/>
						See our Privacy Policy for more details on usage of our progressive web apps.</p>
					</div>
					
				</form>
				</div>
			</div>
			
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