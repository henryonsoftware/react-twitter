import classNames from 'classnames/bind'
import styles from './Home.module.scss'
import Star from '../Icons/Star'

const cx = classNames.bind(styles)

function MainHeader() {
  return (
    <div className={cx('header-wrapper')}>
      <h1 className={cx('header-home-text')}>Home</h1>
      <Star color="white" />
    </div>
  )
}

export default MainHeader
