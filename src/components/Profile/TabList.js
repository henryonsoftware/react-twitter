import { useState } from 'react'
import classNames from 'classnames/bind'
import styles from './TabList.module.scss'

const cx = classNames.bind(styles)

const tabs = [
  {
    id: 'tweets',
    label: 'Tweets',
  },
  {
    id: 'tweet-replies',
    label: 'Tweets & replies',
  },
  {
    id: 'media',
    label: 'Media',
  },
  {
    id: 'likes',
    label: 'Likes',
  },
]

function TabList() {
  const [activeTabId, setActiveTabId] = useState(tabs[0].id)

  return (
    <div className={cx('wrapper')}>
      {tabs.map((tab) => {
        return (
          <div className={cx('tab')} key={tab.id}>
            <a
              onClick={() => setActiveTabId(tab.id)}
              className={cx('tab-btn', activeTabId === tab.id ? 'active' : '')}
              key={tab.id}
            >
              <div className={cx('tab-content')}>
                <span className={cx('tab-label')}>{tab.label}</span>
                {activeTabId === tab.id && <div className={cx('tab-active-border')}></div>}
              </div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default TabList
