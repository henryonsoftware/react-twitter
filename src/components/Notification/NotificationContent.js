import classNames from 'classnames/bind'
import { useState } from 'react'
import { NotificationFeed } from 'react-activity-feed'
import { Link } from 'react-router-dom'
import NotificationGroup from './NotificationGroup'
import styles from './Notification.module.scss'

const cx = classNames.bind(styles)

const tabList = [
  {
    id: '',
    label: 'All',
  },
  {
    id: 'mentions',
    label: 'Mentions',
  },
]

function NotificationContent() {
  const [activeTab, setActiveTab] = useState(tabList[0].id)

  return (
    <div className={cx('notification-content')}>
      <div className={cx('header')}>
        <h1>Notifications</h1>
      </div>

      <div className={cx('tabs')}>
        {tabList.map((tab) => (
          <div className={cx('tab-item')} key={tab.id}>
            <Link
              to={`/notifications/${tab.id}`}
              className={cx('tab', activeTab === tab.id ? 'active' : '')}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={cx('tab-content')}>
                <span className={cx('tab-label')}>{tab.label}</span>
                {activeTab === tab.id && <div className={cx('active-tab-border')}></div>}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <NotificationFeed Group={NotificationGroup} />
    </div>
  )
}

export default NotificationContent
