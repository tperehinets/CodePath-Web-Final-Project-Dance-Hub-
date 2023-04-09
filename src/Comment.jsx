import './Comment.css'
import { supabase } from './client'
import { useState, useEffect } from 'react'


export default function Comment(props){
        //comments section to create new comment
        const [comment, setComment] = useState('')


        //save the id of the post that will be related to this comment
        const post_id = props.post_id

        //get posts
        const [comments, setComments] = useState()
        const getComments = async()=>{
            const {data} = await supabase
                                .from('comments')
                                .select()
                                .order('created_at', { ascending: true })
                                .eq('post_id', post_id);

            // set state of posts
            setComments(data);
            
        }


        //change comment with a form
        const handleComment = async (event) =>{
            event.preventDefault()
            //submit comment with Enter API
            if(event.code === "Enter" || event.code === "NumpadEnter"){
                await supabase
                    .from('comments')
                    .insert({post_id:post_id, text:comment})
                    .select();

                    window.location('/')

                //get all comments again
                getComments()
    
            }else{
                setComment(event.target.value)
            }
    
        }

        useEffect(()=>{
            getComments()
        }, [])


    return(
        <div className='Comment'>
            <div className='comments-container'>
                <form>
                    <input type='text' placeholder='Leave a comment....' value={comment} onChange={handleComment}/>
                </form>
                {comments?.map((com)=>{
                    return(
                        <div className='comment-container'>{com.text}</div>
                    )
                })}
            </div>
        </div>
    )
}