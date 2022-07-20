import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { StreamClient } from 'getstream'
import { StreamApp } from 'react-activity-feed'
import users from './data/users'
import { getFromStorage } from './utils/storage'
import StartPage from './pages/StartPage'
import HomePage from './pages/HomePage'
import ScrollToTop from './components/ScrollToTop'
import ProfilePage from './pages/ProfilePage'
import ThreadPage from './pages/ThreadPage'
import NotificationPage from './pages/NotificationPage'

function App() {
  const userId = getFromStorage('user')

  const user = users.find((u) => u.id === userId) || users[0]

  const [client, setClient] = useState(null)

  useEffect(() => {
    async function init() {
      const client = new StreamClient(process.env.REACT_APP_API_KEY, user.token, process.env.REACT_APP_APP_ID)

      await client.user(user.id).getOrCreate({ ...user, token: '' })

      setClient(client)
    }

    init()
  }, [])

  if (!client) {
    return <></>
  }

  return (
    <StreamApp token={user.token} appId={process.env.REACT_APP_APP_ID} apiKey={process.env.REACT_APP_API_KEY}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/:user_id" element={<ProfilePage />} />
          <Route path="/:user_id/status/:id" element={<ThreadPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Routes>
      </Router>
    </StreamApp>
  )
}

export default App
