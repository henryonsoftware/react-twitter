import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import User from '~/components/Icons/User'

const cx = classNames.bind(styles)

function FollowNotification({ followActivities }) {
  const lastActivity = followActivities[0]

  return (
    <div className={cx('follow-notify')}>
      <div className={cx('follow-icon')}>
        <User width={30} height={30} fill={true} />
      </div>
      <div className={cx('right')}>
        <div className={cx('avatars')}>
          {followActivities.map((act) => (
            <Link to={`/${act.actor.id}`} key={act.id} className={cx('avatar')}>
              <img src={act.actor.data.image} alt="" />
            </Link>
          ))}
        </div>
        <span className={cx('actors-text')}>
          <Link className={cx('actor-name')} to={`/${lastActivity.actor.id}`}>
            {lastActivity.actor.data.name}
          </Link>{' '}
          {followActivities.length > 1 && ` and ${followActivities.length - 1} others `}
          followed you
        </span>
      </div>
    </div>
  )
}

export default FollowNotification
