import axios from 'axios';
import { dateToTimestamp, arrayChoice } from '../utils/utils'

export async function getAllEvents() {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    const response = await axios.get(requestUrl)

    return response.data.events
}