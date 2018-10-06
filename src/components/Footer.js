import React, {Component} from 'react'


class Footer extends Component {

render (){
	const copyYear = new Date().getFullYear();

	return (
		<div id="footer">
			<div className="container copyright-text">
				© <a href="http://www.limestripes.com"><em>Lime Stripes</em></a> Creative Studio <span id="ls-copyright-year">{copyYear}</span>.
			</div>
		</div>
	)
}
}

export default Footer;