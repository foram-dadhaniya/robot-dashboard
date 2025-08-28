import React from 'react'
import { BrandIcon } from '../components/BrandIcon'
import { HeaderMenu } from './Header.styles'
import { Nav, NavItem } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const navClass = ({isActive}) => (isActive ? 'nav-link active' : 'nav-link');
  return (
    <HeaderMenu>
        <BrandIcon/>
        <Nav className="justify-content-end">
        <NavItem>
          <NavLink className={navClass} to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={navClass} to="/robot">Robot List</NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={navClass} to="/report">Report</NavLink>
        </NavItem>
      </Nav>
    </HeaderMenu>
  )
}
