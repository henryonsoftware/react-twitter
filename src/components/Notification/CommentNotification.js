import { useStreamContext } from 'react-activity-feed'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Notification.module.scss'
import TweetActorName from '~/components/Tweet/TweetActorName'

const cx = classNames.bind(styles)

function CommentNotification({ commentActivities }) {
  const { user } = useStreamContext()

  return (
    <>
      {commentActivities.map((activity) => {
        const actor = activity.actor

        return (
          <div className={cx('comment-notify')} key={activity.id}>
            <Link to={`/${actor.id}`} className={cx('avatar')}>
              <img src={actor.data.image} alt={actor.data.name} />
            </Link>
            <div className={cx('detail')}>
              <TweetActorName id={actor.id} name={actor.data.name} time={activity.time} />
              <div className={cx('reply-to')}>
                Replying to <Link to={`/${user.id}`}>@{user.id}</Link>
              </div>
              <div className={cx('text')}>
                <p>{activity.text}</p>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default CommentNotification
