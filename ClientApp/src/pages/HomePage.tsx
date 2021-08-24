import React from 'react';
import { Link } from 'react-router-dom';
import {Container} from 'semantic-ui-react';
import './homePage.scss'

const HomePage: React.FC = () => {

  return (
    <Container className='homePage'>
      <h1 className='title'>Home page</h1>
      <h3>Go to <Link to='/activities'>Activities</Link></h3>
    </Container>
  );
};

export default HomePage;