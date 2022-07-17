import { useState } from 'react'
import classNames from 'classnames/bind'
import { useFeedContext, useStreamContext } from 'react-activity-feed'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import useComment from '~/hooks/useComment'
import useLike from '~/hooks/useLike'
import { formatStringWithLink } from '~/utils/string'
import { generateTweetLink } from '~/utils/links'
import Comment from '~/components/Icons/Comment'
import Retweet from '~/components/Icons/Retweet'
import Heart from '~/components/Icons/Heart'
import Upload from '~/components/Icons/Upload'
import MoreDot from '~/components/Icons/MoreDot'
import BarChart from '~/components/Icons/BarChart'
import Image from '~/components/Icons/Image'
import Gif from '~/components/Icons/Gif'
import Emoji from '~/components/Icons/Emoji'
import Location from '~/components/Icons/Location'
import CommentDialog from '~/components/Tweet/CommentDialog'
import TweetForm from '~/components/Tweet/TweetForm'
import TweetCommentBlock from '~/components/Thread/TweetCommentBlock'
import styles from './TweetContent.module.scss'

const cx = classNames.bind(styles)

function TweetContent({ activity }) {
  const feed = useFeedContext()
  const { client } = useStreamContext()

  const { createComment } = useComment()
  const { toggleLike } = useLike()

  const time = format(new Date(activity.time), 'p')
  const date = format(new Date(activity.time), 'PP')

  const tweet = activity.object.data
  const tweetActor = activity.actor.data

  const [commentDialogOpened, setCommentDialogOpened] = useState(false)

  const [isHoveringOnId, setIsHoveringOnId] = useState('')

  let hasLikedTweet = false

  if (activity?.own_reactions?.like) {
    const myReaction = activity.own_reactions.like.find((like) => like.user.id === client.userId)

    hasLikedTweet = Boolean(myReaction)
  }

  const tweetLink = activity.id ? generateTweetLink(tweetActor.id, activity.id) : '#'

  const handleToggleLike = async () => {
    await toggleLike(activity, hasLikedTweet)
    feed.refresh()
  }

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
      id: 'emoji',
      Icon: Emoji,
      alt: 'Emoji',
    },
    {
      id: 'location',
      Icon: Location,
      alt: 'Location',
    },
  ]

  const reactions = [
    {
      id: 'comment',
      Icon: Comment,
      alt: 'Reply',
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
      alt: 'Like',
      onClick: handleToggleLike,
      value: activity?.reaction_counts?.like || 0,
    },
    {
      id: 'upload',
      Icon: Upload,
      alt: 'Share',
    },
  ]

  const onPostComment = async (text) => {
    await createComment(text, activity)
    feed.refresh()
  }

  const handleMouseOver = (id) => {
    setIsHoveringOnId(id)
  }

  const handleMouseLeave = () => {
    setIsHoveringOnId('')
  }

  return (
    <div className={cx('tweet-content')}>
      <div className={cx('wrapper')}>
        <div className={cx('user-info')}>
          <Link to={`/${tweetActor.id}`} className={cx('user')}>
            <div className={cx('user-image')}>
              <img src={tweetActor.image} alt={tweetActor.name} />
            </div>
          </Link>

          <Link to={`/${tweetActor.id}`}>
            <div className={cx('fullname')}>{tweetActor.name}</div>
            <div className={cx('username')}>@{tweetActor.id}</div>
          </Link>
        </div>
        <button className={cx('more-btn')} title="More">
          <MoreDot width={19} height={19} />
        </button>
        <div className={cx('tweet')}>
          <p
            className={cx('tweet-text')}
            dangerouslySetInnerHTML={{
              __html: formatStringWithLink(tweet.text, 'tweet-text-link').replace(/\n/g, '<br />'),
            }}
          />
          <Link to={tweetLink} className={cx('tweet-time')}>
            <span>
              {time} · {date}
            </span>
          </Link>
          <div className={cx('tweet-analytics')}>
            <BarChart width={19} height={23} />
            <span className="tweet-analytics-text">View Tweet Analytics</span>
          </div>
          <div className={cx('tweet-reactions')}>
            <div className={cx('tweet-reactions-likes')}>
              <span className={cx('reaction-count')}>{activity.reaction_counts.like || '0'}</span>
              <span className={cx('reaction-label')}>Likes</span>
            </div>
          </div>

          <div className={cx('tweet-actions')}>
            {reactions.map((reaction) => {
              return (
                <button
                  className={cx('action', isHoveringOnId === reaction.id ? `${reaction.id}-hovering` : '', {
                    liked: reaction.id === 'heart' && hasLikedTweet,
                  })}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    reaction.onClick?.()
                  }}
                  onMouseOver={() => handleMouseOver(reaction.id)}
                  onMouseLeave={handleMouseLeave}
                  key={reaction.id}
                >
                  <div className={cx('tweet-action-icon')}>
                    <div className={cx('icon-overlay')} title={reaction.alt}></div>
                    <reaction.Icon width={19} height={19} fill={reaction.id === 'heart' && hasLikedTweet && true} />
                  </div>
                  <span className={cx('tweet-action-value')}>{reaction.value}</span>
                </button>
              )
            })}
          </div>
        </div>
        <div className={cx('tweet-reply')}>
          <TweetForm
            actions={actions}
            onSubmit={onPostComment}
            submitText="Reply"
            collapsedOnMount={true}
            placeholder="Tweet your reply"
            replyingTo={tweetActor.id}
          />
        </div>
        {activity.latest_reactions?.comment?.map((comment) => (
          <TweetCommentBlock key={comment.id} comment={comment} />
        ))}
      </div>

      {commentDialogOpened && (
        <CommentDialog
          activity={activity}
          onPostComment={onPostComment}
          onClickOutside={() => setCommentDialogOpened(false)}
        />
      )}
    </div>
  )
}

export default TweetContent
