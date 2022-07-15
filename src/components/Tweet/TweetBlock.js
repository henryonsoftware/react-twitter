import classNames from 'classnames/bind'
import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { useNavigate } from 'react-router-dom'
import Comment from '../Icons/Comment'
import Retweet from '../Icons/Retweet'
import Heart from '../Icons/Heart'
import Upload from '../Icons/Upload'
import MoreDot from '../Icons/MoreDot'
import styles from './TweetBlock.module.scss'
import TweetActorName from './TweetActorName'
import CommentDialog from './CommentDialog'
import { formatStringWithLink } from '../../utils/string'
import { generateTweetLink } from '../../utils/links'
import useLike from '~/hooks/useLike'

const cx = classNames.bind(styles)

function TweetBlock({ activity }) {
  const { user } = useStreamContext()

  const navigate = useNavigate()

  const [commentDialogOpened, setCommentDialogOpened] = useState(false)

  const [isHoveringOnId, setIsHoveringOnId] = useState('')

  const { toggleLike } = useLike()

  const actor = activity.actor

  const tweet = activity.object.data

  let hasLikedTweet = false

  // Check if current logged in user has liked the tweet
  if (activity?.own_reactions?.like) {
    const myReaction = activity.own_reactions.like.find((like) => like.user.id === user.id)

    hasLikedTweet = Boolean(myReaction)
  }

  const handleToggleLike = async () => {
    await toggleLike(activity)
  }

  const handleOnPostComment = async (text) => {
    // create comment
  }

  const handleMouseOver = (id) => {
    setIsHoveringOnId(id)
  }

  const handleMouseLeave = () => {
    setIsHoveringOnId('')
  }

  const actions = [
    {
      id: 'comment',
      Icon: Comment,
      alt: 'Comment',
      value: activity?.reaction_counts?.comment || 0,
      onClick: () => setCommentDialogOpened(true),
    },
    {
      id: 'retweet',
      Icon: Retweet,
      alt: 'Retweet',
      value: 0,
    },
    {
      id: 'heart',
      Icon: Heart,
      alt: 'Heart',
      value: activity?.reaction_counts?.like || 0,
      onClick: handleToggleLike,
    },
    {
      id: 'upload',
      Icon: Upload,
      alt: 'Upload',
    },
  ]

  const tweetLink = activity.id ? generateTweetLink(actor.id, activity.id) : '#'

  return (
    <>
      <div className={cx('wrapper')}>
        <div className={cx('user-image')}>
          <img src={actor.data.image} alt={actor.data.name} />
        </div>
        <div className={cx('tweet')}>
          <button className={cx('link')}>
            <TweetActorName time={activity.time} name={actor.data.name} id={actor.id} />
            <div className={cx('tweet-detail')}>
              <p
                className={cx('tweet-text')}
                dangerouslySetInnerHTML={{
                  __html: formatStringWithLink(tweet.text, 'tweet-text-link').replace(/\n/g, '<br />'),
                }}
              />
            </div>
          </button>

          <div className={cx('tweet-actions')}>
            {actions.map((action) => {
              return (
                <button
                  className={cx('action', isHoveringOnId === action.id ? `${action.id}-hovering` : '', {
                    liked: action.id === 'heart' && hasLikedTweet,
                  })}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    action.onClick?.()
                  }}
                  onMouseOver={() => handleMouseOver(action.id)}
                  onMouseLeave={handleMouseLeave}
                  key={action.id}
                >
                  <div className={cx('tweet-action-icon')}>
                    <div className={cx('icon-overlay')}></div>
                    <action.Icon width={19} height={19} fill={action.id === 'heart' && hasLikedTweet && true} />
                  </div>
                  <span className={cx('tweet-action-value')}>{action.value}</span>
                </button>
              )
            })}
          </div>
        </div>
        <button className={cx('more-btn')} title="More">
          <MoreDot width={19} height={19} />
        </button>
      </div>
      {activity.id && commentDialogOpened && (
        <CommentDialog
          onPostComment={handleOnPostComment}
          shouldOpen={commentDialogOpened}
          onClickOutside={() => setCommentDialogOpened(false)}
          activity={activity}
        />
      )}
    </>
  )
}

export default TweetBlock
