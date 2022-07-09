import TweetForm from '../Tweet/TweetForm'

function CreateTweetTop() {
  const onSubmit = async (text) => {
    // create tweet here
  }

  return (
    <div>
      <TweetForm placeholder="What's happening?" onSubmit={onSubmit} />
    </div>
  )
}

export default CreateTweetTop
