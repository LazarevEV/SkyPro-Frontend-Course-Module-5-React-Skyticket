import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { generateUUID } from '../utils/utils';
import Skeleton from '@mui/material/Skeleton';
import CatalogCard from './CatalogCard';

const CatalogGridWrapper = styled.div`
    display: grid;
    grid-template-columns: 468px 468px 468px;
    grid-template-rows: 286px 286px 286px;
    column-gap: 18px;
    row-gap: 32px;


    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);

    margin-top: 22px;
    margin-bottom: 32px;
`

const SkeletonCardWrapper = styled.div`
    width: 468px;
    border-radius: 18px; 

    display: flex;
    flex-direction: column;
    gap: 6px;

    // box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, .15); 
`

const PAGE_SIZE = 9 // Num of cards on page

function CatalogGrid(props) {
    const [pageNumber, setPageNumber] = useState(props.currentPage);
    const [eventList, setEventList] = useState(null)
    const [isEmptyEventList, setIsEmptyEventList] = useState(true)
    const pageAmount = Math.ceil(props.events.length / PAGE_SIZE)

    useEffect(() => {
        setEventList(props.events)
    }, [props.events])

    useEffect(() => {
        setPageNumber(props.currentPage)
    }, [props.currentPage])

    return (
        <CatalogGridWrapper>
            {
                (eventList && eventList.length !== 0) ?
                eventList.slice((pageNumber - 1)*PAGE_SIZE, pageNumber*PAGE_SIZE).map(event => 
                    <CatalogCard key={generateUUID()} eventInfo={event}></CatalogCard>
                )
                :
                Array.apply(null, Array(9)).map(event => (
                    <SkeletonCardWrapper key={generateUUID()}>
                        <Skeleton width="468px" height="188px" variant="rectangular" sx={{ borderRadius: "18px"}}/>
                        <Skeleton width="468px" height="36px" variant="rectangular"  sx={{ borderRadius: "8px"}}/>
                        <Skeleton width="468px" height="36px" variant="rectangular"  sx={{ borderRadius: "8px"}}/>
                    </SkeletonCardWrapper>
                ))
            }
        </CatalogGridWrapper>
    )
}

export default CatalogGrid

CatalogGrid.propTypes  = {
    currentPage: PropTypes.number,
    events: PropTypes.array,
}