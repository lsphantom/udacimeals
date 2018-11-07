import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'


class AuthSidebar extends Component {

state = {
    email: '',
    password: ''
}

handleUserInput = (e) => {
    this.setState({
        [e.target.id]: e.target.value
    });
}

submitCredentials = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
    this.setState({
        email: '',
        password: ''
    });
}

signOut = (e) => {
    e.preventDefault();
    this.props.signOut(); 
}

render(){
    const {sidebarToggle, closeUserModal} = this.props
    const {authError} = this.props.auth
    const userEmpty = this.props.firebase.auth.isEmpty
	let sidebarClassActive = sidebarToggle ? 'active' : ''

	return (
		<div className="auth-sidebar-wrap">
        { userEmpty ?
        <div className="no-user">
        <a id="signin-overlay" className={sidebarClassActive} href="" onClick={(e)=>closeUserModal(e)}><i className="displace">close</i></a>
        <div id="signin-sidebar" className={sidebarClassActive}>
            <a id="signin-close" href="" onClick={(e)=>closeUserModal(e)}>x</a>
            <form id="signin-form" action="">
              <h3>Sign In</h3>
              <label>Username</label>
              <input id="email" type="text" placeholder="Email" className="form-control entrybox" onChange={(e)=>this.handleUserInput(e)}></input>

              <label>Password</label>
              <input id="password" type="password" placeholder="Password" className="form-control entrybox" onChange={(e)=>this.handleUserInput(e)}></input>

              <input type="submit" value="Sign In" className="btn btn-primary btn-block" onClick={(e)=>this.submitCredentials(e)} />
              
              <p id="register-text">
                { authError ? <span className="danger-txt">{authError}<br/></span> : null }
                Not a registered user? <a href="mailto:info@limestripes.com?Subject=Account%20request:%20Bare%20necessities">Request an account</a>
              </p>
              
            </form>
        </div>
        </div>
        
        :

        <div className="user-signed-in">
        <a id="signin-overlay" className={sidebarClassActive} href="" onClick={(e)=>closeUserModal(e)}><i className="displace">close</i></a>
        <div id="signin-sidebar" className={sidebarClassActive}>
            <a id="signin-close" href="" onClick={(e)=>closeUserModal(e)}>x</a>
            <a href="" onClick={(e) => this.signOut(e)}>TEST SIGN OUT!</a>
        </div>
        </div>
        }
        
		


		</div>
	)	
}
}


function mapStateToProps({auth, firebase}){
	return{ auth, firebase }
}

function mapDispatchToProps(dispatch){
	return{
        signIn: (creds) => dispatch(signIn(creds)),
        signOut: () => dispatch(signOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSidebar);