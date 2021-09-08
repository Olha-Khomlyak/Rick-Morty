import axios from 'axios';

import {
    EPISODE_LIST,
    EPISODE_DETAILS,
    CHARACTER_LIST,
    CLEAN_CHARACTER_LIST
} from './type';

export const getEpisodes = (page) => (dispatch) => {
    return new Promise(async(resolve, reject) => {
        dispatch(clearCharacterList())
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
export const getEpisodeInfo = (episode) => (dispatch) => {
    return new Promise(async(resolve, reject) => {
        axios(
            {
                method: 'get',
                url: episode,
            })

            .then((response) => {
                console.log('getEpisodeInfo===', response);
                dispatch({
                   type: EPISODE_DETAILS,
                   payload: response.data
               }) 
                response.data.characters.forEach(element => {
                    dispatch(getCharacterList(element))
                });
                resolve()
            })
            .catch((error) => {
                alert(error)
            });
    })
}

export const getCharacterList = (character) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        axios(
            {
                method: 'get',
                url: character,
            })

            .then((response) => {
                console.log('getCharacterList===', response);
                 dispatch({
                     type: CHARACTER_LIST,
                     payload: response.data
                 }) 
                resolve()
            })
            .catch((error) => {
                alert(error)
            });
    })
}

const clearCharacterList = (character) => (dispatch) => {
    dispatch({
        type: CLEAN_CHARACTER_LIST,
        payload: []
    })
}