import { useFeedContext, useStreamContext } from 'react-activity-feed'
import useNotification from './useNotification'

export default function useComment() {
  const feed = useFeedContext()
  const { createNotification } = useNotification()
  const { user } = useStreamContext()

  const createComment = async (text, activity) => {
    await feed.onAddReaction('comment', activity, { text })

    const activityActor = activity.actor

    if (activityActor.id !== user.id) {
      createNotification(activityActor.id, 'comment', { text }, `SO:tweet:${activity.object.id}`)
    }
  }

  return { createComment }
}
