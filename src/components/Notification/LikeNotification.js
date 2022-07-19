import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import Heart from '~/components/Icons/Heart'
import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

function LikeNotification({ likedActivities }) {
  const likedGroup = {}

  likedActivities.forEach((act) => {
    if (act.object.id in likedGroup) {
      likedGroup[act.object.id].push(act)
    } else {
      likedGroup[act.object.id] = [act]
    }
  })

  return (
    <>
      {Object.keys(likedGroup).map((groupKey) => {
        const activities = likedGroup[groupKey]

        const lastActivity = activities[0]

        return (
          <div className={cx('like-notify')} key={groupKey}>
            <div className={cx('like-icon')}>
              <Heart width={30} height={30} fill={true} />
            </div>
            <div className={cx('right')}>
              <div className={cx('avatars')}>
                {activities.map((act) => (
                  <Link to={`/${act.actor.id}`} key={act.id} className={cx('avatar')}>
                    <img src={act.actor.data.image} alt="" />
                  </Link>
                ))}
              </div>
              <span className={cx('actors-text')}>
                <Link className={cx('actor-name')} to={`/${lastActivity.actor.id}`}>
                  {lastActivity.actor.data.name}
                </Link>
                {activities.length > 1 && ` and ${activities.length - 1} others`} like your tweet
              </span>

              <p className={cx('tweet-text')}>{lastActivity.object.data.text}</p>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default LikeNotification
