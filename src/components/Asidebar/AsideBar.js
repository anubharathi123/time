import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AsideBar.css';

const AsideBar = () => {
  // State to track which dropdown is open (both main and inner dropdowns)
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Toggle function for both main and inner dropdowns
  const toggleDropdown = (dropdownName, isInner = false) => {
    setOpenDropdowns(prevState => {
      const newState = { ...prevState };
      if (isInner) {
        newState[dropdownName] = !prevState[dropdownName];
      } else {
        // Close inner dropdown when main dropdown is toggled
        newState[dropdownName] = !prevState[dropdownName];
        // Close all inner dropdowns when the main dropdown is closed
        Object.keys(prevState).forEach(key => {
          if (key !== dropdownName) newState[key] = false;
        });
      }
      return newState;
    });
  };

  // Render dropdown icon based on whether it's open or not
  const renderDropdownIcon = (dropdownName) => {
    return openDropdowns[dropdownName] ? (
      <img src={require ('./images/dropup.webp')} alt="Drop Up" style={{ width: '25px', height: '25px', filter: 'hue-rotate(90deg)' }} />
    ) : (
      <img src={require ('./images/dropdown.png')} alt="Drop Down" style={{ width: '25px', height: '25px', filter: 'hue-rotate(90deg)' }} />
    );
  };

  return (
    <aside className="aside-bar">
      <div className="logo">
        <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">
          <img
            src={require ('./images/company_logo.png')}
            alt="Company Logo"
            style={{
              width: '100px',
              marginTop: '-50px',
              marginLeft: '27px',
              height: 'auto',
              filter: 'drop-shadow(2px 1px 0 rgb(255, 255, 255)) drop-shadow(-1px -1px 0 rgb(255, 255, 255)) drop-shadow(1px 1px 1px rgb(255, 255, 255))',
            }}
          />
        </a>
      </div>
      <nav>
        <ul>
          {/* Profile Dropdown */}
          <li className={`dropdown ${openDropdowns.profile ? 'open' : ''}`}>
            <NavLink onClick={() => toggleDropdown('profile')} to="Profile" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p className='profiletab'>Profile</p>
              {renderDropdownIcon('profile')}
            </NavLink>
            {openDropdowns.profile && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink style={{ marginLeft:"13px", width:"170px" }}to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Profile Management
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Dashboard Dropdown */}
          <li className={`dropdown ${openDropdowns.dashboard ? 'open' : ''}`}>
            <NavLink onClick={() => toggleDropdown('dashboard')} to="Dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }}>Dashboard</p>
              {renderDropdownIcon('dashboard')}
            </NavLink>
            {openDropdowns.dashboard && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink  style={{ marginLeft:"18px", width:"170px", marginBottom:"-8px" }} to="/audit-log" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Audit Log
                  </NavLink>
                </li>
                <li>
                <NavLink  style={{ marginLeft:"18px", marginBottom:"10px" }} onClick={() => toggleDropdown('document', true)} to="#" className={({ isActive }) => ''}>
                 Document {renderDropdownIcon('document')}
                </NavLink>
                  {openDropdowns.document && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink style={{ marginLeft:"18px", width:"170px" }} to="/document-creation" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Document Creation 
                        </NavLink>
                      </li>
                      <li>
                        <NavLink onClick={() => toggleDropdown('DocumentList')} style={{ marginLeft:"18px", width:"170px", marginBottom:"-22px" }} to="DocumentList" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Document List 
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              
                <li className={`dropdown ${openDropdowns.announcement ? 'open' : ''}`}>
                  <NavLink style={{ marginLeft:"18px" , marginBottom:"10px" }} onClick={() => toggleDropdown('announcement', true )} to="#"className={({ isActive }) => ''}>
                    Announcement {renderDropdownIcon('announcement')}
                  </NavLink>
                  {openDropdowns.announcement && (
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink style={{ marginLeft:"18px", width:"190px" }}to="/announcement-creation" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Announcement Creation
                        </NavLink>
                      </li>
                      <li>
                        <NavLink style={{ marginLeft:"18px", width:"180px" }}to="/announcement-list" className={({ isActive }) => (isActive ? 'active' : '')}>
                          Announcement List
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Create Admin Dropdown */}
          <li className={`dropdown ${openDropdowns['create-admin'] ? 'open' : ''}`}>
            <NavLink onClick={() => toggleDropdown('create-admin')} to="create admin" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }}>Create Admin</p>
              {renderDropdownIcon('create-admin')}
            </NavLink>
            {openDropdowns['create-admin'] && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink style={{ marginLeft:"20px", width:"160px" }} to="/admin-list" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Admin List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Organization Dropdown */}
          <li className={`dropdown ${openDropdowns.CompanyCreation ? 'open' : ''}`}>
            <NavLink
              onClick={() => toggleDropdown('CompanyCreation')}
              to="CompanyCreation"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <p style={{ marginLeft: '15px' }}>Organization</p>
              {renderDropdownIcon('CompanyCreation')}
            </NavLink>
            {openDropdowns.CompanyCreation && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    style={{ marginLeft: '20px', width: '160px' }}
                    to="/organization-list"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    Organization List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Document Upload Dropdown */}
          <li className={`dropdown ${openDropdowns['UploadDocument'] ? 'open' : ''}`}>
            <NavLink onClick={() => toggleDropdown('UploadDocument')} to="UploadDocument" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }} >Document upload</p>
              {renderDropdownIcon('UploadDocument')}
            </NavLink>
            {openDropdowns['UploadDocument'] && (
              <ul className="dropdown-menu">
                <li className={`dropdown ${openDropdowns['DocumentList'] ? 'open' : ''}`}>
                  <NavLink onClick={() => toggleDropdown('DocumentList')} style={{ marginLeft:"20px", width:"160px" }} to="DocumentList" className={({ isActive }) => (isActive ? 'active' : '')}>
                    Document List
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Other Menu Items */}
          <li>
            <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }} >Settings</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/employee-creation" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }} >Create User</p>
            </NavLink>
          </li>
          <li className={`dropdown ${openDropdowns['DocumentList'] ? 'open' : ''}`}>
            <NavLink onClick={() => toggleDropdown('DocumentList')} to="DocumentList" className={({ isActive }) => (isActive ? 'active' : '')}>
              <p style={{ marginLeft:"15px" }} >Document View</p>
            </NavLink>
          </li>
          <li className={`dropdown ${openDropdowns.VerifyDoc ? 'open' : ''}`}>
          <NavLink
            onClick={() => toggleDropdown('VerifyDoc')}
            to="/VerifyDoc"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
          <p style={{ marginLeft: "15px" }}>Verify Document</p>
          {renderDropdownIcon('VerifyDoc')}
          </NavLink>
          {openDropdowns.VerifyDoc && (
            <ul className="dropdown-menu">
            <li className={`dropdown ${openDropdowns['DocumentList'] ? 'open' : ''}`}>
              <NavLink
                onClick={() => toggleDropdown('DocumentList')}
                style={{ marginLeft:"20px", width:"160px" }}
                to="DocumentList"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
            Document List
          </NavLink>
        </li>
    </ul>
  )}
</li>

        </ul>
      </nav>
    </aside>
  );
};

export default AsideBar;
