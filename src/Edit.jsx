import './Edit.css'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { supabase } from './client'

export default function Edit(){
    //save a post data the is referred through the link
    const location = useLocation()
    const post = location.state


    //save data about the post
    const [title, setTitle] = useState(post.title)
    const [comment, setComment] = useState(post.content)
    const [img, setImg] = useState(post.img)


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

    //make Update API request when the form is submitted
    const updatePost = async (event) =>{
        event.preventDefault()

        await supabase
                .from('posts')
                .update({ title: title, content:comment, img:img})
                .eq('id', post.id);
    
        window.location = `/`;


    }


    return(
        
            <form onSubmit={updatePost} className='Edit'>
                <input placeholder='Title' value={title} onChange={handleTitle}/>
                <input placeholder='Comment (Optional)' value={comment} onChange={handleComment} className='comment'/>
                <input placeholder='Image url (Optional)' value={img} onChange={handleImg}/>
                <input type="submit" className='submit' value='Update Post'/>
            </form>

       
    )
}