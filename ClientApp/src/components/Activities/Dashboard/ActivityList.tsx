import React, {Fragment} from 'react';
import {Header} from 'semantic-ui-react';
import ActivityItem from './ActivityItem';
import {useStore} from '../../../stores/store';

const ActivityList: React.FC = () => {
  const {activityStore} = useStore()
  const {groupedActivities} = activityStore

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {activities.map(activity => (
            <ActivityItem key={activity.id} activity={activity}/>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default ActivityList;