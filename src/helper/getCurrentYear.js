import moment from 'moment';

import { fetchDateTime } from "../api/dateTimeApi";

export default async (setState) => {
    const serverDateTime = false || await fetchDateTime();
    setState(serverDateTime ? moment(serverDateTime).year() : '');
};