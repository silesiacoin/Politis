import React, { ReactElement } from 'react'
import CurrUserData from '../molecules/currUserData'

export default function Header(): ReactElement {
    return (
        <header className="header">
            <CurrUserData />
        </header>
    )
}
