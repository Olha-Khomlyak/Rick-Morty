import axios from 'axios';


import {
    EPISODE_LIST
} from './type';

export const getEpisodes = (page) => (dispatch) => {
    return new Promise(async(resolve, reject) => {
        axios(
            {
                method: 'get',
                url: 'https://rickandmortyapi.com/api/episode',
                data: {
                    page: page
                }
            })

            .then((response) => {
                console.log('getEpisodes===', response);
                //let list = JSON.parse(response.data.results)
                dispatch({
                    type: EPISODE_LIST,
                    payload: response.data.results
                })
                resolve()
            })
            .catch((error) => {
                alert(error)
            });
    })
}