import React, {useEffect} from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../../stores/store';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import ActivityFilters from './ActivityFilters';

const ActivityDashboard: React.FC = () => {
  const {activityStore} = useStore()
  const {loadActivities, activityRegistry} = activityStore

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities()
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading App"/>

  return (
    <Grid>
      <GridColumn widescreen={10} computer={10} tablet={10} mobile={16}>
        <ActivityList/>
      </GridColumn>
      <GridColumn widescreen={6} computer={6} tablet={6} mobile={16}>
        <ActivityFilters />
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);