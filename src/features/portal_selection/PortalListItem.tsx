import { Avatar, Group, Paper, UnstyledButton, Text } from '@mantine/core'
import { useAtom, useAtomValue } from 'jotai'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { Go1Logo } from '../../logo'
import { jwtAtom } from '../auth/jwtAtom'
import { useExchangeJwtMutation } from './useExchangeJwtMutation'

type PortalListItemProps = {
  name: string
  url: string
  logo?: string
}

const PortalListItem: React.FC<PortalListItemProps> = ({
  name,
  url,
  logo,
}) => {
  const navigate = useNavigate()
  const exchangeMutation = useExchangeJwtMutation()
  const exchangeJwt = () => {
    exchangeMutation.mutate({ portal: url })
    navigate('/home')
  }

  return (
    <UnstyledButton
      onClick={exchangeJwt}
      data-tid='portal-select-button'
      aria-label={`Select portal ${name}`}
    >
      <Paper withBorder p='sm'>
        <Group>
          {logo ? <Avatar src={logo} alt={name} /> : <Go1Logo />}
          <div>
            <Text>{name}</Text>
            <Text size='xs' color='gray'>{url}</Text>
          </div>
        </Group>
      </Paper>
    </UnstyledButton>
  )
}

export default PortalListItem
