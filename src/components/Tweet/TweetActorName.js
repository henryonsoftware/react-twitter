import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import styles from './TweetActorName.module.scss'

const cx = classNames.bind(styles)

function TweetActorName({ time, name, id }) {
  const diffTime = Date.now() - new Date(time).getTime()

  const hoursBetweenDates = diffTime / (60 * 60 * 1000)

  const lessThan24Hours = hoursBetweenDates < 24

  const lessThanAnHour = hoursBetweenDates < 1

  const timeText = lessThanAnHour
    ? format(diffTime, 'm') + 'm'
    : lessThan24Hours
    ? format(diffTime, 'H') + 'h'
    : format(new Date(time), 'MMM d')

  return (
    <Link to={`/${id}`} className={cx('wrapper')}>
      <span className={cx('fullname')}>{name}</span>
      <span className={cx('username')}>@{id}</span>
      <span className={cx('tweet-date')}>{timeText}</span>
    </Link>
  )
}

export default TweetActorName
