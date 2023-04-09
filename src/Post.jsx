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
        <div className='Post'>
            <div className='post-container'>
                <p>Posted {diff_minutes} minutes ago</p>
                <h1>{post.title}</h1>
                {post.content && <p>{post.content}</p>}
                {post.img && <img src={post.img}/>}
            </div>
            <div className='buttons'>
                <div className='upvotes'>
                    <button onClick={addUpvotes}><img src='https://i.pinimg.com/originals/17/dc/d0/17dcd0573cf56ceefa6ed03b028ded0e.png'/></button>
                    <p>{upvotes}</p>
                </div>
                <div className='edit-post'>
                    <Link to={`/edit/${post.id}`} state={post}><button><img src='https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f58b.png'/></button></Link>
                    <button onClick={deletePost}><img src='https://static-00.iconduck.com/assets.00/delete-emoji-409x512-y77jpzk2.png'/></button>
                </div>
                
            </div>
            <Comment post_id={post.id}/>
            

        </div>
    )
}