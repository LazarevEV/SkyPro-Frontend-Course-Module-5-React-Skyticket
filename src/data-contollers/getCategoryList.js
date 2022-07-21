import axios from 'axios';

export function getCategoryList() {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    axios.get(requestUrl)
        .then(res => {
            const events = res.data.events
            return [...new Set(events.map(event => event.category))]
        })
}