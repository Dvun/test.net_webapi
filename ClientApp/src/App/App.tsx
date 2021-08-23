import React, {useEffect} from 'react';
import {Container} from 'semantic-ui-react';
import NavBar from '../components/NavBar/NavBar';
import ActivityDashboard from '../components/Activities/Dashboard/ActivityDashboard';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import {useStore} from '../stores/store';
import {observer} from 'mobx-react-lite';

const App: React.FC = () => {
  const {activityStore} = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard
          activities={activityStore.activitiesByDate}
          selectedActivity={activityStore.selectedActivity}
          editMode={activityStore.editMode}
        />
      </Container>
    </>
  )
}

export default observer(App);
