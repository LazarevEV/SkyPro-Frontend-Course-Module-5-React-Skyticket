import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { getAllEvents } from '../data-contollers/getAllEvents';
import { getFilteredEvents } from '../data-contollers/getFilteredEvents';
import { getCategoryList } from '../data-contollers/getCategoryList';
import { capitalizeFirstLetter, generateUUID, dateToTimestamp } from '../utils/utils';
import CatalogGrid from './CatalogGrid';
import Pagination from '@mui/material/Pagination';
import Skeleton from '@mui/material/Skeleton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

function getTodayDate() {
    const today = new Date().toISOString().slice(0, 10);
    return today
}

const CatalogBodyWrapper = styled.div`
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // margin-bottom: 24px;
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
    // background-color: #F6F6F2;
    background-color: #FFFFFF;

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

    // background-color: #F6F6F2;
    background-color: #FFFFFF;
    border: 1px solid black;
    border-radius: 8px;
`

const CategoryPicker = styled.select`
    height: 34px;
    width: 128px;

    font-size: 16px;
    font-family: Roboto;
    text-align: left;

    // background-color: #F6F6F2;
    background-color: #FFFFFF;
    border: 1px solid black;
    border-radius: 8px;

    padding-left: 8px;
    padding-right: 8px;
`

const SearchInput = styled.input`
    height: 30px;
    width: 384px;

    font-size: 16px;
    font-family: Roboto;
    text-align: left;

    // background-color: #F6F6F2;
    background-color: #FFFFFF;
    border: 1px solid black;
    border-radius: 8px;

    padding-left: 8px;
    padding-right: 8px;
`

const SubmitFilterButton = styled.button`
    width: 128px;
    height: 34px;

    font-size: 18px;
    font-weight: 600;

    background-color: #fae333;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: pointer;
        background-color: #ebd005;
    }

    margin-top: 20px;
    margin-left: 16px;
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
`

const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#000000"
      }
    }
  }));

  const theme = createTheme({
	palette: {
		primary: {
			main: '#f0ecec'
		},
		secondary: {
			main: '#f0ecec'
		}
	}
})

function CatalogBody() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [categoryList, setCategoryList] = useState([])
    const [eventList, setEventList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    const paginationStyles = useStyles()

    const dateStartInputRef = useRef(null);
    const dateEndInputRef = useRef(null);
    const categoryInputRef = useRef(null);
    const searchInputRef = useRef(null);

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

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const applyFitler = () => {
        console.log('> Applying filters...')
        const filters = {
            startTimestamp: dateToTimestamp(dateStartInputRef.current.value) || "",
            endTimestamp: dateToTimestamp(dateEndInputRef.current.value) || "",
            category: categoryInputRef.current.value === 'all' ? "" : categoryInputRef.current.value,
            searchText: searchInputRef.current.value || ""
        }

        setEventList([])

        getFilteredEvents(filters).then(res => {
            setEventList(res)
            console.log(res)
        })
    }

    return (
        <CatalogBodyWrapper>
            <FilterWrapper>
                <FormWrapper>
                    <FormLabel width="24px">От</FormLabel>
                    <DatePickerInput
                        ref={dateStartInputRef}
                        type='date'
                        value={startDate}
                        onChange={(e) => {setStartDate(e.target.valueAsDate.toISOString().slice(0, 10))}}
                    />
                </FormWrapper>
                <FormWrapper marginLeft="4px">
                    <FormLabel width="24px">До</FormLabel>
                    <DatePickerInput
                        ref={dateEndInputRef}
                        type='date'
                        value={endDate}
                        onChange={(e) => {setEndDate(e.target.valueAsDate.toISOString().slice(0, 10))}}
                    />
                </FormWrapper>
                <FormWrapper marginLeft="16px">
                    <FormLabel width="78px">Категория</FormLabel>
                    <CategoryPicker ref={categoryInputRef}>
                        <option value="all">Все</option>
                        {categoryList.map(category => 
                            <option key={generateUUID()} value={category}>{capitalizeFirstLetter(category)}</option>
                        )}
                    </CategoryPicker>
                </FormWrapper>
                <FormWrapper marginLeft="16px">
                    <FormLabel width="48px">Поиск</FormLabel>
                    <SearchInput ref={searchInputRef}></SearchInput>
                </FormWrapper>
                <SubmitFilterButton onClick={applyFitler}>Применить</SubmitFilterButton>
            </FilterWrapper>
            <CatalogGrid events={eventList} currentPage={currentPage}></CatalogGrid>
            <PaginationWrapper>
            {
                (eventList && eventList.length !== 0) ?
                <ThemeProvider theme={theme}>
                    <Pagination
                        count={Math.ceil(eventList.length / 9)}
                        color="primary"
                        classes={{ ul: paginationStyles.ul }}
                        onChange={handleChange}>
                    </Pagination>
                </ThemeProvider>
                :
                <Skeleton width="256px" height="32px" variant="rectangular"  sx={{ borderRadius: "8px"}}/>
            }
            </PaginationWrapper>            
        </CatalogBodyWrapper>
    )
}

export default CatalogBody