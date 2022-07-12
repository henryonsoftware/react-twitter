import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './FollowBtn.module.scss'

const cx = classNames.bind(styles)

function FollowBtn({ userId }) {
  const [following, setFollowing] = useState(false)
  const [buttonText, setButtonText] = useState('Following')
  const [classHover, setClassHover] = useState('')

  return (
    <button
      className={cx('button', following ? 'following' : '', classHover)}
      onClick={() => setFollowing(!following)}
      onMouseOver={() => {
        setButtonText('Unfollow')
        setClassHover('unfollow-hover')
      }}
      onMouseLeave={(e) => {
        setButtonText('Following')
        setClassHover('')
      }}
    >
      {following ? buttonText : 'Follow'}
    </button>
  )
}

export default FollowBtn
