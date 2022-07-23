import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { capitalizeFirstLetter, timestampToDate, eventEndDateString } from '../utils/utils';

const CardWrapper = styled.div`
    width: 468px;

    display: flex;
    flex-direction: column;

    &:hover {
        cursor: pointer;
    }
`

const CardImage = styled.img`
    width: 468px;
    height: 188px;
    border-radius: 18px; 

    object-fit: cover;
    object-position: center top;
`

const CardInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 6px;
    margin-right: 6px;
`

const CardInfoTitle = styled.span`
    width: ${props => props.width || "auto"};
    font-size: 24px;
    font-weight: 700;
    color: #000000;
`

const CardInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const CardInfoText = styled.span`
    display: inline-block;

    font-size: 16px;
    color: #6a6a6a;
`

function CatalogCard(props) {
    return (
        <CardWrapper>
            <CardImage src={props.eventInfo.img.url}></CardImage>
            <CardInfoWrapper>
                <CardInfo>
                    <CardInfoTitle width={"348px"}>{props.eventInfo.title}</CardInfoTitle>
                    <CardInfoTitle width={"108px"}>от 1000 ₽</CardInfoTitle>
                </CardInfo>
                <CardInfoText>{`${capitalizeFirstLetter(props.eventInfo.category)} · до ${eventEndDateString(props.eventInfo.endTimestamp)}`}</CardInfoText>
            </CardInfoWrapper>
        </CardWrapper>
    )
}

export default CatalogCard

CatalogCard.propTypes  = {
    eventInfo: PropTypes.object,
}