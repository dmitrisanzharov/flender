import React from 'react'
import './navBar.css'
import { Link } from 'react-router-dom';

// components
import FlenderLogo from '../FlenderLogo/FlenderLogo'

function NavBar() {
    return (
        <div className='navBarContainer'>
            <FlenderLogo />


            <div className='navBarContainer_items'>
                <span className='navBarContainer_items_singleItem'>Invest</span><span className='navBarContainer_items_singleItem'>Business Loan</span><span className='navBarContainer_items_singleItem'>Marketplace</span><span className='navBarContainer_items_singleItem'>About</span><span className='navBarContainer_items_singleItem'>Contact</span>
            </div>


            <div className='navBarContainer_registerButtonContainer'>
                <button type="button" className="btn btn-secondary me-3">
                    Log in
                </button>
                <button type="button" className="btn btn-primary">
                    <Link to='/register' className='registerButtonLink'>Register</Link>
                </button>
            </div>

        </div>
    )
}

export default NavBar