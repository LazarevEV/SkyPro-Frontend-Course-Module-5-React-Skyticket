import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CatalogCard from './CatalogCard';

const CatalogGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 468px 468px 468px;
    grid-template-rows: 256px 256px 256px;
    column-gap: 18px;
    row-gap: 32px;


    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);

    margin-top: 22px;
    margin-bottom: 32px;
`

function CatalogGrid(props) {
    const cardProps = {
        title: "Вечные",
        cardInfo: "Кино · до 14 авг"
    }

    return (
        <CatalogGridWrapper>
            {props.events.map(event => 
                <CatalogCard key={event._idx} {...event}></CatalogCard>
            )}
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
            <CatalogCard {...cardProps}></CatalogCard>
        </CatalogGridWrapper>
    )
}

export default CatalogGrid

CatalogGrid.propTypes  = {
    events: PropTypes.array,
}