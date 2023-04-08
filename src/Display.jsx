import './Display.css'
import { supabase } from './client'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Display(){
    //posts that will be displayed
    const [posts, setPosts] = useState()

    //make an API request to get posts from database
    const getPosts = async() =>{
        const {data} = await supabase
                            .from('posts')
                            .select()
                            .order('created_at', { ascending: true }) //make a filter here

        setPosts(data)
        console.log(posts)
    }

    //call the API once the page is rendered
    useEffect(()=>{
        getPosts()
    }, [])

    //get the information when the post was postes
    const now = Date.now()


    return(
        <div>
            <div className='posts-container'>
                
                    {posts?.map((post) => {
                        return(
                            <div className='mini-container'>
                                <Link to={`/posts/${post.id}`} state={post} >
                                <p>Posted {post.created_at-now} minutes ago</p>
                                <h1>{post.name}</h1>
                                <p>{post.upvotes}</p>
                                </Link>
                            </div>
                        )
                    })}
                

            </div>

        </div>
          
    )

}
