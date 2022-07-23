import axios from 'axios';

export async function getCategoryList() {
    const requestUrl = 'https://donatello-skyticket-backend.herokuapp.com/events'
    const response = await axios.get(requestUrl)
    
    return [...new Set(response.data.events.map(event => event.category))]
}