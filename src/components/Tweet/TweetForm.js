import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import ProgressRing from '../Icons/ProgressRing'
import styles from './TweetForm.module.scss'

const cx = classNames.bind(styles)

function TweetForm({
  actions,
  submitText = 'Tweet',
  onSubmit,
  className,
  placeholder,
  collapsedOnMount = false,
  shouldFocus = false,
  replyingTo = null,
  rows = null,
  initialHeight = 74,
}) {
  const MAX_INPUT_LENGTH = 280
  const inputRef = useRef()
  const { client } = useStreamContext()
  const [text, setText] = useState('')
  const [expanded, setExpanded] = useState(!collapsedOnMount)

  const handleInputOnClick = () => {
    setExpanded(true)
  }

  const handleOnSubmit = async (e) => {
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
  const exceededMaxLengthMoreThan10Chars = text.length - MAX_INPUT_LENGTH >= 10
  const percentage = text.length > MAX_INPUT_LENGTH ? 100 : (text.length / MAX_INPUT_LENGTH) * 100

  return (
    <div className={cx('wrapper')}>
      {isReplying && expanded && (
        <span className={cx('reply-to')}>
          Replying to <span className={cx('replying-to-username')}>@{replyingTo}</span>
        </span>
      )}

      <form onSubmit={handleOnSubmit} className={cx('form', className)}>
        <div className={cx('user')}>
          <img className={cx('avatar')} src={user.image} alt={user.name} />
        </div>

        <div className={cx('input-wrapper')}>
          <div className={cx('input-section')}>
            <textarea
              rows={rows}
              ref={inputRef}
              onChange={(e) => {
                setText(e.target.value)

                // Auto increase height
                if (e.target.scrollHeight > initialHeight) {
                  e.target.style.height = 5 + 'px'
                  e.target.style.height = e.target.scrollHeight + 'px'
                }
              }}
              placeholder={placeholder}
              value={text}
              onClick={handleInputOnClick}
            />

            {/* This is temporary button for reply a tweet, display until the input has been focused */}
            {isReplying && !expanded && (
              <button type="submit" className={cx('temp-submit-btn')} disabled={true}>
                {submitText}
              </button>
            )}
          </div>

          <div className={cx('actions')}>
            <div className={cx('action-items')}>
              {expanded &&
                actions.map((action) => {
                  return (
                    <button
                      className={cx('action-item')}
                      type="button"
                      disabled={action.id === 'location' && 'disabled'}
                      key={action.id}
                    >
                      <action.Icon width={20} height={20} />
                    </button>
                  )
                })}
            </div>

            <div className={cx('right')}>
              {!isInputEmpty && (
                <div className={cx('tweet-length')}>
                  <ProgressRing
                    color={
                      exceededMaxLengthMoreThan10Chars
                        ? '#fff'
                        : exceededMaxLength
                        ? 'red'
                        : maxAlmostReached
                        ? '#ffd400'
                        : 'var(--primaryColor)'
                    }
                    radius={maxAlmostReached ? 19 : 14}
                    stroke={2.2}
                    progress={percentage}
                  />
                  {maxAlmostReached && (
                    <span className={cx('tweet-length-text', exceededMaxLength && 'red')}>{charsLeft}</span>
                  )}
                </div>
              )}

              {!isInputEmpty && <hr className={cx('divider')} />}

              {/* This button to create the Top Tweet on homepage */}
              {/* Or to Reply a Tweet on a Thread when the input has been focused */}
              {(!isReplying || (isReplying && expanded)) && (
                <button type="submit" className={cx('submit-btn')} disabled={isInputEmpty || exceededMaxLength}>
                  {submitText}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TweetForm
