import React from 'react';
import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';

const ActivityDetails: React.FC = () => {
  const {activityStore} = useStore()
  const {openForm, cancelSelectedActivity, selectedActivity: activity} = activityStore

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity?.category}.jpg`}/>
      <CardContent>
        <CardHeader>{activity?.title}</CardHeader>
        <CardMeta>
          <span>{activity?.date}</span>
        </CardMeta>
        <CardDescription>{activity?.description}</CardDescription>
      </CardContent>
      <CardContent extra>
        <ButtonGroup widths={2}>
          <Button basic color='blue' content='Edit' onClick={() => openForm(activity?.id!)}/>
          <Button basic color='grey' content='Cancel' onClick={() => cancelSelectedActivity()}/>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default ActivityDetails;