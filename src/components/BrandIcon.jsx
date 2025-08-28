import React from 'react'
import { LogoImg } from '../features/signin/Signin.styles'
import logo from '../assets/bot.png'

export const BrandIcon = () => {
  return (
        <LogoImg>
            <img src={logo} alt='robot'></img>
        </LogoImg>
  )
}
