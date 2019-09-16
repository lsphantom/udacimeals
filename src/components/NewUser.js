import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signUp } from '../actions';
import ClipLoader from 'react-spinners/ClipLoader';

class NewUser extends Component {

state = {
	nuem: '',
	nufn: '',
	nuln: '',
	nupw: '',
	ruem: '',
	rupw: '',
	container: 'signup',
	loading: true
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

toggleContainer (e, type) {
	e.preventDefault();
	this.setState({container: type});
}

componentDidMount () {
	this.setState({loading: false});
}

render(){
	const {authError} = this.props.auth;
	const {container} = this.state;
	
	return (
		<div className="new-user-wrap">
			<div id="new-user-container" className="container">
			{ container === 'signup'
				?
				<div>
				<h1>Create an account</h1>
				<p>Already have an account? <a href="" onClick={(e) => this.toggleContainer(e, 'signin')}>Sign in</a></p>
				<form id="signup-form">
					<label htmlFor="nuem">Email address</label>
					<input id="nuem" type="email" className="form-control" onChange={(e) => this.handleChange(e)}></input>

					<div className="row">
					<div className="col-sm-6">
						<label htmlFor="nufn">First name</label>
						<input id="nufn" type="text" className="form-control" onChange={(e) => this.handleChange(e)}></input>
					</div>
					<div className="col-sm-6">
						<label htmlFor="nuln">Last name</label>
						<input id="nuln" type="text" className="form-control" onChange={(e) => this.handleChange(e)}></input>
					</div>
					</div>

					<label htmlFor="nupw">Password</label>
					<input id="nupw" type="password" className="form-control" onChange={(e) => this.handleChange(e)}></input>
					<br/>
					<input id="new-user-submit" className="btn btn-primary" type="submit" value="Create account" onClick={(e) => this.createNewAccount(e)}></input> 
					<span className='create-loading'>
						<ClipLoader
						sizeUnit={"px"}
						size={22}
						color={'#007bff'}
						loading={this.state.loading}
						/>
					</span> 
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

				: 

				<div>
					<h1>Sign In</h1>
					<p>Not a registered user? <a href="" onClick={(e) => this.toggleContainer(e, 'signup')}>Create an account</a></p>
					<form id="signin-form" action="">
					<label>Username</label>
					<input id="ruem" type="text" placeholder="Email" className="form-control entrybox" onChange={(e)=>this.handleChange(e)}></input>

					<label>Password</label>
					<input id="rupw" type="password" placeholder="Password" className="form-control entrybox" onChange={(e)=>this.handleChange(e)}></input>

					<input type="submit" value="Continue" className="btn btn-primary" onClick={(e)=>this.submitCredentials(e)} />
					
					<p id="register-text">
						{ authError ? <span className="danger-txt">{authError}<br/></span> : null }
					</p>
					
					</form>
				</div>
			}
				
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