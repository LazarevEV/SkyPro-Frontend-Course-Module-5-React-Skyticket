import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';
import { getTodayEvents } from '../data-contollers/getTodayEvents'

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

    return (
        <Wrapper>
            <BannerWrapper>
                {/* {bannerList ? console.log(bannerList[bannerIdx].img.url) : 'NONE'} */}
                <BannerImage src="https://donatello-skyticket.s3.eu-north-1.amazonaws.com/1636867133849-ix3cQ1g8grp-m4FE5EK76.jpeg"></BannerImage>
                {/* {bannerList ? (<BannerImage src={bannerList[bannerIdx].img.url}></BannerImage>) : (<Skeleton variant="rectangular"/>)} */}
            </BannerWrapper>
        </Wrapper>
    )
}

export default Banner