import axios from 'axios';

export const fetchDateTime = async () => {
    try {
        const { data } = await axios.get('https://worldtimeapi.org/api/timezone/America/Panama', { responseType: 'json' });
        return data.utc_datetime;
    } catch (e) {
        console.log('@GET_TIME_API:', e);
    }
};