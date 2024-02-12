import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  selectNotificationsMetadata,
  useGetNotificationsQuery,
} from '../redux/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()

  useGetNotificationsQuery()

  const notificationsMetadata = useSelector(selectNotificationsMetadata)
  const numUnredNotification = notificationsMetadata.filter(
    (n) => !n.read
  ).length

  let unreadNotificationsBadge
  if (numUnredNotification > 0) {
    unreadNotificationsBadge = (
      <span className="badge">{numUnredNotification}</span>
    )
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials</h1>
        <div className="navContent">
          <div className="navLinks"></div>
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">
            Notifications {unreadNotificationsBadge}
          </Link>
        </div>
      </section>
    </nav>
  )
}
