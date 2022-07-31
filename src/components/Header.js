import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { modal } from 'react-modal-dom';

import LogoSrc from '../assets/skyticket-logo.png'
import NonLoggedProfileIconSrc from '../assets/profile-icon-non-logged.png'
import LoggedProfileIconSrc from '../assets/profile-icon-logged.png'
import { Tooltip } from '@mui/material'
import LoginPassModal from './LoginPassModal';

const MenuBar = styled.div`
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 64px;

    // background-color: #6FB3B8;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);
`

const LogoImg = styled.img`
    height: 48px;

    &:hover {
        cursor: pointer;
    }
`

const ProfileButton = styled.button`
    height: 48px;
    width: 48px;

    background: none;
    background-image: url(${props => props.imageSrc});
    background-size: cover;
    border: none;

    padding: 0;

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: 0 !important;
    }
`

function Header(props) {
    const navigate = useNavigate()

    const logoClick = () => {
        navigate(`/events`, {replace: true})
    }

    const loginHandle = () => {
        if (!props.status) {
            console.log('Не авторизирован')
            modal.open(<LoginPassModal />)
        }
    }

    return (
        <MenuBar>
            <LogoImg src={LogoSrc} onClick={logoClick} alt="Skyticket Logo"></LogoImg>
            <Tooltip title={props.status ? props.name : "Не авторизирван"} arrow>
                <ProfileButton imageSrc={props.status ? LoggedProfileIconSrc : NonLoggedProfileIconSrc} onClick={loginHandle}></ProfileButton>
            </Tooltip>
        </MenuBar>
    )
}


function mapStateToProps(state) {
    return {
        status: state.login.status,
        name: state.login.name,
    }
}

export default connect(mapStateToProps)(Header)

Header.propTypes  = {
    status: PropTypes.bool,
    name: PropTypes.string,
}