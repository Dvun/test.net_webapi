import React, {useEffect} from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';
import {useParams} from 'react-router-dom';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import {observer} from 'mobx-react-lite';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

const ActivityDetails: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const {activityStore} = useStore()
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
  
  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])
  
  if (loadingInitial || !activity) return <LoadingComponent/>

  return (
    <Grid>
      <GridColumn width={10}>
        <ActivityDetailedHeader activity={activity}/>
        <ActivityDetailedInfo activity={activity}/>
        <ActivityDetailedChat />
      </GridColumn>
      <GridColumn width={6}>
        <ActivityDetailedSidebar />
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDetails);