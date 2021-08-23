import React from 'react';
import {IActivity} from '../../../interfaces/interfaces';
import {ItemGroup, Segment} from 'semantic-ui-react';
import ActivityItem from './ActivityItem';

interface IActivityListProps {
  activities: IActivity[]
}

const ActivityList: React.FC<IActivityListProps> = ({activities}) => {

  return (
    <Segment>
      <ItemGroup divided>
        {activities.map(activity => (
          <ActivityItem key={activity.id} activity={activity}/>
        ))}
      </ItemGroup>
    </Segment>
  );
};

export default ActivityList;