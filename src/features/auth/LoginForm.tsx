import { Button, Center, Paper, Stack, Text, TextInput } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'

import { LoginError, LoginInput, loginInputSchema, LoginPayload, useLoginMutation } from './useLoginMutation'
import { Go1Logo } from '../../logo'

type LoginFormProps = {
  onLoggedIn?: (data: LoginPayload) => void
  onLoginError?: (error: Error | LoginError) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoggedIn, onLoginError }) => {
  const form = useForm<LoginInput>({
    schema: yupResolver(loginInputSchema),
    initialValues: {
      email: '',
      password: '',
    },
  })

  const mutation = useLoginMutation()
  const onLogin = async (values: LoginInput) => {
    mutation.mutate(values, {
      onSuccess: onLoggedIn,
      onError: onLoginError,
    })
  }

  return (
    <form onSubmit={form.onSubmit(onLogin)} data-tid='login-form'>
      <Center style={{ width: '100vw', height: '100vh' }}>
        <Paper shadow='xs' p='md' withBorder>
          <Stack>
            <Center>
              <Go1Logo />
            </Center>
            <Text align='center' size='xl'>
              Log in to Go1
            </Text>
            <TextInput
              label='Email'
              data-tid='email-field'
              {...form.getInputProps('email')}
            />
            <TextInput
              label='Password'
              type='password'
              data-tid='password-field'
              {...form.getInputProps('password')}
            />
            <Button type='submit' data-tid='login-button'>
              Login
            </Button>
          </Stack>
        </Paper>
      </Center>
    </form>
  )
}
