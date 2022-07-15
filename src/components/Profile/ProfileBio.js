import { useContext } from 'react'
import classNames from 'classnames/bind'
import { format } from 'date-fns'
import { useStreamContext } from 'react-activity-feed'
import { formatStringWithLink } from '../../utils/string'
import MoreDot from '../Icons/MoreDot'
import Mail from '../Icons/Mail'
import Calendar from '../Icons/Calendar'
import FollowBtn from '../FollowBtn'
import styles from './ProfileBio.module.scss'
import { ProfileContext } from './ProfileContent'

const cx = classNames.bind(styles)

const actions = [
  {
    Icon: MoreDot,
    id: 'more',
  },
  {
    Icon: Mail,
    id: 'message',
  },
]

function ProfileBio() {
  const { user } = useContext(ProfileContext)

  const { client } = useStreamContext()

  const joinDate = format(new Date(user.created_at), 'MMMM RRRR')

  const bio = formatStringWithLink(user.data.bio)

  const isLoggedInUserProfile = user.id === client.userId

  return (
    <div className={cx('container')}>
      <div className={cx('top')}>
        <div className={cx('avatar')}>
          <img src={user.data.image} alt={user.data.name} />
        </div>
        <div className={cx('actions')}>
          {!isLoggedInUserProfile ? (
            <div className={cx('action-items')}>
              {actions.map((action) => (
                <button className={cx('action-btn')} key={action.id}>
                  {<action.Icon width={20} height={20} />}
                </button>
              ))}
              <div className={cx('follow-btn')}>
                <FollowBtn userId={user.id} />
              </div>
            </div>
          ) : (
            <button className={cx('edit-profile-btn')}>Edit profile</button>
          )}
        </div>
      </div>
      <div className={cx('details')}>
        <span className={cx('fullname')}>{user.data.name}</span>
        <span className={cx('username')}>@{user.id}</span>
        <span className={cx('bio')} dangerouslySetInnerHTML={{ __html: bio }} />
        <div className={cx('joined-on')}>
          <Calendar width={20} height={20} />
          <span>Joined {joinDate}</span>
        </div>
        <div className={cx('follows')}>
          <div className={cx('following-count')}>
            <span className={cx('number')}>{user.following_count || 0}</span>{' '}
            <span className={cx('label')}>Following</span>
          </div>
          <div className={cx('followers-count')}>
            <span className={cx('number')}>{user.followers_count || 0}</span>{' '}
            <span className={cx('label')}>Followers</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBio
