import classNames from 'classnames/bind'
import Modal from '../Modals/NewTweet/Modal'
import TweetForm from './TweetForm'
import useTweet from '../../hooks/useTweet'
import styles from './CreateTweetDialog.module.scss'
import Image from '~/components/Icons/Image'
import Gif from '~/components/Icons/Gif'
import Poll from '~/components/Icons/Poll'
import Emoji from '~/components/Icons/Emoji'
import Calendar from '~/components/Icons/Calendar'
import Location from '~/components/Icons/Location'

const cx = classNames.bind(styles)

function CreateTweetDialog({ onClickOutside }) {
  const { createTweet } = useTweet()

  const handleOnSubmit = async (text) => {
    createTweet(text)
    onClickOutside()
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

  return (
    <div>
      <Modal className={cx('modal-block')} onClickOutside={onClickOutside}>
        <TweetForm
          actions={actions}
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
