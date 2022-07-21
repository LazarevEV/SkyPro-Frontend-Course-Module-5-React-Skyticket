import React from 'react'
import styled from 'styled-components'

import LogoSrc from '../assets/skyticket-logo.png'
import ProfileIconSrc from '../assets/profile-icon.png'

const MenuBar = styled.div`
    height: 78px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;

    background-color: #6FB3B8;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);
`

const LogoImg = styled.img`
    height: 58px;

    &:hover {
        cursor: pointer;
    }
`

const ProfileButton = styled.button`
    height: 78px;
    width: 78px;

    background: none;
    border: none;

    &:hover {
        cursor: pointer;
    }
`

export default function Header() {
    function logoClick() {
        console.log('Logo Clicked!')
    }

    return (
        <MenuBar>
            <LogoImg src={LogoSrc} onClick={logoClick} alt="Skyticket Logo"></LogoImg>
            <ProfileButton>
                <img src={ProfileIconSrc} alt="User Profile Icon"></img>
            </ProfileButton>
        </MenuBar>
    )
}