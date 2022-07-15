import classNames from 'classnames/bind'
import { createContext, useState, useEffect } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { useParams } from 'react-router-dom'
import styles from './ProfileContent.module.scss'
import LoadingIndicator from '../LoadingIndicator'
import ProfileHeader from './ProfileHeader'
import ProfileBio from './ProfileBio'
import TabList from './TabList'
import ProfileTweets from './ProfileTweets'

const cx = classNames.bind(styles)

export const ProfileContext = createContext()

function ProfileContent() {
  const { client } = useStreamContext()

  const [user, setUser] = useState(null)

  const { user_id } = useParams()

  useEffect(() => {
    const getUser = async () => {
      const user = await client.user(user_id).get({ with_followers_count: true })

      setUser(user.full)
    }

    getUser()
  }, [user_id])

  if (!client || !user) return <LoadingIndicator />

  return (
    <ProfileContext.Provider value={{ user }}>
      <div className={cx('wrapper')}>
        <ProfileHeader />
        <main>
          <ProfileBio />
          <div className={cx('tab-list')}>
            <TabList />
          </div>
          <ProfileTweets />
        </main>
      </div>
    </ProfileContext.Provider>
  )
}

export default ProfileContent
