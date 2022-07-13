import classNames from 'classnames/bind'
import styles from './CommentDialog.module.scss'
import Modal from '../Modals/NewTweet/Modal'
import TweetActorName from './TweetActorName'
import TweetForm from './TweetForm'
import { formatStringWithLink } from '../../utils/string'

const cx = classNames.bind(styles)

function CommentDialog({ activity, onPostComment, onClickOutside }) {
  const {
    object: { data: tweet },
  } = activity

  const tweetActor = activity.actor

  const handleSubmit = async (text) => {
    await onPostComment(text)

    onClickOutside()
  }

  return (
    <div className={cx('wrapper')}>
      <Modal className="modal-block" onClickOutside={onClickOutside}>
        <div className={cx('block-content')}>
          <div className={cx('tweet')}>
            <div className={cx('img')}>
              <img src={tweetActor.data.image} alt="" />
            </div>
            <div className={cx('details')}>
              <TweetActorName time={activity.time} name={tweetActor.data.name} id={tweetActor.data.id}>
                <p
                  className="tweet-text"
                  dangerouslySetInnerHTML={{
                    __html: formatStringWithLink(tweet.text, 'tweet__text--link', true).replace(/\n/g, '<br/>'),
                  }}
                />
                <div className={cx('replying-info')}>
                  Replying to <span className={cx('replying-info-actor')}>@{tweetActor.data.id}</span>
                </div>
              </TweetActorName>
            </div>
          </div>

          <div className={cx('comment')}>
            <TweetForm
              className={cx('comment-form')}
              submitText="Reply"
              placeholder="Tweet your reply"
              onSubmit={handleSubmit}
              shouldFocus={true}
            ></TweetForm>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CommentDialog
