import classNames from 'classnames/bind'
import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import Search from '../Icons/Search'
import FollowBtn from '../FollowBtn'
import styles from './Sidebar.module.scss'

const cx = classNames.bind(styles)

const trends = [
  { title: 'iPhone 12', tweetsCount: '11.6k', category: 'Technology' },

  { title: 'LinkedIn', tweetsCount: '51.1K', category: 'Business & finance' },

  { title: 'John Cena', tweetsCount: '1,200', category: 'Sports' },

  { title: '#Microsoft', tweetsCount: '3,022', category: 'Business & finance' },

  { title: '#DataSciencve', tweetsCount: '18.6k', category: 'Technology' },
]

function RightSidebar() {
  const [searchText, setSearchText] = useState('')

  const { client } = useStreamContext()

  const whoToFollow = users.filter((user) => {
    return user.id !== client.userId
  })

  return (
    <div className={cx('wrapper')}>
      <div className={cx('search-container')}>
        <form className={cx('search-form')}>
          <div className={cx('search-icon')}>
            <Search color="rgba(85,85,85,1)" />
          </div>
          <input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
          <button
            className={cx(!Boolean(searchText) && 'hide', 'submit-btn')}
            type="button"
            onClick={() => setSearchText('')}
          >
            X
          </button>
        </form>
      </div>

      <div className={cx('trends')}>
        <h2>Trends for you</h2>
        <div className={cx('trends-list')}>
          {trends.map((trend, index) => {
            return (
              <div className={cx('trend')} key={`${trend.title}-${index}`}>
                <div className={cx('detail')}>
                  <div className={cx('category')}>
                    {trend.category}
                    <span className={cx('category-label')}>Trending</span>
                  </div>
                  <span className={cx('title')}>{trend.title}</span>
                  <span className={cx('tweet-count')}>{trend.tweetsCount} Tweets</span>
                </div>
                <button className={cx('more-btn')}>
                  <More color="white" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className={cx('follows')}>
        <h2>Who to follow</h2>
        <div className={cx('follows-list')}>
          {whoToFollow.map((user) => {
            return (
              <div className={cx('user')} key={user.id}>
                <Link to={`/${user.id}`} className={cx('user-detail')}>
                  <div className={cx('user-img')}>
                    <img src={user.image} alt={user.name} />
                  </div>
                  <div className={cx('user-info')}>
                    <span className={cx('fullname')}>{user.name}</span>
                    <span className={cx('username')}>@{user.id}</span>
                  </div>
                </Link>
                <FollowBtn userId={user.id} />
              </div>
            )
          })}
        </div>
        <span className={cx('show-more-text')}>Show more</span>
      </div>
    </div>
  )
}

export default RightSidebar
