import { observer } from 'mobx-react-lite';
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';
import {Link, useHistory, useParams} from 'react-router-dom';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import {v4 as uuid} from 'uuid';

const ActivityForm: React.FC = () => {
  const history = useHistory()
  const {activityStore} = useStore()
  const {createActivity, updateActivity, loading, loadingInitial, loadActivity} = activityStore
  const {id} = useParams<{id: string}>()
  const [activity, setActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  })
  
  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!))
  }, [id, loadActivity])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      }
      createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
    } else {
      updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setActivity({...activity, [name]: value})
  }
  
  if (loadingInitial) return <LoadingComponent content='Loading activity...'/>

  return (
    <Segment clearing>
      <Form onSubmit={onSubmit}>
        <Form.Input
          name="title"
          placeholder="Title"
          value={activity.title}
          onChange={handleChange}
        />
        <Form.TextArea
          name="description"
          placeholder="Description"
          value={activity.description}
          onChange={handleChange}
        />
        <Form.Input
          name="category"
          placeholder="Category"
          value={activity.category}
          onChange={handleChange}
        />
        <Form.Input
          name="date"
          placeholder="Date"
          type="date"
          value={activity.date}
          onChange={handleChange}
        />
        <Form.Input
          name="city"
          placeholder="City"
          value={activity.city}
          onChange={handleChange}
        />
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={activity.venue}
          onChange={handleChange}
        />
        <Button loading={loading} floated="right" positive type="submit" content="Submit"/>
        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel"/>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);