import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Skeleton from '@mui/material/Skeleton';
import Header from '../components/Header'
import Footer from '../components/Footer'
import EventPoster from '../components/EventPoster'
import { getEventById } from '../data-contollers/getEventById';
import { modal } from 'react-modal-dom';
import CheckoutModal from '../components/CheckoutModal';
import LoginPassModal from '../components/LoginPassModal'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const EventDescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;

    margin-left: max(50% - 720px, 24px);
	margin-right: max(50% - 720px, 24px);

    @media (max-width: 1392px) {
        margin-left: 24px;
	    margin-right: 24px;
    }
`

const TextHeader = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: #000000;

    margin-bottom: 8px;
`

const TextNormal = styled.span`
    width: ${props => props.width || "70%"};
    font-size: 18px;
    font-weight: 400;
    color: #000000;
`

const TextMoreButton = styled.button`
    height: 20px;
    background: none;
    border: none;
    align-self: flex-start;

    font-size: 18px;
    text-align: center;
    color: ${props => props.color || "#000000"};

    padding: 0;
    margin: ${props => props.margin || "auto"};

    &:hover {
        cursor: pointer;
    }

    &:focus {
        outline: 0 !important;
    }

    &:disabled {
        cursor: auto;
        color: #C0C0C0;
    }
`

const BuyButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 32px;

    margin-top: 24px;
`

const BuyButton = styled.button`
    width: 128px;
    height: 42px;

    font-size: 24px;
    font-weight: 600;

    background-color: #fae333;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: pointer;
    }
`

const BuyButtonLong = styled.div`
    width: 128px;
    height: 42px;
    display: flex;
    justify-content: space-between;

    line-height: 42px;
    font-size: 24px;
    font-weight: 600;

    background-color: #fae333;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: pointer;
    }
`

const BBLongIncrease = styled.button`
    width: 42px;
    height: 42px;

    line-height: 24px;
    font-size: 24px;
    font-weight: 600;

    background: none;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: pointer;
    }
`

const BBLongDecrease = styled.button`
    width: 42px;
    height: 42px;

    line-height: 24px;
    font-size: 24px;
    font-weight: 600;

    background: none;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: "pointer";
    }
`

const DESCRIPTION_LIMIT = 256

function EventPage(props) {
    const eventDescription = 'В базе мероприятий нет их описания. '.repeat(30)
    const price = 1000
    
    const { eventId } = useParams()
    const [ eventInfo, setEventInfo] = useState({})
    const [ isShowedMore, setIsShowedMore] = useState(false)
    const [ descriptionToShow, setDescriptionToShow] = useState(eventDescription.length >= DESCRIPTION_LIMIT ? eventDescription.slice(0, DESCRIPTION_LIMIT) + '...' : eventDescription)
    const [ ticketAmount, setTicketAmount] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        getEventById(eventId)
        .then(res => {
            setEventInfo(res)
        })
    }, [])

    const showMore = () => {
        setIsShowedMore(!isShowedMore)
        setDescriptionToShow(eventDescription)
    }

    const increaseTicketAmount = () => {
        setTicketAmount(ticketAmount + 1)
    }

    const decreaseTicketAmount = () => {
        setTicketAmount(ticketAmount - 1)
    }
    
    const openCheckoutModal = () => {
        console.log('> Open checkout modal')
        if (props.status) {
            modal.open(<CheckoutModal eventInfo={eventInfo} ticketAmount={ticketAmount} />)
        } else {
            const additionalProps = {
                navToCheckout: true,
                eventInfo: eventInfo,
                ticketAmount: ticketAmount,
            }
            modal.open(<LoginPassModal additionalProps={additionalProps}/>)
        }
    }

    return (
        <Wrapper>
            <Header />
            {
                Object.keys(eventInfo).length !== 0
                ? <EventPoster eventInfo={eventInfo}></EventPoster>
                : <Skeleton width="100vw" height="512px" variant="rectangular" sx={{ borderRadius: "0px 0px 0px 32px"}}/>
            }
            {
                Object.keys(eventInfo).length !== 0
                ?
                <EventDescriptionWrapper>
                    <TextHeader>О мероприятии</TextHeader>
                    <TextNormal>
                        {descriptionToShow}
                    </TextNormal>
                    {
                        (eventDescription.length >= DESCRIPTION_LIMIT && !isShowedMore) && <TextMoreButton margin={"0"} color={"#2596be"} onClick={showMore}>Раскрыть</TextMoreButton>
                    }
                    <BuyButtonWrapper>
                        {
                            ticketAmount === 0
                            ? <BuyButton onClick={increaseTicketAmount}>{price} ₽</BuyButton>
                            :
                            <BuyButtonLong>
                                <BBLongDecrease onClick={decreaseTicketAmount}>−</BBLongDecrease>
                                {ticketAmount}
                                <BBLongIncrease onClick={increaseTicketAmount}>＋</BBLongIncrease>
                            </BuyButtonLong>
                        }
                        <TextMoreButton onClick={openCheckoutModal} disabled={ticketAmount === 0 ? true : false}>Оформить</TextMoreButton> 
                    </BuyButtonWrapper>
                </EventDescriptionWrapper>
                : <Skeleton width="100vw" height="512px" variant="rectangular" sx={{ borderRadius: "0px 0px 0px 32px"}}/>
            }
            <Footer />
        </Wrapper>
    )
}

function mapStateToProps(state) {
    return {
        status: state.login.status,
        name: state.login.name,
        email: state.login.email,
    }
}

export default connect(mapStateToProps)(EventPage)

EventPage.propTypes  = {
    match: PropTypes.object,
    status: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
}