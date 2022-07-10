import { Feed, useStreamContext } from 'react-activity-feed'
import classNames from 'classnames/bind'
import LoadingIndicator from '../LoadingIndicator'
import MainHeader from './MainHeader'
import CreateTweetTop from './CreateTweetTop'
import Timeline from './Timeline'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

function HomeContent() {
  const { client } = useStreamContext()

  const user = client.currentUser.data

  if (!user) {
    return (
      <div>
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div>
      <div className={cx('header')}>
        <MainHeader />
      </div>
      <Feed feedGroup="user">
        <div className={cx('create-tweet-top')}>
          <CreateTweetTop />
        </div>
        <Timeline />
      </Feed>
    </div>
  )
}

export default HomeContent
