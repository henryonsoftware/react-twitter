import classNames from 'classnames/bind'
import Modal from '../Modals/NewTweet/Modal'
import TweetForm from './TweetForm'
import useTweet from '../../hooks/useTweet'
import styles from './CreateTweetDialog.module.scss'

const cx = classNames.bind(styles)

function CreateTweetDialog({ onClickOutside }) {
  const { createTweet } = useTweet()

  const handleOnSubmit = async (text) => {
    // create tweet
    createTweet(text)

    onClickOutside()
  }
  return (
    <div>
      <Modal className={cx('modal-block')} onClickOutside={onClickOutside}>
        <TweetForm
          onSubmit={handleOnSubmit}
          className={cx('tweet-form')}
          placeholder="What's happening?"
          rows={4}
          shouldFocus={true}
          initialHeight={125}
        ></TweetForm>
      </Modal>
    </div>
  )
}

export default CreateTweetDialog
