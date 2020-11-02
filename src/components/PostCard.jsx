import React,{useContext} from 'react'
import Moment from 'moment'
import {IonCard,IonCardHeader,IonCardContent,IonCardSubtitle,IonCardTitle} from '@ionic/react'

import {AuthContext} from '../context/Auth'

function PostCard({ post: { id, body, createdAt, username, likesCount, commentsCount, likes } }){
    const {user} = useContext(AuthContext)


    return (
        <IonCard href={`/posts/${id}`} routerAnimation>
            <IonCardHeader>
                <IonCardSubtitle>{Moment(createdAt).fromNow()}</IonCardSubtitle>
                <IonCardTitle>{username}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                {body}
            </IonCardContent>
        </IonCard>
    )
}

export default PostCard;