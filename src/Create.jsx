import './Create.css'
import { supabase } from './client'
import { useState } from 'react'

export default function Create(){
    //save data about the post
    const [title, setTitle] = useState()
    const [comment, setComment] = useState()
    const [img, setImg] = useState()


    //event handlers for the form 
    const handleTitle = (e) =>{
        e.preventDefault()
        setTitle(e.target.value)

    }

    const handleComment = (e) =>{
        e.preventDefault()
        setComment(e.target.value)

    }

    const handleImg = (e) =>{
        e.preventDefault()
        setImg(e.target.value)

    }

    //API call to add post to the database
    const handleSubmit = async (event)=>{
        event.preventDefault();

        await supabase
            .from('posts')
            .insert({title: title, content: comment, img:img})
            .select();

            window.location = "/";


    }


    return(
        <form onSubmit={handleSubmit} className='Create'>
            <input placeholder='Title' value={title} onChange={handleTitle}/>
            <input placeholder='Comment (Optional)' value={comment} onChange={handleComment} className='comment'/>
            <input placeholder='Image url (Optional)' value={img} onChange={handleImg}/>
            <input type="submit" className='submit' value='Create Post'/>

        </form>
    )
}