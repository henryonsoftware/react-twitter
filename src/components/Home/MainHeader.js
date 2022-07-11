import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import Star from '../Icons/Star'

const cx = classNames.bind(styles)

function MainHeader() {
  return (
    <div className={cx('header-wrapper')}>
      <h1 className={cx('header-home-text')}>Home</h1>
      <div className={cx('top-tweets-icon')}>
        <Star width={20} height={20} />
      </div>
    </div>
  )
}

export default MainHeader
