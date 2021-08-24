import React from 'react';
import {ItemGroup, Segment} from 'semantic-ui-react';
import ActivityItem from './ActivityItem';
import {useStore} from '../../../stores/store';

const ActivityList: React.FC = () => {
  const {activityStore} = useStore()

  return (
    <Segment>
      <ItemGroup divided>
        {activityStore.activitiesByDate.map(activity => (
          <ActivityItem key={activity.id} activity={activity}/>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default ActivityList;