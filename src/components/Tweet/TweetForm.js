import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import ProgressRing from '../Icons/ProgressRing'
import styles from './TweetForm.module.scss'
import Image from '../Icons/Image'
import Gif from '../Icons/Gif'
import Poll from '../Icons/Poll'
import Emoji from '../Icons/Emoji'
import Calendar from '../Icons/Calendar'

const cx = classNames.bind(styles)

const actions = [
  {
    id: 'image',
    Icon: Image,
    alt: 'Image',
  },
  {
    id: 'gif',
    Icon: Gif,
    alt: 'GIF',
  },
  {
    id: 'poll',
    Icon: Poll,
    alt: 'Poll',
  },
  {
    id: 'emoji',
    Icon: Emoji,
    alt: 'Emoji',
  },
  {
    id: 'schedule',
    Icon: Calendar,
    alt: 'Schedule',
  },
  {
    id: 'location',
    Icon: Location,
    alt: 'Location',
  },
]

function TweetForm({
  submitText = 'Tweet',
  onSubmit,
  className,
  placeholder,
  collapsedOnMount = false,
  minHeight = 120,
  shouldFocus = false,
  replyingTo = null,
}) {
  const MAX_INPUT_LENGTH = 280
  const inputRef = useRef()
  const { client } = useStreamContext()
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(!collapsedOnMount)

  const onClick = () => {
    setExpanded(true)
  }

  const submit = async (e) => {
    e.preventDefault()

    if (exceededMaxLength) {
      alert(`Tweet cannot exceed ${MAX_INPUT_LENGTH} characters`)
    }

    await onSubmit(text)

    setText('')
  }

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const user = client.currentUser.data
  const isInputEmpty = !Boolean(text)
  const isReplying = Boolean(replyingTo)
  const charsLeft = MAX_INPUT_LENGTH - text.length
  const maxAlmostReached = charsLeft <= 20
  const exceededMaxLength = charsLeft < 0
  const percentage = text.length > MAX_INPUT_LENGTH ? 100 : (text.length / MAX_INPUT_LENGTH) * 100

  return (
    <div className={cx('wrapper')}>
      {isReplying && expanded && (
        <span className={cx('reply-to')}>
          Replying to <span className={cx('replying-to-username')}>@{replyingTo}</span>
        </span>
      )}

      <div minHeight={minHeight + 'px'} className={cx('form', className)} onSubmit={submit}>
        <div className={cx('user')}>
          <img class={cx('avatar')} src={user.image} alt={user.name} />
        </div>

        <div className={cx('input-section')}>
          <textarea
            ref={inputRef}
            onChange={(e) => setText(e.target.value)}
            placeholder={placeholder}
            value={text}
            onClick={onClick}
          />
          <div className={cx('actions')}>
            {expanded &&
              actions.map((action) => {
                return (
                  <button
                    className={cx('action-item')}
                    type="button"
                    disabled={action.id === 'location' && 'disabled'}
                    key={action.id}
                  >
                    <action.Icon size={19} color="var(--theme-color)" />
                  </button>
                )
              })}
            <div className="right">
              {!isInputEmpty && (
                <div className="tweet-length">
                  <ProgressRing
                    color={exceededMaxLength ? 'red' : maxAlmostReached ? '#ffd400' : 'var(--theme-color)'}
                    radius={maxAlmostReached ? 19 : 14}
                    stroke={2.2}
                    progress={percentage}
                  />
                  {maxAlmostReached && (
                    <span className={cx('tweet-length-text', exceededMaxLength && 'red')}>{charsLeft}</span>
                  )}
                </div>
              )}

              {!isInputEmpty && <hr className="divider" />}
              <button type="submit" className="submit-btn" disabled={isInputEmpty}>
                {submitText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetForm
