import { useContext, useEffect, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './ProfileHeader.module.scss'
import { useStreamContext } from 'react-activity-feed'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '../Icons/ArrowLeft'
import { ProfileContext } from './ProfileContent'

const cx = classNames.bind(styles)

function ProfileHeader() {
  const navigate = useNavigate()
  const { user } = useContext(ProfileContext)
  const { client } = useStreamContext()
  const [activityCount, setActivityCount] = useState(0)
  const navigateBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const userFeed = client.feed('user', user.id)

    async function getActivityCount() {
      const activities = await userFeed.get()

      setActivityCount(activities.results.length)
    }

    getActivityCount()
  }, [client, user])

  return (
    <header>
      <div className={cx('top')}>
        <div className={cx('back')}>
          <button className={cx('back-btn')} onClick={navigateBack} title="Back">
            <ArrowLeft width={20} height={20} />
          </button>
        </div>
        <div className={cx('info')}>
          <h1>{user.data.name}</h1>
          <span className={cx('tweet-count')}>{activityCount} Tweets</span>
        </div>
      </div>
      <div className={cx('cover')}>
        <img src="https://picsum.photos/500/300" alt="" />
      </div>
    </header>
  )
}

export default ProfileHeader
