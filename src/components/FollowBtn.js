import classNames from 'classnames/bind'
import { useState } from 'react'
import styles from './FollowBtn.module.scss'
import useFollow from '~/hooks/useFollow'

const cx = classNames.bind(styles)

function FollowBtn({ userId }) {
  const { isFollowing, toggleFollow } = useFollow(userId)
  const [buttonText, setButtonText] = useState('Following')
  const [classHover, setClassHover] = useState('')

  return (
    <button
      className={cx('button', isFollowing ? 'following' : '', classHover)}
      onClick={(e) => {
        e.preventDefault()

        isFollowing ? setButtonText('Follow') : setButtonText('Following')

        toggleFollow()
      }}
      onMouseEnter={() => {
        setButtonText('Unfollow')
        setClassHover('unfollow-hover')
      }}
      onMouseLeave={() => {
        setButtonText('Following')
        setClassHover('')
      }}
    >
      {isFollowing ? buttonText : 'Follow'}
    </button>
  )
}

export default FollowBtn
