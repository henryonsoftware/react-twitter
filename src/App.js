import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StreamClient } from 'getstream'
import { StreamApp } from 'react-activity-feed'
import users from './users'
import { getFromStorage } from './utils/storage'
import StartPage from './pages/StartPage'
import ScrollToTop from './components/ScrollToTop'
import TweetForm from './components/Tweet/TweetForm'

const APP_ID = '1197595'
const API_KEY = 'mnahj4hug5pj'

function App({ onClickTweet }) {
  const userId = getFromStorage('user')

  const user = users.find((u) => u.id === userId || users[0])

  const [client, setClient] = useState(null)

  useEffect(() => {
    async function init() {
      const client = new StreamClient(API_KEY, user.token, APP_ID)

      await client.user(user.id).getOrCreate({ ...user, token: '' })

      setClient(client)
    }

    init()
  }, [])

  if (!client) {
    return <></>
  }

  return (
    <StreamApp token={user.token} appId={APP_ID} apiKey={API_KEY}>
      <Router>
        <TweetForm placeholder="What's happening?" />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
      </Router>
    </StreamApp>
  )
}

export default App
