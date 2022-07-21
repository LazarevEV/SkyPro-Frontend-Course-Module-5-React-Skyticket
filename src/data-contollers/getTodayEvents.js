import axios from 'axios';
import { dateToTimestamp, arrayChoice } from '../utils/utils'

export function getTodayEvents() {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    axios.get(requestUrl)
        .then(res => {
            const events = res.data.events
            return arrayChoice(events, 5)
        })
}