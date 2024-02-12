import React from 'react'
import { Link } from 'react-router-dom'

import { useGetUsersQuery } from '../../redux/usersSlice'

export const UsersList = () => {
  const { data: users = [] } = useGetUsersQuery()

  const renderedUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}
