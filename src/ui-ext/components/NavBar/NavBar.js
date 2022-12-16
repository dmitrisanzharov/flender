import React from 'react'
import './navBar.css'

// components
import FlenderLogo from '../FlenderLogo/FlenderLogo'

function NavBar() {
    return (
        <div className='navBarContainer'>
            <FlenderLogo />


            <div className='options'>
                <span>Invest</span><span>Business Loan</span><span>Marketplace</span><span>About</span><span>Contact</span>
            </div>


            <div>

            </div>

        </div>
    )
}

export default NavBar