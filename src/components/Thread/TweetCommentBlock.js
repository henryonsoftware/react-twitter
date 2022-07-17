import { useState } from 'react'
import classNames from 'classnames/bind'
import TweetActorName from '~/components/Tweet/TweetActorName'
import styles from './TweetCommentBlock.module.scss'
import { formatStringWithLink } from '~/utils/string'
import MoreDot from '~/components/Icons/MoreDot'
import useLike from '~/hooks/useLike'

const cx = classNames.bind(styles)

function TweetCommentBlock({ comment }) {
  const { user, data: tweetComment } = comment

  const [commentDialogOpened, setCommentDialogOpened] = useState(false)

  const [isHoveringOnId, setIsHoveringOnId] = useState('')

  const { toggleLike } = useLike()

  let hasLikedTweet = false

  // Check if current logged in user has liked the tweet
  if (tweetComment?.own_reactions?.like) {
    const myReaction = tweetComment.own_reactions.like.find((like) => like.user.id === user.id)

    hasLikedTweet = Boolean(myReaction)
  }

  const handleToggleLike = async () => {
    await toggleLike(tweetComment, hasLikedTweet)
  }

  // const handleMouseOver = (id) => {
  //   setIsHoveringOnId(id)
  // }

  // const handleMouseLeave = () => {
  //   setIsHoveringOnId('')
  // }

  // const reactions = [
  //   {
  //     id: 'comment',
  //     Icon: Comment,
  //     alt: 'Comment',
  //     value: tweetComment?.reaction_counts?.comment || 0,
  //     onClick: () => setCommentDialogOpened(true),
  //   },
  //   {
  //     id: 'retweet',
  //     Icon: Retweet,
  //     alt: 'Retweet',
  //     value: 0,
  //   },
  //   {
  //     id: 'heart',
  //     Icon: Heart,
  //     alt: 'Heart',
  //     value: tweetComment?.reaction_counts?.like || 0,
  //     onClick: handleToggleLike,
  //   },
  //   {
  //     id: 'upload',
  //     Icon: Upload,
  //     alt: 'Upload',
  //   },
  // ]

  return (
    <div className={cx('tweet-comment-block')}>
      <div className={cx('user-image')}>
        <img src={user.data.image} alt={user.data.name} />
      </div>
      <div className={cx('comment')}>
        <div className={cx('content')}>
          <TweetActorName name={user.data.name} id={user.data.id} time={comment.created_at} />
          <div className={cx('tweet-details')}>
            <p
              className={cx('tweet-text')}
              dangerouslySetInnerHTML={{
                __html: formatStringWithLink(tweetComment.text, 'tweet-text-link').replace(/\n/g, '<br />'),
              }}
            />
          </div>
        </div>

        {/* <div className={cx('tweet-actions')}>
          {reactions.map((action) => {
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
        </div> */}
      </div>
      <button className={cx('more-btn')} title="More">
        <MoreDot width={19} height={19} />
      </button>
    </div>
  )
}

export default TweetCommentBlock
