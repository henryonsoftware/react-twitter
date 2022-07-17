import classNames from 'classnames/bind'
import { useNavigate } from 'react-router-dom'
import ArrowLeft from '~/components/Icons/ArrowLeft'
import styles from './Thread.module.scss'

const cx = classNames.bind(styles)

function ThreadHeader() {
  const navigate = useNavigate()

  const navigateBack = () => {
    navigate(-1)
  }

  return (
    <header className={cx('thread-header')}>
      <div className={cx('back')}>
        <button className={cx('back-btn')} onClick={navigateBack} title="Back">
          <ArrowLeft width={20} height={20} />
        </button>
      </div>
      <div className={cx('info')}>
        <h1>Thread</h1>
      </div>
    </header>
  )
}

export default ThreadHeader
