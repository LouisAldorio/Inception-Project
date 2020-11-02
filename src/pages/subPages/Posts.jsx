import React from 'react'
import {useQuery} from '@apollo/client'
import { IonContent,IonPage,IonSpinner,IonFab,IonFabButton,IonIcon,IonItemSliding,IonItemOption,IonItem,IonItemOptions} from '@ionic/react'
import {add,trashBin} from 'ionicons/icons'
import {FETCH_POSTS_QUERY} from '../../utils/graphql'
import PostCard from '../../components/PostCard'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'

function Posts(props){

    const {user} = useContext(AuthContext)

    const {loading,data} = useQuery(FETCH_POSTS_QUERY)

    return (
        <IonPage>
            <IonContent scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}>

            {loading ? (<IonSpinner name="circles" className="spinner-home" />) : (
                            data.getPosts && data.getPosts.map(post =>(
                                <IonItemSliding>
                                    <IonItemOptions side="start">
                                        <IonItemOption onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
                                        <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Share</IonItemOption>
                                    </IonItemOptions>
                                
                                    <IonItem slots="end" routerAnimation className="post-item" onClick={()=> console.log("clicked")}>
                                        <PostCard post={post} key={post.id}/>
                                    </IonItem>
                                
                                    {user && user.username === post.username && (
                                        <IonItemOptions side="end">
                                            <IonItemOption color="danger" onClick={() => console.log('unread clicked')}>
                                                <IonIcon icon={trashBin} className="post-delete-icon"></IonIcon>
                                            </IonItemOption>
                                        </IonItemOptions>
                                    )}
                                    
                                </IonItemSliding>
                                
                            ))
                        )}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="dark">
                    <IonIcon icon={add}/>
                </IonFabButton>
            </IonFab>
            </IonContent> 
        </IonPage>
         
    )
}


export default Posts;