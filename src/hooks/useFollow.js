import { useStreamContext } from 'react-activity-feed'
import { useState, useEffect } from 'react'

export default function useFollow(userId) {
  const { client } = useStreamContext()

  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    async function init() {
      const res = await client.feed('timeline', client.userId).following({ filter: [`user:${userId}`] })

      setIsFollowing(!!res.results.length)
    }

    init()
  }, [userId])

  const toggleFollow = async () => {
    const action = isFollowing ? 'unfollow' : 'follow'
    const timelineFeed = client.feed('timeline', client.userId)
    await timelineFeed[action]('user', userId)

    setIsFollowing((isFollowing) => !isFollowing)
  }

  return { isFollowing, toggleFollow }
}
