import './Post.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from './client'
import { Link } from 'react-router-dom'
import Comment from './Comment'


export default function Post(){
    //get the id
    const {id} = useParams()

    //data of the post
    const [post, setPost] = useState()

    //rerender when the upvotes are added
    const [add, setAdd] = useState(false)

    const getPosts = async() =>{
        const {data} = await supabase
                            .from('posts')
                            .select()
                            .eq("id", id)
                            
        setPost(data[0])
        setTime(data[0].created_at)
    }

    //make API call when the website is rendered
    useEffect(()=>{
        getPosts()
        setAdd(false)
    }, [add])

    
    //get the created X  time ago
    const [time, setTime] = useState()
    const created_at = new Date(time)
    const current_time = new Date()
    const diff = Math.abs(current_time-created_at)
    const diff_minutes = Math.round(diff/60000)

   

    //edit upvotes count
    const addUpvotes= async (event)=>{
        event.preventDefault();
        await supabase
        .from('posts')
        .update({ upvotes:post.upvotes+1})
        .eq('id', id);
        setAdd(true)

    }


    //delete a post
    const deletePost = async (event) =>{
        event.preventDefault()
        await supabase
            .from('posts')
            .delete()
            .eq('id', post.id);
        
        window.location = "/";
    }



    return(
        <div className='Post'>
            <div className='post-container'>
                <p>Posted {post && diff_minutes} minutes ago</p>
                <h1>{post && post.title}</h1>
                {post && post.content && <p>{post.content}</p>}
                {post && post.img && <img src={post.img}/>}
            </div>
            <div className='buttons'>
                <div className='upvotes'>
                    <button onClick={addUpvotes}><img src='https://i.pinimg.com/originals/17/dc/d0/17dcd0573cf56ceefa6ed03b028ded0e.png'/></button>
                    <p>{post && post.upvotes}</p>
                </div>
                <div className='edit-post'>
                    <Link to={`/edit/${id}`}><button><img src='https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f58b.png'/></button></Link>
                    <button onClick={deletePost}><img src='https://static-00.iconduck.com/assets.00/delete-emoji-409x512-y77jpzk2.png'/></button>
                </div>
                
            </div>
            <Comment post_id={id}/>
            

        </div>
    )
}