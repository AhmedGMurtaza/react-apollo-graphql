import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Me } from 'modules/auth/gql/__generated__/Me'
import { ME_QUERY } from 'modules/auth/gql'
import { StyledMenu } from './styled'

const { Header } = Layout

export const Navigation = withRouter(props => {
  const { data } = useQuery<Me>(ME_QUERY)

  const menuItems = [
    { id: '1', to: '/', label: 'Home' },
    ...(data && data.me
      ? [
          { id: '2', to: '/blog/create', label: 'Create' },
          { id: '3', to: '/me', label: 'Me' },
          { id: '4', to: '/logout', label: 'Log Out' },
        ]
      : [
          { id: '5', to: '/register', label: 'Register' },
          { id: '6', to: '/login', label: 'Login' },
        ]),
  ]

  const selectedItem = menuItems.find(
    menuItem => menuItem.to === props.location.pathname
  )
  const selectedIndex = selectedItem ? selectedItem.id : '0'

  return (
    <Header>
      <StyledMenu theme="dark" mode="horizontal" selectedKeys={[selectedIndex]}>
        {menuItems.map(menuItem => (
          <Menu.Item key={menuItem.id}>
            <Link to={menuItem.to}>{menuItem.label}</Link>
          </Menu.Item>
        ))}
      </StyledMenu>
    </Header>
  )
})