import { useStreamContext } from 'react-activity-feed'

function useNotification() {
  const { client } = useStreamContext()

  const createNotification = async (userId, verb, data, reference = {}) => {
    const userNotificationFeed = client.feed('notification', userId)

    const newActivity = {
      verb,
      object: reference,
      ...data,
    }

    await userNotificationFeed.addActivity(newActivity)
  }

  return { createNotification }
}

export default useNotification
