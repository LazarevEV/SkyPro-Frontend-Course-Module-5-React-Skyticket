import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getTodayEvents } from '../data-contollers/getTodayEvents'

const Wrapper = styled.div`

`

const BannerWrapper = styled.img`

`

function Banner() {

    useEffect(() => {
        getTodayEvents()
    })

    return (
        <Wrapper>
            <BannerWrapper></BannerWrapper>
        </Wrapper>
    )
}

export default Banner