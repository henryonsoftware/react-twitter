import classNames from 'classnames/bind'
import users from '../users'
import { saveToStorage } from '../utils/storage'
import styles from './StartPage.module.scss'

const cx = classNames.bind(styles)

function StartPage() {
  const handleOnClickUser = (id) => {
    saveToStorage('user', id)
    window.location.href = '/home'
  }

  return (
    <div className={cx('wrapper')}>
      <h1 className={cx('title')}>Select a user</h1>

      <div className={cx('users')}>
        {users.map((user) => (
          <button className={cx('user')} onClick={() => handleOnClickUser(user.id)} key={user.id}>
            <img src={user.image} alt={user.name} />
            <span className={cx('name')}>{user.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default StartPage
