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
    let url = "https://swapi.dev/api/species/"
    const {
        status,
        data:species,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        isFetchingPreviousPage,
        error,
        fetchPreviousPage,
        hasPreviousPage,
      } = useInfiniteQuery({
        queryKey:['projects'],
        queryFn: ({ pageParam = url }) => fetchUrl(pageParam),
        getPreviousPageParam: (firstPage) => firstPage?.previous || undefined,
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        
})

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
                  {status === 'loading'? (<div>loading...</div>) : status === 'error' 
                    ? (<div>error</div>): (
                      <>
                      {species.pages.map((pageData)=> {
                            return pageData?.results.map((data,id)=> (
                              <div key={id}>
                                {data.name}
                              </div>
                            ))

                            })}
                       <h1>INFINITE SCROLL</h1>
                      </>

                    )}
                <button
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                    ? 'Load More'
                    : 'Nothing more to load'}
                </button>
                <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
                
                </main>
            </Container>
    )
}