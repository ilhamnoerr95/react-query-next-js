import {headers} from "Consts/env"

export const fetchGet = async (params)=>{
    const options = {
        method: params.method,
        headers
    }
    const res = await fetch(`/api/detailPost?id=${params.id}`, options)
    const repo = await res.json()
    return repo;
}

export const fetchDelete = async (params)=>{
    const res = await fetch(`/api/detailPost?id=${router.query.id}`, options)
    const repo = await res.json()
    return repo;
}