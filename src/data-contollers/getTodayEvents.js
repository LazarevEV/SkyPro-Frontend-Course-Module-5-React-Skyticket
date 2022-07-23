import axios from 'axios';
import { dateToTimestamp, arrayChoice } from '../utils/utils'

export async function getTodayEvents(n=5) {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    const response = await axios.get(requestUrl)

    return arrayChoice(response.data.events, n)
}