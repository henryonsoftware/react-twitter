import { useFeedContext, useStreamContext } from 'react-activity-feed'
import useNotification from './useNotification'

export default function useLike() {
  const feed = useFeedContext()
  const { user } = useStreamContext()

  const { createNotification } = useNotification()

  const toggleLike = async (activity, hasLikedTweet) => {
    await feed.onToggleReaction('like', activity)

    const activityActor = activity.actor

    if (!hasLikedTweet && activityActor.id !== user.id) {
      // then it is not the logged in user liking their own tweet
      createNotification(activityActor.id, 'like', {}, `SO:tweet:${activity.object.id}`)
    }
  }

  return { toggleLike }
}
