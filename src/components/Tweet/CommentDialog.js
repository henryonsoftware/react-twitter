import classNames from 'classnames/bind'
import styles from './CommentDialog.module.scss'
import Modal from '../Modals/NewTweet/Modal'
import TweetActorName from './TweetActorName'
import TweetForm from './TweetForm'
import { formatStringWithLink } from '../../utils/string'
import Image from '~/components/Icons/Image'
import Gif from '~/components/Icons/Gif'
import Poll from '~/components/Icons/Poll'
import Emoji from '~/components/Icons/Emoji'
import Calendar from '~/components/Icons/Calendar'
import Location from '~/components/Icons/Location'

const cx = classNames.bind(styles)

function CommentDialog({ activity, onPostComment, onClickOutside }) {
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

  const {
    object: { data: tweet },
  } = activity

  const tweetActor = activity.actor

  const handleSubmit = async (text) => {
    await onPostComment(text)

    onClickOutside()
  }

  return (
    <div>
      <Modal className={cx('modal-block')} onClickOutside={onClickOutside}>
        <div>
          <div className={cx('tweet')}>
            <div className={cx('avatar')}>
              <img src={tweetActor.data.image} alt="" />
              <div className={cx('tweet-connector')}></div>
            </div>
            <div className={cx('details')}>
              <TweetActorName time={activity.time} name={tweetActor.data.name} id={tweetActor.data.id} />
              <p
                className={cx('tweet-text')}
                dangerouslySetInnerHTML={{
                  __html: formatStringWithLink(tweet.text, 'tweet__text--link', true).replace(/\n/g, '<br/>'),
                }}
              />
              <div className={cx('replying-info')}>
                Replying to <span className={cx('replying-info-actor')}>@{tweetActor.data.id}</span>
              </div>
            </div>
          </div>

          <div className={cx('comment')}>
            <TweetForm
              actions={actions}
              className={cx('comment-form')}
              submitText="Reply"
              placeholder="Tweet your reply"
              rows={4}
              onSubmit={handleSubmit}
              shouldFocus={true}
              initialHeight={125}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CommentDialog
