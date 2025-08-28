import React from 'react'
import logo from '../../assets/bot.png'
import { LogoImg } from './Signin.styles'

export const Logo = () => {
  return (
    <LogoImg>
        <img src={logo} alt='robot'></img>
    </LogoImg>
  )
}
