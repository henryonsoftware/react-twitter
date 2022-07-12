import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import LoadingIndicator from '../LoadingIndicator'
import Home from '../Icons/Home'
import Hashtag from '../Icons/Hashtag'
import Mail from '../Icons/Mail'
import Bell from '../Icons/Bell'
import User from '../Icons/User'
import Twitter from '../Icons/Twitter'
import More from '../Icons/More'
import MoreDot from '../Icons/MoreDot'
import styles from './LeftSidebar.module.scss'

const cx = classNames.bind(styles)

function LeftSidebar({ onClickTweetBtn }) {
  const location = useLocation()
  const { userData } = useStreamContext()
  const [newNotifications, setNewNotifications] = useState(0)

  if (!userData) {
    return (
      <div>
        <LoadingIndicator />
      </div>
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
      id: 'profile',
      label: 'Profile',
      Icon: User,
      link: `/${userData.id}`,
    },
    {
      id: '',
      label: 'More',
      Icon: More,
    },
  ]

  return (
    <div className={cx('left-inner')}>
      <div>
        <Link to="/" className={cx('logo')}>
          <Twitter width={50} height={30} />
        </Link>

        <div className={cx('buttons')}>
          {menus.map((menu) => {
            const isActiveLink =
              location.pathname === `/${menu.id}` || (menu.id === 'profile' && location.pathname === `/${userData.id}`)

            return (
              <Link
                to={menu.link ?? '#'}
                className={cx(`btn-${menu.id}`, 'menu-item', isActiveLink && 'active')}
                key={menu.id}
                onClick={menu.onClick}
              >
                <div className={cx('menu-item-inner')}>
                  <div className={cx('btn-icon')}>
                    {newNotifications && menu.id === 'notifications' ? (
                      <span className="notifications-count">{newNotifications}</span>
                    ) : null}
                    <menu.Icon fill={isActiveLink} width={26} height={26} />
                  </div>
                  <span className={cx('menu-item-label', isActiveLink && 'active')}>{menu.label}</span>
                </div>
              </Link>
            )
          })}
        </div>

        <button onClick={onClickTweetBtn} className={cx('tweet-btn')}>
          Tweet
        </button>
      </div>

      <button className={cx('profile-section')}>
        <div className={cx('details')}>
          <div className={cx('detail-img')}>
            <img src={userData.image} alt={userData.name} />
          </div>
          <div>
            <div className={cx('detail-text')}>
              <span className={cx('name')}>{userData.name}</span>
              <span className={cx('username')}>@{userData.id}</span>
            </div>
          </div>
          <div className={cx('detail-more-btn')}>
            <MoreDot width={19} height={19} />
          </div>
        </div>
      </button>
    </div>
  )
}

export default LeftSidebar
