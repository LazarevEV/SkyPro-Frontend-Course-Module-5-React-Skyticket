import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllEvents } from '../data-contollers/getAllEvents';
import { getCategoryList } from '../data-contollers/getCategoryList';
import { capitalizeFirstLetter, generateUUID } from '../utils/utils';
import CatalogGrid from './CatalogGrid';

function getTodayDate() {
    const today = new Date().toISOString().slice(0, 10);
    return today
}

const CatalogBodyWrapper = styled.div`
`

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    // gap: 0px;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0px;
    margin-left: ${props => props.marginLeft};
`

const FormLabel = styled.span`
    display: inline-block;
    width: ${props => props.width};

    text-align: center;
    background-color: #F6F6F2;

    position: relative;
    top: 8px;
    left: 12px;
`

const DatePickerInput = styled.input`
    height: 32px;
    width: 128px;

    font-size: 16px;
    font-family: Roboto;
    text-align: center;

    background-color: #F6F6F2;
    border: 1px solid black;
    border-radius: 8px;
`

const CategoryPicker = styled.select`
    height: 34px;
    width: 128px;

    font-size: 16px;
    font-family: Roboto;
    text-align: left;

    background-color: #F6F6F2;
    border: 1px solid black;
    border-radius: 8px;

    padding-left: 8px;
    padding-right: 8px;
`


function CatalogBody() {
    const [startDate, setStartDate] = useState(getTodayDate());
    const [endDate, setEndDate] = useState(getTodayDate());
    const [categoryList, setCategoryList] = useState([])
    const [eventList, setEventList] = useState([])

    useEffect(() => {
        getCategoryList().then(res => {
            setCategoryList(res)
        })
    }, [])

    useEffect(() => {
        getAllEvents().then(res => {
            setEventList(res)
        })
    }, [])

    return (
        <CatalogBodyWrapper>
            <FilterWrapper>
                <FormWrapper>
                    <FormLabel width="42px">From</FormLabel>
                    <DatePickerInput
                        type='date'
                        value={startDate}
                        onChange={(e) => {setStartDate(e.target.valueAsDate.toISOString().slice(0, 10))}}
                    />
                </FormWrapper>
                <FormWrapper marginLeft="4px">
                    <FormLabel width="22px">To</FormLabel>
                    <DatePickerInput
                        type='date'
                        value={endDate}
                        onChange={(e) => {setEndDate(e.target.valueAsDate.toISOString().slice(0, 10))}}
                    />
                </FormWrapper>
                <FormWrapper marginLeft="16px">
                    <FormLabel width="72px">Category</FormLabel>
                    <CategoryPicker>
                        <option value="all">Все</option>
                        {categoryList.map(category => 
                            <option key={generateUUID()} value={category}>{capitalizeFirstLetter(category)}</option>
                        )}
                    </CategoryPicker>
                </FormWrapper>
            </FilterWrapper>
            <CatalogGrid events={eventList}></CatalogGrid>
        </CatalogBodyWrapper>
    )
}

export default CatalogBody