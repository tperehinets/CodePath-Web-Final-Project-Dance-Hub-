import './Edit.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from './client'

export default function Edit(){
    //get the id of a post that's being edited
    const {id} = useParams()

    //get posts data
    const [post, setPost] = useState()
    
    //save data about the post
    const [title, setTitle] = useState()
    const [comment, setComment] = useState()
    const [img, setImg] = useState()


    const getPost= async ()=>{
        const {data} = await supabase
                            .from('posts')
                            .select()
                            .eq("id", id)
                            
        setPost(data[0])
        setTitle(data[0].title)
        setComment(data[0].content)
        setImg(data[0].img)
    }

    //get post's data when the component is rendered
    useEffect(()=>{
        getPost()
    }, [])


    

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
                .eq('id', id);
    
        window.location = `/posts/${id}`;


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