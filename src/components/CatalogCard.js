import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CardWrapper = styled.div`
    width: 468px;

    display: flex;
    flex-direction: column;
`

const CardImage = styled.img`
    width: 468px;
    height: 188px;
    border-radius: 18px; 

    object-fit: cover;
`

const CardInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;

    margin-left: 6px;
    margin-right: 6px;
`

const CardInfoTitle = styled.span`
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
            <CardImage src="https://donatello-skyticket.s3.eu-north-1.amazonaws.com/1636821484633-Q8ys7EFNwOIkiJIh-fgzw.jpeg"></CardImage>
            <CardInfoWrapper>
                <CardInfo>
                    <CardInfoTitle>{props.title}</CardInfoTitle>
                    <CardInfoTitle>от 1000 ₽</CardInfoTitle>
                </CardInfo>
                <CardInfoText>{props.cardInfo}</CardInfoText>
            </CardInfoWrapper>
        </CardWrapper>
    )
}

export default CatalogCard

CatalogCard.propTypes  = {
    title: PropTypes.string,
    cardInfo: PropTypes.string
}