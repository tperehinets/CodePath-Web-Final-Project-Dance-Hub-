import './Display.css'
import { supabase } from './client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Display(props){
    //search a post by its name
    const search = props.search
   

    //posts that will be displayed
    const [posts, setPosts] = useState()

    //make an API request to get posts from database
    const getPosts = async() =>{
        const {data} = await supabase
                            .from('posts')
                            .select()
                            .order(order, { ascending: false }) 
                            
        setPosts(data)
        console.log(posts)
    }

    //call the API once the page is rendered
    useEffect(()=>{
        getPosts()
    }, [])

    //order result
    const [order, setOrder] = useState('created_at')

    const mostPopular = (e)=>{
        e.preventDefault()
        setOrder('upvotes')
      

    }

    const createdAt = (e)=>{
        e.preventDefault()
        setOrder('created_at')
     

    }

     //call the API to show posts in another order
     useEffect(()=>{
        getPosts()
    }, [order])



    return(
        <div>
            <div className='order-container'>
                <p>Order by:</p>
                <button onClick={createdAt}>Newest</button>
                <button onClick={mostPopular}>Most Popular</button>
            </div>
            <div className='posts-container'>
                
                    {posts?.map((post) => {
                        if(post.title.includes(search)){
                        return(
                            <div className='mini-container'>
                                <Link to={`/posts/${post.id}`} state={post} >
                                <p>Posted {Math.round(Math.abs(new Date()-new Date(post.created_at))/60000)} minutes ago</p>
                                <h1>{post.title}</h1>
                                <p>{post.upvotes}</p>
                                </Link>
                            </div>
                        )}
                    })}
                

            </div>

        </div>
          
    )

}
