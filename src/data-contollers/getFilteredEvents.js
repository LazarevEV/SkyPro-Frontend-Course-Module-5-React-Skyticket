import axios from 'axios';
import { dateToTimestamp, arrayChoice } from '../utils/utils'

export async function getFilteredEvents(filterDict) {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    const response = await axios.get(requestUrl)

    let resEvents = response.data.events
    console.log(`> Unfiltered: ${resEvents}`)
    // Date From
    if (filterDict.startTimestamp !== "") {
        console.log('>>> DATE FROM - Applying filter...')
        resEvents = resEvents.filter(event => { return event.startTimestamp / 1000 >= filterDict.startTimestamp})
    }
    console.log(`> Date From: ${resEvents}`)
    // Date To
    if (filterDict.endTimestamp !== "") {
        console.log('>>> DATE TO - Applying filter...')
        resEvents = resEvents.filter(event => { return event.startTimestamp / 1000 <= filterDict.endTimestamp})
    }
    console.log(`> Date To: ${resEvents}`)
    // Category
    if (filterDict.category !== "") {
        console.log('>>> CATEGORY - Applying filter...')
        resEvents = resEvents.filter(event => { return event.category.toLowerCase() == filterDict.category.toLowerCase()})
    }
    console.log(`> Category: ${resEvents}`)
    // Search Text
    if (filterDict.searchText !== "") {
        console.log('>>> CATEGORY - Applying filter...')
        resEvents = resEvents.filter(event => { return (event.title.toLowerCase() == filterDict.searchText.toLowerCase()) || (event.title.toLowerCase().includes(filterDict.searchText.toLowerCase()))})
    }
    console.log(`> Category: ${resEvents}`)


    return resEvents
}