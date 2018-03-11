import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Printer from 'react-icons/lib/fa/print'
import EditIcon from 'react-icons/lib/fa/edit'
import ListIcon from 'react-icons/lib/fa/list-alt'


class Header extends Component {
render (){
	const {page, print, printAllow, openIngredientsModal, printToggle} = this.props;
	let currentPage = (page === 0 ? "Weekly Meals" : "My Kitchen");
	let oppositePage = (page !== 0 ? "Weekly Meals" : "My Kitchen");
	let linkTo = (page === 0 ? "/kitchen" : "/");

	return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
          <div className="container-fluid">
            <div className="left-nav-links">
              <Link to={linkTo}>{oppositePage}</Link>
            </div>
            <div className="app-brandname">
              <Link to="/">{currentPage}</Link>
            </div>
            <div className={`right-nav-links ${printAllow ? '' : 'hidden'}`}>
              <a href="" onClick={openIngredientsModal} title="Shopping List"><ListIcon size={18}/></a>
              <a href="" onClick={printToggle} title="Print / Edit">
                { print
                  ? <EditIcon size={18}/>
                  : <Printer size={18}/>
                }
              </a>
            </div>
          </div>
        </nav>
	)
}
}

export default Header;