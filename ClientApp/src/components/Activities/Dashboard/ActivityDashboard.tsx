import React from 'react';
import {Grid, GridColumn} from 'semantic-ui-react';
import {IActivity} from '../../../interfaces/interfaces';
import ActivityList from './ActivityList';
import ActivityDetails from '../Details/ActivityDetails';
import ActivityForm from '../Form/ActivityForm';
import { observer } from 'mobx-react-lite';

interface IActivityDashboardProps {
  activities: IActivity[]
  selectedActivity: IActivity | undefined
  editMode: boolean
}

const ActivityDashboard: React.FC<IActivityDashboardProps> = ({activities, selectedActivity, editMode}) => {

  return (
    <Grid>
      <GridColumn widescreen={10} computer={10} tablet={10} mobile={16}>
        <ActivityList activities={activities}/>
      </GridColumn>
      <GridColumn widescreen={6} computer={6} tablet={6} mobile={16}>
        {selectedActivity && !editMode && <ActivityDetails/>}
        {editMode && <ActivityForm/>}
      </GridColumn>
    </Grid>
  );
};

export default observer(ActivityDashboard);