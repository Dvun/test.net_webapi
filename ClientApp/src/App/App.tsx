import React from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../components/NavBar/NavBar';
import {observer} from 'mobx-react-lite';
import {Route, Switch, useLocation} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ActivityForm from '../components/Activities/Form/ActivityForm';
import ActivityDashboard from '../components/Activities/Dashboard/ActivityDashboard';
import ActivityDetails from '../components/Activities/Details/ActivityDetails';

const App: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <Route exact path="/" component={HomePage}/>
      <Route
        path={`/(.+)`}
        render={() => (
          <>
            <NavBar/>
            <Container style={{marginTop: '7em'}}>
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard}/>
                <Route exact path="/activities/:id" component={ActivityDetails}/>
                <Route exact key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}/>
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  )
}

export default observer(App);
