import {config} from './boardConfig';

export function getApiUrl(queryParams) {
    let apiUrl = '';
    if (config.proxyadress) {
        apiUrl += config.proxyadress;
    }
    if (config.url) {
        apiUrl += config.url;
    }
    queryParams = queryParams || {};
    const qs = Object.entries(queryParams)
        .map(([key, value]) => {
            return `${key}=${value}`;
        })
        .join('&');
    return  `${apiUrl}?apikey=${config.apiKey}&station=${config.mskAirId}&${qs}`;
}

export function getData({event}){
    return fetch(getApiUrl({event}))
        .then(function(response){
            return response.json()
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error.text);
            }
            return data;
        });
}