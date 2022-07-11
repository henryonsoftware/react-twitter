import classNames from 'classnames/bind'
import Close from '../../Icons/Close'
import styles from './Modal.module.scss'

const cx = classNames.bind(styles)

function Modal({ className, children, onClickOutside }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('backdrop')} onClick={onClickOutside} />
      <div className={cx('modal', className)}>
        <button className={cx('close-btn')} onClick={onClickOutside}>
          <Close width={20} height={20} />
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
