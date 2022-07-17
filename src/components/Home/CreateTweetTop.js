import useTweet from '../../hooks/useTweet'
import TweetForm from '../Tweet/TweetForm'
import Image from '~/components/Icons/Image'
import Gif from '~/components/Icons/Gif'
import Poll from '~/components/Icons/Poll'
import Emoji from '~/components/Icons/Emoji'
import Calendar from '~/components/Icons/Calendar'
import Location from '~/components/Icons/Location'

function CreateTweetTop() {
  const { createTweet } = useTweet()

  const handleSubmit = async (text) => {
    createTweet(text)
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
      <TweetForm actions={actions} placeholder="What's happening?" onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateTweetTop
