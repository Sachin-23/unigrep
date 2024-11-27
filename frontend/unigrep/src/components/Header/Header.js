import React from 'react';
import './Header.css'; // Assuming we're keeping the styles in a CSS file
                       //

import Logo from "./logo_short_export.png";
//import SVG from './SVG'
function Header() {
  return (
    <div>
      <div className="header-title">
      <img src={Logo} width={300} alt="Unigrep Logo"/>
      </div>
      {/* <div className="tabbar">
        <div className="tab" style={{ backgroundColor: '#444444' }}>Filter</div>
        <div className="tab">Apply</div>
        <div className="spacer"></div>
        <div className="tab">Settings</div>
      </div> */}
    </div>
  );
}

export default Header;
