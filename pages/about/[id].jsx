import Container from "Container/Layout"
import { useRouter } from "next/router"
import { useQuery } from '@tanstack/react-query'
import styles from '@/styles/Home.module.css'
import {headers} from "Consts/env"
import {fetchGet} from "Consts/fetch"

import { Button } from "antd"


export default function About(){
    
const router = useRouter()
  const {data:posts, isLoading, isError} = useQuery(
    { 
        queryKey: ['detail-post',router.query.id], 
        queryFn: ()=> fetchGet({id: router.query.id, method: "get"}) 
    })
    
    
    return (
            <Container title="About">
                <main className={`${styles.main}`}>
                    <Button>Delete</Button>
                    <Button>UPdate</Button>

                {isLoading ? (<div>Loading ...</div>) : (
                            <div key={posts.data.id}>
                                <h1>{posts.data.title}</h1>
                                <p>{posts.data.body}</p>
                            </div>
                        
                
                )}
                </main>
            </Container>
    )
}