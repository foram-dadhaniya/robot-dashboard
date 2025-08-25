import React from 'react'
import { AuthPage, Logo, CustomFormControl, Button } from './Signin.styles'
import logo from '../../assets/bot.png'
import { FloatingLabel, Form } from 'react-bootstrap'

export const SignIn = () => {
  return (
    <AuthPage>
        <Logo>
            <img src={logo} alt='robot'></img>
        </Logo>
        <Form>
            <FloatingLabel label="Email" className='mb-3'>
                <CustomFormControl type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel label="Password" className='mb-4'>
                <CustomFormControl type="password" placeholder="Password" />
            </FloatingLabel>
            <Button type="submit">Sign In</Button>
        </Form>
    </AuthPage>
  )
}
