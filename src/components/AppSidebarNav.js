import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge, CListGroup } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
       
       {icon && icon}
      
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const showItemToggle = location.pathname === '/notification' ||location.pathname === '/Trash' ;
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
  
    
    const showItem = location.pathname === '/notification' || location.pathname === '/Trash' ;
     
  
    return (
      <Component
        idx={String(index)}
        key={index}
         toggler={navLink(name, icon) }
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((subItem, subIndex) => {
          if (showItem || (subItem.name !== 'Trash')) {
            return subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex);
          }
          return null; // Hide the "Trash" item
        })}
      </Component>
    );
  };
  
  
  
  

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
