import { Avatar, Group, Stack, Text, Menu } from '@mantine/core'
import { useAtomValue, useSetAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useNavigate } from 'react-router-dom'
import { Logout } from 'tabler-icons-react'
import { currentUserAtom } from '../auth/currentUser'
import { jwtAtom } from '../auth/jwtAtom'

const CurrentUser = () => {
  const currentUser = useAtomValue(currentUserAtom)
  const setJwt = useSetAtom(jwtAtom)
  const navigate = useNavigate()

  const logout = () => {
    setJwt(RESET)
    navigate('/')
  }

  return (
    <Group>
      <Avatar src={currentUser?.avatar.uri}>
        {currentUser?.avatar.image_initials}
      </Avatar>
      <Stack spacing={1}>
        <Text>
          {currentUser?.first_name} {currentUser?.last_name}
        </Text>
        <Text>
          {currentUser?.mail}
        </Text>
      </Stack>
      <Menu aria-label='user action menu' data-tid='user-action-menu'>
        <Menu.Item icon={<Logout />} onClick={logout} data-tid='user-action-menu-logout'>
          Logout
        </Menu.Item>
      </Menu>
    </Group>
  )
}

export default CurrentUser
