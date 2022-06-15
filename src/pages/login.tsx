import { LoginForm } from '../features/auth/LoginForm'
import { showNotification } from '@mantine/notifications'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  return (
    <LoginForm
      onLoggedIn={data => {
        navigate('/portal-select')
        showNotification({
          color: 'green',
          message: `Welcome ${data.first_name} ${data.last_name}`,
        })
      }}
      onLoginError={error => {
        showNotification({
          color: 'red',
          message: error.message,
        })
      }}
    />
  )
}

export default LoginPage
