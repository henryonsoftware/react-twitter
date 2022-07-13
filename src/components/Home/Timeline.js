import { FlatFeed, useStreamContext } from 'react-activity-feed'
import TweetBlock from '../Tweet/TweetBlock'

function Timeline() {
  const { user } = useStreamContext()

  return (
    <div>
      <FlatFeed Activity={TweetBlock} userId={user.id} feedGroup="user" />
    </div>
  )
}

export default Timeline
