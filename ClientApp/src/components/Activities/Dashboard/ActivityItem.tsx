import React, {SyntheticEvent, useState} from 'react';
import {IActivity} from '../../../interfaces/interfaces';
import {Button, Item, ItemContent, ItemDescription, ItemExtra, ItemHeader, ItemMeta, Label} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';

interface IActivityItemProps {
  activity: IActivity
}

const ActivityItem: React.FC<IActivityItemProps> = ({activity}) => {
  const {activityStore} = useStore()
  const [target, setTarget] = useState('')

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name)
    activityStore.deleteActivity(activity.id)
  }

  return (
    <Item>
      <ItemContent>
        <ItemHeader as="a">{activity.title}</ItemHeader>
        <ItemMeta>{activity.date}</ItemMeta>
        <ItemDescription>
          <div>{activity.description}</div>
          <div>{activity.city}, {activity.venue}</div>
        </ItemDescription>
        <ItemExtra>
          <Button floated="right" content="View" color="blue" as={Link} to={`/activities/${activity.id}`}/>
          <Button
            name={activity.id}
            loading={activityStore.loading && target === activity.id}
            floated="right"
            content="Delete"
            color="red"
            onClick={(e) => handleActivityDelete(e, activity.id)}
          />
          <Label basic content={activity.category}/>
        </ItemExtra>
      </ItemContent>
    </Item>
  );
};

export default observer(ActivityItem);