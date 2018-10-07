import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Footer extends Component {

render (){
	const copyYear = new Date().getFullYear();

	return (
		<div id="footer">
			<div className="container">
				<div className="help-text"><Link to="/help">Help?</Link></div>
				<div className="copyright-text">© <a href="http://www.limestripes.com"><em>Lime Stripes</em></a> Creative Studio <span id="ls-copyright-year">{copyYear}</span>.</div>
			</div>
		</div>
	)
}
}

export default Footer;