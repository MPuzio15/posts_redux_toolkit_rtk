import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'

import { selectAllUsers } from '../../redux/usersSlice'
import {
  selectAllNotifications,
  allNotificationsRead,
} from '../../redux/notificationsSlice'
import { timeAgo } from '../posts/helpers/TimeAgo'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification) => {
    const date = notification.date
    const howLongAgo = timeAgo(date)
    const user = users.find((user) => user.id === notification.user) || {
      name: 'Unknown User',
    }
    const notificationClassName = classnames('notification', {
      new: notification.isNew,
    })
    return (
      <div key={notification.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {notification.message}
        </div>
        <div title={notification.date}>
          <i>{howLongAgo} ago</i>
        </div>
      </div>
    )
  })
  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
