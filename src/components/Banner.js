import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';
import { getTodayEvents } from '../data-contollers/getTodayEvents'
import { capitalizeFirstLetter, timestampToDate } from '../utils/utils';

const Wrapper = styled.div`
    align-self: center;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);

    margin-top: 32px;
    margin-bottom: 16px;
`

const BannerWrapper = styled.div`
    width: 896px;
    height: 448px;

    border-radius: 32px; 
    background-color: #c4c4c4;
`

const BannerImage = styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;

    border-radius: 32px; 
`
const BannerInfo = styled.div`
    display: flex;
    // width: 512px;
    flex-direction: column;

    // background-color: rgba(0, 0, 0, .5);
    background-image: linear-gradient(to right, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0) 70%);

    position: relative;
    bottom: ${props => props.width || '124px'};

    padding-left: 32px;
    padding-bottom: 12px;
`

const BannerTitle = styled.span`
    font-size: 36px;
    font-weight: 700;
    color: #FFFFFF;
`

const BannerText = styled.span`
    display: inline-block;

    font-size: 18px;
    color: #E4E4E4;

    margin-top: 6px;
`

const BANNER_AMOUNT = 5

function Banner() {
    const [bannerList, setBannerList] = useState(null)
    const [bannerIdx, setBannerIdx] = useState(0)
    const didMount = useRef(false);

    useEffect(() => {
        getTodayEvents(BANNER_AMOUNT)
        .then(res => {
            setBannerList(res)
        })
    }, [])

    useEffect(() => {
        if (didMount.current) {
            const bannerInterval = setInterval(() => {
                setBannerIdx(bannerIdx => bannerIdx < BANNER_AMOUNT - 1 ? bannerIdx + 1 : 0)
            }, 5000)

            return () => clearInterval(bannerInterval);
        } else {
            didMount.current = true;
        }
    }, [bannerList])

    const eventEndDateString = (timestamp) => {
        const endDate = timestampToDate(timestamp)

        return `${endDate.getDate()} ${endDate.toLocaleString('ru-RU', { month: 'short' }).replace('.', '')}`
    }

    return (
        <Wrapper>
            {
                bannerList ?
                <BannerWrapper>
                    <BannerImage src={bannerList[bannerIdx].img.url}></BannerImage>
                    <BannerInfo width={bannerList[bannerIdx].title.length > 30 ? "168px" : "124px"}>
                        <BannerTitle>{bannerList[bannerIdx].title}</BannerTitle>
                        <BannerText>{`${capitalizeFirstLetter(bannerList[bannerIdx].category)} · до ${eventEndDateString(bannerList[bannerIdx].endTimestamp)}`}</BannerText>
                    </BannerInfo>
                </BannerWrapper>
                : (<Skeleton width="896px" height="448px" variant="rectangular" sx={{ borderRadius: "32px"}}/>)
            }
        </Wrapper>
    )
}

export default Banner