import { useFeedContext, useStreamContext } from 'react-activity-feed'
import useNotification from './useNotification'

export default function useComment() {
  const feed = useFeedContext()
  const { createNotification } = useNotification()
  const { user } = useStreamContext()

  const createComment = async (text, tweet) => {
    await feed.onAddReaction('comment', tweet, { text })

    if (tweet.actor.id !== user.id) {
      createNotification(tweet.actor.id, 'comment', { text }, `SO:tweet:${tweet.object.id}`)
    }
  }

  return { createComment }
}
