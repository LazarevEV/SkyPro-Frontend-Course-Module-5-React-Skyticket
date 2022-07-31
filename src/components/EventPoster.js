import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';
import { capitalizeFirstLetter, timestampToDate, eventEndDateString } from '../utils/utils';

const Wrapper = styled.div`
    align-self: center;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);

    margin-bottom: 16px;
`

const PosterWrapper = styled.div`
    width: 100vw;
    height: 512px;

    border-radius: 0px 0px 32px 32px; 
    background-image: url(${props => props.imageUrl});
    background-size: cover;

    position: relative;
`

const PosterInfo = styled.div`
    width: 512px;
    height: 128px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;

    border-radius: 0px 0px 0px 32px; 
    background-image: linear-gradient(to right, rgba(0, 0, 0, .5) 40%, rgba(0, 0, 0, 0) 70%);

    padding-left: max(50% - 720px, 24px);
	padding-right: max(50% - 720px, 24px);
    padding-bottom: 12px;

    position: absolute;
    bottom: 0;
    left: 0;
`

const PosterTitle = styled.span`
    font-size: 46px;
    font-weight: 600;
    color: #FFFFFF;
`

const PosterText = styled.span`
    display: inline-block;

    font-size: 18px;
    color: #E4E4E4;

    margin-top: 6px;
`

function EventPoster(props) {
    const [eventInfo, setEventInfo] = useState(props.eventInfo);

    useEffect(() => {
        setEventInfo(props.eventInfo)
    }, [props.eventInfo])
    
    return (
        <Wrapper>
            <PosterWrapper imageUrl={eventInfo.img.url}>
                <PosterInfo>
                    <PosterTitle>{eventInfo.title}</PosterTitle>
                    <PosterText>{eventInfo.city} · {capitalizeFirstLetter(eventInfo.category)} · до {eventEndDateString(eventInfo.endTimestamp)}</PosterText>
                </PosterInfo>
            </PosterWrapper>
        </Wrapper>
    )
}

export default EventPoster

EventPoster.propTypes  = {
    eventInfo: PropTypes.object,
}