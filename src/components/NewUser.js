import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions';

class NewUser extends Component {

state = {
	nuem: '',
	nufn: '',
	nuln: '',
	nupw: '',
}

handleChange(e) {
	this.setState({
		[e.target.id]: e.target.value
	})
}

createNewAccount(e) {
	e.preventDefault();
	this.props.createNewUser({
		email: this.state.nuem,
		password: this.state.nupw,
		firstName: this.state.nufn,
		lastName: this.state.nuln
	});
}

render(){
	const {authError} = this.props.auth;
	
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
					<br/>
					<input id="new-user-submit" className="btn btn-primary" type="submit" value="Create account" onClick={(e) => this.createNewAccount(e)}></input>
					<br/>
					<p className="danger-text">
						{ authError ? <span className="danger-txt">{authError}<br/></span> : null }
					</p>
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


function mapStateToProps({auth, firebase}){
	return{auth, firebase}
}

function mapDispatchToProps(dispatch){
	return{
		createNewUser: (data) => dispatch(signUp(data)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);