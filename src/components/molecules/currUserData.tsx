import React from 'react'
import LogoIcon from '../atoms/logoIcon'
import UserNameDiv from '../atoms/userNameDiv'

export default function CurrUserData() {
    return (
        <div className="header__user">
            <LogoIcon />
            <UserNameDiv classes="user__name">0xboilerplate</UserNameDiv>
        </div>
    )
}
