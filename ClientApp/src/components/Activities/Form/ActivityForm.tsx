import { observer } from 'mobx-react-lite';
import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button, Form, Segment} from 'semantic-ui-react';
import {useStore} from '../../../stores/store';

const ActivityForm: React.FC = () => {
  const {activityStore} = useStore()
  const [activity, setActivity] = useState(activityStore.selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    activity.id ? activityStore.updateActivity(activity) : activityStore.createActivity(activity)
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target
    setActivity({...activity, [name]: value})
  }

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
        <Button loading={activityStore.loading} floated="right" positive type="submit" content="Submit"/>
        <Button floated="right" type="button" content="Cancel" onClick={() => activityStore.closeForm()}/>
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);