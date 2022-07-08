import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import LoadingIndicator from '../LoadingIndicator'
import Home from '../Icons/Home'
import Hashtag from '../Icons/Hashtag'
import Mail from '../Icons/Mail'
import Bookmark from '../Icons/Bookmark'
import styles from './Sidebar.module.scss'

const cx = classNames(styles)

function Sidebar({ onClickTweet }) {
  const location = useLocation()
  const { userData } = useStreamContext()
  const [newNotifications, setNewNotifications] = useState(0)

  if (!userData) {
    return (
      <Container>
        <LoadingIndicator />
      </Container>
    )
  }

  const menus = [
    {
      id: 'home',
      label: 'Home',
      Icon: Home,
      link: '/home',
    },
    {
      id: 'explore',
      label: 'Explore',
      Icon: Hashtag,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      Icon: Bell,
      link: '/notifications',
      value: newNotifications,
    },
    {
      id: 'messages',
      label: 'Messages',
      Icon: Mail,
    },
    {
      id: 'bookmarks',
      label: 'Bookmarks',
      Icon: Bookmark,
    },
    {
      id: 'profile',
      label: 'Profile',
      Icon: User,
      link: `/${userData.id}`,
    },
  ]

  return (
    <Container>
      <Link to="/" className={cx('header')}>
        <Twitter color="white" size={23} />
      </Link>
      <div className={cx('buttons')}>
        {menus.map((menu) => {
          const isActiveLink =
            location.pathname === `/${menu.id}` || (menu.id === 'profile' && location.pathname === `/${userData.id}`)

          return (
            <Link
              to={menu.link ?? '#'}
              className={cx(`btn-${menu.id} new-tweets`, isActiveLink && 'active')}
              key={menu.id}
              onClick={menu.onClick}
            >
              <div className="btn--icon">
                {newNotifications && menu.id === 'notifications' ? (
                  <span className="notifications-count">{newNotifications}</span>
                ) : null}
                <menu.Icon fill={isActiveLink} color="white" size={25} />
              </div>
              <span>{menu.label}</span>
            </Link>
          )
        })}

        <button className={cx('btn-more')}>
          <div className={cx('btn-icon')}>
            <More color="white" size={20} />
          </div>
          <span>More</span>
        </button>
      </div>

      <button onClick={onClickTweet} className={cx('tweet-btn')}>
        Tweet
      </button>

      <button className={cx('profile-section')}>
        <div className={cx('details')}>
          <div className={cx('detail-img')}>
            <img src={userData.image} alt={userData.name} />
          </div>
          <div className={cx('detail-text')}>
            <span className={cx('name')}>{userData.name}</span>
            <span className={cx('username')}>@{userData.id}</span>
          </div>
        </div>
        <div>
          <More color="white" />
        </div>
      </button>
    </Container>
  )
}

export default Sidebar
