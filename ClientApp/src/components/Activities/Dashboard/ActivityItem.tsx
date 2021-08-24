import React from 'react';
import {IActivity} from '../../../interfaces/interfaces';
import {
  Button,
  Icon,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemImage,
  Segment,
  SegmentGroup,
} from 'semantic-ui-react';
import {observer} from 'mobx-react-lite';
import {Link} from 'react-router-dom';

interface IActivityItemProps {
  activity: IActivity
}

const ActivityItem: React.FC<IActivityItemProps> = ({activity}) => {

  return (
    <SegmentGroup>
      <Segment>
        <ItemGroup>
          <Item>
            <ItemImage size='tiny' circular src='/assets/user.png'/>
            <ItemContent>
              <ItemHeader as={Link} to={`/activities/${activity.id}`}>{activity.title}</ItemHeader>
            </ItemContent>
            <ItemDescription>Hosted By Roman</ItemDescription>
          </Item>
        </ItemGroup>
      </Segment>
      <Segment>
        <span>
          <Icon name='clock'/> {activity.date}
          <Icon name='marker'/> {activity.venue}
        </span>
      </Segment>
      <Segment secondary>
        Attendees go here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button 
          as={Link} 
          to={`/activities/${activity.id}`}
          color='teal'
          floated='right'
          content='View'
        />
      </Segment>
    </SegmentGroup>
  );
};

export default observer(ActivityItem);