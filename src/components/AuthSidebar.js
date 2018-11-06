import React, {Component} from 'react'
import { connect } from 'react-redux'


class AuthSidebar extends Component {


render(){
	const {sidebarToggle, closeUserModal} = this.props
	let sidebarClassActive = sidebarToggle ? 'active' : ''

	return (
		<div className="auth-sidebar-wrap">
		<a id="signin-overlay" className={sidebarClassActive} href="" onClick={(e)=>closeUserModal(e)}><i className="displace">close</i></a>
        <div id="signin-sidebar" className={sidebarClassActive}>
            <a id="signin-close" href="" onClick={(e)=>closeUserModal(e)}>x</a>
            <form id="signin-form" action="">
              <h3>Sign In</h3>
              <label>Username</label>
              <input type="text" placeholder="Email" className="form-control entrybox"></input>

              <label>Password</label>
              <input type="password" placeholder="Password" className="form-control entrybox"></input>

              <input type="submit" value="Sign In" className="btn btn-primary btn-block" onClick={(e)=>this.closeUserModal(e)} />
              <p id="register-text">Not a registered user? <a href="mailto:info@limestripes.com?Subject=Account%20request:%20Bare%20necessities">Request an account</a></p>
            </form>
        </div>
		</div>
	)	
}
}


function mapStateToProps({auth, firebase}){
	return{ auth, firebase }
}

function mapDispatchToProps(dispatch){
	return{dispatch}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthSidebar);