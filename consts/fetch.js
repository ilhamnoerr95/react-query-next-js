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
    
    const res = await fetch(`/api/deletePost?id=${params.id}`, {method: "delete"})
    const repo = await res.json()
    return repo;
}

export const updatePost = async (params)=> {
    const options = {
        method: 'PATCH',
      }
      console.log(params)
    const result = await fetch("https://jsonplaceholder.typicode.com/postId/" + params.id, options)
      return result.json()
}

export const fetchUrl = async (params)=> {
    // const url = `https://swapi.dev/api/species/?page=${params}`
    const response = await fetch(params)
    return response.json()
}