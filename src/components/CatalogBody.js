import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getCategoryList } from '../data-contollers/getCategoryList';
import { capitalizeFirstLetter } from '../utils/utils';

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
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: 4px;
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
    const [categoryList, setCategoryList] = useState(null)

    useEffect(() => {
        console.log(getCategoryList())
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
                <FormWrapper>
                    <FormLabel width="22px">To</FormLabel>
                    <DatePickerInput
                        type='date'
                        value={endDate}
                        onChange={(e) => {setEndDate(e.target.valueAsDate.toISOString().slice(0, 10))}}
                    />
                </FormWrapper>
                <FormWrapper>
                    <FormLabel width="72px">Category</FormLabel>
                    <CategoryPicker>
                        {categoryList?.map(category => {
                            <option value={category}>{capitalizeFirstLetter(category)}</option>
                        })}
                        {/* <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option> */}
                    </CategoryPicker>
                </FormWrapper>
            </FilterWrapper>
        </CatalogBodyWrapper>
    )
}

export default CatalogBody