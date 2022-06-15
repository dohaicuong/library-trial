import { Center, Divider, Stack, Text } from '@mantine/core'
import { useAtomValue } from 'jotai'
import { Go1Logo } from '../logo'
import { currentUserAtom } from '../features/auth/currentUser'
import CurrentUser from '../features/portal_selection/CurrentUser'
import { PortalList, PortalSkeleton } from '../features/portal_selection/PortalList'
import { Suspense } from 'react'

const PortalSelectionPage = () => {
  const currentUser = useAtomValue(currentUserAtom)

  return (
    <Center style={{ marginTop: 64 }}>
      <Stack>
        <Center style={{ margin: '32px 0'}}>
          <Go1Logo />
        </Center>
        <Text size='xl' align='center'>
          Welcome back {currentUser?.first_name}!
        </Text>
        <CurrentUser />
        <Divider />
        <Text>
          Select a portal
        </Text>
        <Suspense fallback={<PortalSkeleton />}>
          <PortalList />
        </Suspense>
      </Stack>
    </Center>
  )
}

export default PortalSelectionPage
