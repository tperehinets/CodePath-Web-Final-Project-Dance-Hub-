import './Post.css'

import { useLocation } from 'react-router-dom'

export default function Post(){
    const location = useLocation()

    const post = location.state

    return(
        <div>
            <h1>Post</h1>

        </div>
    )
}