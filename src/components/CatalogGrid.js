import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CatalogCard from './CatalogCard';

const CatalogGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 468px 468px 468px;
    grid-template-rows: 274px 274px 274px;
    column-gap: 18px;
    row-gap: 32px;


    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);

    margin-top: 22px;
    margin-bottom: 32px;
`

const PAGE_SIZE = 9 // Num of cards on page

function CatalogGrid(props) {
    const [pageNumber, setPageNumber] = useState(1);
    const pageAmount = Math.ceil(props.events.length / PAGE_SIZE)


    return (
        <CatalogGridWrapper>
            {props.events.slice((pageNumber - 1)*PAGE_SIZE, pageNumber*PAGE_SIZE).map(event => 
                <CatalogCard key={event._idx} eventInfo={event}></CatalogCard>
            )}
        </CatalogGridWrapper>
    )
}

export default CatalogGrid

CatalogGrid.propTypes  = {
    events: PropTypes.array,
}