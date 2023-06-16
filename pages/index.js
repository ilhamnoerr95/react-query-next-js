import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Container from "Container/Layout"
import { useQuery,QueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { Button, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const fetchPost = async (pageNumber)=> {
  const res = await fetch(`/api/hello?page=${pageNumber}`)
  const repo = await res.json()
  return repo;
}

export default function Home({repo}) {
  const router = useRouter()
  const queryClient = new QueryClient()

  const [currentPage, setCurrentPage] = useState(1)

  const {data:posts, isLoading} = useQuery({ 
    queryKey: ['posts-data', currentPage], 
    queryFn: ()=> fetchPost(currentPage),
    staleTime: 2000,
    keepPreviousData : true 
  })

  const routerHandler = (type)=> {
    
    router.query.page = type === "prev" ? currentPage - 1: currentPage + 1
    router.push({pathname: "/", query: {...router.query},})
  }

  useEffect(()=> {
    if(currentPage < 10){
      const nextData = currentPage + 1
      // prefetct berguna untuk menyimpan data baru kedalam cache
      queryClient.prefetchQuery({
        queryKey: ['data'],
        queryFn: ()=> fetchPost(nextData),
        
      })
    }

  }, [currentPage, queryClient])

  const prev = ()=>{
    setCurrentPage(currentPage-1)
    routerHandler("prev")

  }
  const next = ()=>{
      setCurrentPage(currentPage+1)
      routerHandler()
    }
  return (
    <>
      <Container title="Home">
          <main className={`${styles.main} ${inter.className}`}>
            {isLoading ? (<div>Loading...</div>) : (
             posts?.data?.map(post=> (
              <ul key={post.id}>
                  <li>
                    <Link href={`/about/${post.id}`}>{post.title}</Link></li>
              </ul>
            ))   
            ) }
            <Space style={{marginTop:"1rem"}}>

            <Button disabled={currentPage <= 1} onClick={prev}>Previous</Button>
            <span>{currentPage }</span>
            <Button disabled={currentPage >= 10} onClick={next}>Next</Button>
            </Space>

          </main>
      </Container>
    </>
  )
}
