import './Post.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from './client'
import { Link } from 'react-router-dom'
import Comment from './Comment'


export default function Post(){
    const location = useLocation()

    const post = location.state

    const [upvotes, setVotes] = useState(post.upvotes)

    //get the created X ago time
    const created_at = new Date(post.created_at)
    const current_time = new Date()
    const diff = Math.abs(current_time-created_at)
    const diff_minutes = Math.round(diff/60000)

   

    //edit upvotes count
    const addUpvotes= async (event)=>{
        event.preventDefault();
        await supabase
        .from('posts')
        .update({ upvotes:upvotes+1})
        .eq('id', post.id);
        setVotes(upvotes+1)

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
        <div>
            <div className='post-container'>
                <p>Posted {diff_minutes} minutes ago</p>
                <h1>{post.title}</h1>
                {post.content && <p>{post.content}</p>}
                {post.img && <img src={post.img}/>}
            </div>
            <div className='buttons'>
                <div className='upvotes'>
                    <button onClick={addUpvotes}>Upvote</button>
                    <p>{upvotes} upvotes</p>
                </div>
                <div className='edit-post'>
                    <Link to={`/edit/${post.id}`} state={post}><button>Edit</button></Link>
                    <button onClick={deletePost}>Delete</button>
                </div>
            </div>
            <Comment post_id={post.id}/>

        </div>
    )
}