import TweetForm from '../Tweet/TweetForm'

function CreateTweetTop() {
  const handleSubmit = async (text) => {
    // create tweet here
  }

  return (
    <div>
      <TweetForm placeholder="What's happening?" onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateTweetTop
