import { GET_ALL_BIKES, GET_SINGLE_BIKE } from '../url_helpers.js'
import baseService from './base-service.js'
const _service = new baseService()

export const getAllBikesService = async () =>{
    const res = await _service.get(GET_ALL_BIKES)
    return res.json()
}
export const getSingleBikeService = async (id) =>{
    const res = await _service.get(`${GET_SINGLE_BIKE}${id}`)
    return res.json()
}
