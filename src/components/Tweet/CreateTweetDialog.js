import classNames from 'classnames/bind'
import Modal from '../Modals/NewTweet/Modal'
import TweetForm from './TweetForm'
import styles from './CreateTweetDialog.module.scss'

const cx = classNames.bind(styles)

function CreateTweetDialog({ onClickOutside }) {
  const handleOnSubmit = async (text) => {
    // create tweet

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
        ></TweetForm>
      </Modal>
    </div>
  )
}

export default CreateTweetDialog
