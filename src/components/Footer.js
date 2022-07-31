import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
    height: 122px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #f0ecec;
    color: #000000;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);
    padding-top: 16px;
    padding-bottom: 16px;

    margin-top: 32px;
`

const FooterBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
`

const FooterBlockHeader = styled.span`
    font-size: 18px;
    font-weight: 700;

    margin-bottom: 4px;
`

const FooterBlockText = styled.span`
    font-size: 14px;
`

const CopyrightLine = styled.span`
    font-size: 10px;
    color: #8A8686;

    margin-top: 32px;
`

export default function Header() {

    return (
        <Footer>
            <FooterBlock>
                <FooterBlockHeader>КОНТАКТЫ</FooterBlockHeader>
                <FooterBlockText>Телефон: 8-800-555-35-35</FooterBlockText>
                <FooterBlockText>Email: help@skyticket.ru</FooterBlockText>
                <CopyrightLine>© 2022-2022 Skyticket LLC</CopyrightLine>
            </FooterBlock>
        </Footer>
    )
}