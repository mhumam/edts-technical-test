/**
 * @author Muhamad Humam
 * @email muhamadhumamm17@gmail.com
 * @create date 2020-08-15 11:41:12
 * @modify date 2020-08-15 11:41:12
 * @desc Base API Request
 */

import axios from 'axios';

export function getRequest(url, callback) {
    axios.get(url).then(async (response) => {
        response = (response.data) ? response.data : null;
        callback(response);
    })
}