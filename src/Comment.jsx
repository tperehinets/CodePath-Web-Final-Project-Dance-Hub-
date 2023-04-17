import './Comment.css'
import { supabase } from './client'
import { useState, useEffect } from 'react'


export default function Comment(props){
        //comments section to create new comment
        const [comment, setComment] = useState('')

        // if submit a new comment
        const [submit, setSubmit] = useState(false)


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
        const handleComment = (event) =>{
            event.preventDefault()            
            setComment(event.target.value)
    
        }

        const onSubmit = async (event)=>{
            event.preventDefault()
            console.log("Submitting comment")
            await supabase
                .from('comments')
                .insert({post_id:post_id, text:comment})
                .select();

            setSubmit(true)

        }

        useEffect(()=>{
            getComments()
            setSubmit(false)
        }, [submit])


    return(
        <div className='Comment'>
            <div className='comments-container'>
                <form onSubmit={onSubmit}>
                    <input type='text' placeholder='Leave a comment....' value={comment} onChange={handleComment}/>
                    <input type='submit'/>
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