import useTweet from '../../hooks/useTweet'
import TweetForm from '../Tweet/TweetForm'

function CreateTweetTop() {
  const { createTweet } = useTweet()

  const handleSubmit = async (text) => {
    // create tweet
    createTweet(text)
  }

  return (
    <div>
      <TweetForm placeholder="What's happening?" onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateTweetTop
