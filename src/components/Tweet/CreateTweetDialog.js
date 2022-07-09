import classNames from 'classnames/bind'
import Modal from '../Modal'
import TweetForm from './TweetForm'
import styles from './CreateTweetDialog.module.scss'

const cx = classNames.bind(styles)

function CreateTweetDialog({ onClickOutside }) {
  const onSubmit = async (text) => {
    // create tweet

    onClickOutside()
  }
  return (
    <div>
      <Modal className={cx('modal-block')} onClickOutside={onClickOutside}>
        <TweetForm
          onSubmit={onSubmit}
          className="tweet-form"
          placeholder="What's happening?"
          minHeight={240}
          shouldFocus={true}
        ></TweetForm>
      </Modal>
    </div>
  )
}

export default CreateTweetDialog
