import React from 'react'
import styled from 'styled-components';
import Header from '../components/Header'
import Banner from '../components/Banner'
import CatalogBody from '../components/CatalogBody'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function MainPage() {
    return (
        <Wrapper>
            <Header />
            <Banner />
            <CatalogBody />
            <Footer />
        </Wrapper>
    )
}

export default MainPage