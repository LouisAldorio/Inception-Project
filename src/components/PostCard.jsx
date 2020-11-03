import React,{useContext} from 'react'
import Moment from 'moment'
import {IonCard,IonCardHeader,IonCardContent,IonCardSubtitle,IonCardTitle} from '@ionic/react'

import LikePost from './LikePost'
import {AuthContext} from '../context/Auth'

function PostCard({ post: { id, body, createdAt, username, likesCount, commentsCount, likes } }){
    const {user} = useContext(AuthContext)


    return (

        
        <IonCard routerAnimation>
            <IonCardContent href={`/posts/${id}`} >
                <IonCardHeader>
                    <IonCardSubtitle>{Moment(createdAt).fromNow()}</IonCardSubtitle>
                    <IonCardTitle>{username}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    {body}
                </IonCardContent>
            </IonCardContent>
            <IonCardContent>
                <LikePost user={user} post={{id,likes,likesCount}}/>
            </IonCardContent> 
        </IonCard>
    )
}

export default PostCard;