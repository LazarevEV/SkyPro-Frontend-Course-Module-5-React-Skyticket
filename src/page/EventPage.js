import React from 'react'
import styled from 'styled-components';
import Header from '../components/Header'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`

function EventPage() {
    return (
        <Wrapper>
            <Header />
            <Footer />
        </Wrapper>
    )
}

export default EventPage