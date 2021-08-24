import React, {useEffect} from 'react';
import {Button, ButtonGroup, Card, CardContent, CardDescription, CardHeader, CardMeta, Image} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';
import {Link, useParams} from 'react-router-dom';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import { observer } from 'mobx-react-lite';

const ActivityDetails: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const {activityStore} = useStore()
  const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
  
  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])
  
  if (loadingInitial || !activity) return <LoadingComponent/>

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
          <Button as={Link} to={`/manage/${activity.id}`} basic color='blue' content='Edit'/>
          <Button as={Link} to='/activities' basic color='grey' content='Cancel'/>
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};

export default observer(ActivityDetails);