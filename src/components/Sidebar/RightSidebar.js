import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import Search from '../Icons/Search'
import MoreDot from '../Icons/MoreDot'
import Clear from '../Icons/Clear'
import FollowBtn from '../FollowBtn'
import styles from './RightSidebar.module.scss'
import users from '~/data/users'

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
        <div className={cx('search-form-wrapper')}>
          <form className={cx('search-form')}>
            <div className={cx('search-icon')}>
              <Search width={44} height={19} />
            </div>
            <input
              className={cx('search-input')}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search Twitter"
            />
            <button
              className={cx(!Boolean(searchText) && 'hide', 'clear-input-btn')}
              type="button"
              onClick={() => setSearchText('')}
            >
              <Clear width={10} height={10} />
            </button>
          </form>
        </div>
      </div>

      <div className={cx('trends')}>
        <h2>Trends for you</h2>
        <div className={cx('trends-list')}>
          {trends.map((trend, index) => {
            return (
              <div className={cx('trend')} key={`${trend.title}-${index}`}>
                <div className={cx('category')}>Trending in {trend.category}</div>
                <div>
                  <span className={cx('title')}>{trend.title}</span>
                </div>
                <span className={cx('tweet-count')}>{trend.tweetsCount} Tweets</span>
                <button className={cx('more-btn')} title="More">
                  <MoreDot width={19} height={19} />
                </button>
              </div>
            )
          })}
          <div className={cx('trend')}>
            <a href="#" className={cx('show-more-trend')}>
              Show more
            </a>
          </div>
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
                  <div className={cx('user-right-side')}>
                    <div className={cx('user-info')}>
                      <span className={cx('fullname')}>{user.name}</span>
                      <div className={cx('username-wrapper')}>
                        <span className={cx('username')}>@{user.id}</span>
                        {user.isFollowingYou && <span className={cx('follows-you')}>Follows you</span>}
                      </div>
                    </div>
                    <div className={cx('follow-btn')}>
                      <FollowBtn userId={user.id} />
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}

          <div className={cx('user')}>
            <a href="#" className={cx('show-more-follow')}>
              Show more
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
