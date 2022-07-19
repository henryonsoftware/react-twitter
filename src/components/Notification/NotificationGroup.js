import { useEffect, useRef } from 'react'
import { useFeedContext, useStreamContext } from 'react-activity-feed'
import CommentNotification from './CommentNotification'
import FollowNotification from './FollowNotification'
import LikeNotification from './LikeNotification'

function NotificationGroup({ activityGroup }) {
  const feed = useFeedContext()
  const notificationContainerRef = useRef()
  const { user, client } = useStreamContext()
  const activities = activityGroup.activities

  useEffect(() => {
    if (!notificationContainerRef.current) return

    const anchorTags = notificationContainerRef.current.querySelectorAll('a')

    anchorTags.forEach((element) => {
      element.addEventListener('click', (e) => e.stopPropagation())
    })

    return () =>
      anchorTags.forEach((element) => {
        element.addEventListener('click', (e) => e.stopPropagation())
      })
  }, [])

  useEffect(() => {
    const notifyFeed = client.feed('notification', user.id)

    notifyFeed.subscribe((data) => {
      if (data.new.length) {
        feed.refresh()
      }
    })

    return () => notifyFeed.unsubscribe()
  }, [])

  return (
    <div ref={notificationContainerRef}>
      {activityGroup.verb === 'like' && <LikeNotification likedActivities={activities} />}
      {activityGroup.verb === 'comment' && <CommentNotification commentActivities={activities} />}
      {activityGroup.verb === 'follow' && <FollowNotification followActivities={activities} />}
    </div>
  )
}

export default NotificationGroup
