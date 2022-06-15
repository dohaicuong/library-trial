import { Button, Center, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <Center style={{ height: '100vh' }}>
      <Stack>
        <Text>
          Why are you here?
        </Text>
        <Button component={Link} to='/'>
          Go back!
        </Button>
      </Stack>
    </Center>
  )
}

export default NotFound
