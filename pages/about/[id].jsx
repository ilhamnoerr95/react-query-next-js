import Container from "Container/Layout"
import { useRouter } from "next/router"
import { useMutation, useQuery, useInfiniteQuery, } from '@tanstack/react-query'
import styles from '@/styles/Home.module.css'
import {headers} from "Consts/env"
import {fetchGet, fetchDelete,fetchUrl,updatePost} from "Consts/fetch"

import { Button } from "antd"
import InfiniteScroll from "react-infinite-scroll-component"


export default function About(){
    
const router = useRouter()
  const {data:posts, isLoading, isError} = useQuery(
    { 
        queryKey: ['detail-post',router.query.id], 
        queryFn: ()=> fetchGet({id: router.query.id, method: "get"}) 
    })
    
    const deletePost = useMutation({
        mutationKey: [
            "delete-post",
        ],
        mutationFn:(id)=> fetchDelete({id})
    })
    const {
        status,
        data,
        error,
        isFetching,
        isFetchingNextPage,
        isFetchingPreviousPage,
        fetchNextPage,
        fetchPreviousPage,
        hasNextPage,
        hasPreviousPage,
      } = useInfiniteQuery(
        ['projects'],
        async ({ pageParam = 0 }) => { fetchUrl(pageParam)
        },
        {
          getPreviousPageParam: (firstPage) => firstPage.previos ?? undefined,
          getNextPageParam: (lastPage) => lastPage.next ?? undefined,
        },
      )

    return (
            <Container title="About">
                <main className={`${styles.main}`}>
                    <Button onClick={()=> deletePost.mutate(router.query.id)}>Delete</Button>
                    <Button>UPdate</Button>
                    
                    {deletePost.isError && <p style={{color:"red"}}>Cannot delete</p>}
                    {deletePost.isLoading && <p style={{color:"purple"}}>Deleting post..</p>}
                    {deletePost.isSuccess && <p style={{color:"green"}}>Success Delete</p>}

                {isLoading ? (<div>Loading ...</div>) : (
                            <div key={posts.data.id}>
                                <h1>{posts.data.title}</h1>
                                <p>{posts.data.body}</p>
                            </div>
                        
                
                )}
                <br/>
                <div>
                    <h1>INFINITE SCROLL</h1>
                
                </div>
                </main>
            </Container>
    )
}