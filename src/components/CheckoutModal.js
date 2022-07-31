import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';
import { QRCodeSVG } from 'qrcode.react';


const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ModalWrapperInner = styled.div`
    width: 512px;
    max-height: 720px;
    display: flex;
    flex-direction: column;
    gap: 24px;

    background-color: #FFFFFF;
    border-radius: 32px;
    box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, .5);

    margin: 32px;
    padding: 24px;
`

const TicketInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`

const TicketInfoHeader = styled.span`
    line-height: 36px;
    font-size: 36px;
    font-weight: 600;
    color: #000000;
`

const TicketInfoText = styled.span`
    display: inline-block;
    
    font-size: 18px;
    color: #8A8686;
`

const QRWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    // margin-top: 32px;
    margin: auto;
`

function CheckoutModal(props) {
    return (
        <ModalWrapper>
            <ModalWrapperInner>
                <TicketInfo>
                    <TicketInfoHeader>{props.name}</TicketInfoHeader>
                    <TicketInfoText>{props.email}</TicketInfoText>
                </TicketInfo>
                <TicketInfo>
                    <TicketInfoHeader>{props.eventInfo.title} · {props.ticketAmount} шт.</TicketInfoHeader>
                    <TicketInfoText>Кино · до 25 янв · Екатеринбург</TicketInfoText>
                </TicketInfo>
                <QRWrapper>
                    <QRCodeSVG
                        value="https://reactjs.org/"
                        size="364"
                    />
                </QRWrapper>
            </ModalWrapperInner>
        </ModalWrapper>
    )
}

function mapStateToProps(state) {
    return {
        status: state.login.status,
        name: state.login.name,
        email: state.login.email,
    }
}

export default connect(mapStateToProps)(CheckoutModal)

CheckoutModal.propTypes  = {
    eventInfo: PropTypes.object,
    ticketAmount: PropTypes.number,
    status: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
}