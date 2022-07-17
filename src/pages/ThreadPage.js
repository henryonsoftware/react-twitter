import { Feed, useStreamContext } from 'react-activity-feed'
import { useParams } from 'react-router-dom'
import Layout from '~/components/Layouts/DefaultLayout'
import ThreadContent from '~/components/Thread/ThreadContent'

function ThreadPage() {
  const { user } = useStreamContext()
  const { user_id } = useParams()

  const FEED_ENRICH_OPTIONS = {
    withRecentReactions: true,
    withOwnReactions: true,
    withReactionCounts: true,
    withOwnChildren: true,
  }

  return (
    <Layout>
      <Feed feedGroup={user.id === user_id ? 'user' : 'timeline'} options={FEED_ENRICH_OPTIONS} notify>
        <ThreadContent />
      </Feed>
    </Layout>
  )
}

export default ThreadPage
