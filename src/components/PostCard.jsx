import React,{useContext} from 'react'
import Moment from 'moment'
import {IonCard,IonCardHeader,IonCardContent,IonCardSubtitle,IonCardTitle, IonButton, IonLabel,IonIcon,IonModal,IonHeader,IonToolbar,IonTitle,IonButtons} from '@ionic/react'
import {chatbubbleOutline} from 'ionicons/icons'

import LikePost from './LikePost'
import {AuthContext} from '../context/Auth'
import { useState } from 'react'

import SinglePost from '../pages/singlePost'

function PostCard({ post: { id, body, createdAt, username, likesCount, commentsCount, likes } }){
    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)


    return (  
        <React.Fragment>  
            <IonCard routerAnimation>
                <IonCardContent onClick={() => setModalState(true)} button={true}>
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
                    <IonButton onClick={() => setModalState(true)} button={true}>
                        <IonIcon slot="start" icon={chatbubbleOutline} />
                        <IonLabel basic color='blue' pointing='left'>
                            {commentsCount}
                        </IonLabel>
                    </IonButton>
                </IonCardContent> 
            </IonCard>
            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='dark'>
                        <IonTitle>Post Detail!</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onIonFocus={()=> setModalState(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <SinglePost postID={id}/>
            </IonModal>
        </React.Fragment> 
    )
}

export default PostCard;