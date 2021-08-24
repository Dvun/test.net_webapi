import React from 'react';
import './navBar.scss'
import {Button, Container, Menu, MenuItem} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';


const NavBar: React.FC = () => {

  return (
    <Menu inverted fixed="top">
      <Container>

        <MenuItem as={NavLink} to="/" header exact>
          <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
          Reactivities
        </MenuItem>

        <MenuItem name="Activities" as={NavLink} to="/activities"/>

        <MenuItem as={NavLink} to="/createActivity">
          <Button positive content="Create Activity"/>
        </MenuItem>

      </Container>
    </Menu>
  );
};

export default NavBar;