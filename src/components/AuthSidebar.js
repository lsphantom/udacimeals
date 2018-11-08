import React, {Component} from 'react'
import { connect } from 'react-redux'
import { signIn, signOut, loadRecipes } from '../actions'
import SignOutIcon from 'react-icons/lib/fa/sign-out'
//import { Link } from 'react-router-dom'


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

loadMyRecipes = (e) => {
    e.preventDefault();
    const firestoreRecipes = this.props.firestore.ordered.recipes;
    this.props.loadRecipes(firestoreRecipes);
}

render(){
    const {sidebarToggle, closeUserModal} = this.props
    const {authError} = this.props.auth
    const {displayName, email} = this.props.firebase.auth
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
                <br/>
                {/*<Link to="/signup">[DEV]: Create new user</Link>*/}
              </p>
              
            </form>
        </div>
        </div>
        
        :

        <div className="user-signed-in">
        <a id="signin-overlay" className={sidebarClassActive} href="" onClick={(e)=>closeUserModal(e)}><i className="displace">close</i></a>
        <div id="signin-sidebar" className={sidebarClassActive}>
            <a id="signin-close" href="" onClick={(e)=>closeUserModal(e)}>x</a>

            <h3>{ displayName ? displayName : email }</h3>
            
            <br/>
            <br/>
            <div className="download-button">
                <a href="" onClick={(e) => this.loadMyRecipes(e)}>Load my recipes</a>
            </div>

            <div className="logout-button">
                <a href="" onClick={(e) => this.signOut(e)}><SignOutIcon size={18} /> Logout</a>
            </div>
        </div>
        </div>
        }
        
		


		</div>
	)	
}
}


function mapStateToProps({auth, firebase, firestore}){
	return{ auth, firebase, firestore }
}

function mapDispatchToProps(dispatch){
	return{
        signIn: (creds) => dispatch(signIn(creds)),
        signOut: () => dispatch(signOut()),
        loadRecipes: (recipes) => dispatch(loadRecipes(recipes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSidebar);