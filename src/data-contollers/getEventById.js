import axios from 'axios';
import { dateToTimestamp, arrayChoice } from '../utils/utils'

export async function getEventById(eventId) {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    const response = await axios.get(requestUrl)

    return response.data.events.filter((event) => {
        return event._id === eventId
    })[0]
}