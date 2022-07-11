import { useState } from 'react'
import { useStreamContext } from 'react-activity-feed'
import classNames from 'classnames/bind'

import styles from './DefaultLayout.module.scss'
import LoadingIndicator from '../LoadingIndicator'
import CreateTweetDialog from '../Tweet/CreateTweetDialog'
import LeftSidebar from '../Sidebar/LeftSidebar'
import RightSidebar from '../Sidebar/RightSidebar'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
  const { user } = useStreamContext()

  const [createDialogOpened, setCreateDialogOpened] = useState(false)

  if (!user) {
    return <LoadingIndicator />
  }

  return (
    <>
      {createDialogOpened && <CreateTweetDialog onClickOutside={() => setCreateDialogOpened(false)} />}
      <div className={cx('wrapper')}>
        <div className={cx('content')}>
          <div className={cx('left-sidebar')}>
            <LeftSidebar onClickTweetBtn={() => setCreateDialogOpened(true)} />
          </div>
          <main className={cx('main-content')}>{user ? children : <LoadingIndicator />}</main>
          <div className={cx('right-sidebar')}>
            <RightSidebar />
          </div>
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
