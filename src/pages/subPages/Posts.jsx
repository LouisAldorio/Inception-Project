import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonContent,IonPage,IonSpinner,IonFab,IonFabButton,IonIcon,IonItemSliding,IonItemOption,IonItem,IonItemOptions,IonFabList, IonModal} from '@ionic/react'
import {arrowUpCircleOutline,add} from 'ionicons/icons'
import {FETCH_POSTS_QUERY} from '../../utils/graphql'
import PostCard from '../../components/PostCard'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import DeleteButton from '../../components/DeleteButton'
import PostForm from '../../components/PostForm'
import SinglePost from '../singlePost'

function Posts(props){

    const {user} = useContext(AuthContext)

    const {loading,data} = useQuery(FETCH_POSTS_QUERY)

    const [openForm,setOpenForm] = useState(false)

    function callForm(){
        setOpenForm(true)
    }
    console.log(openForm)

    return (
        <IonPage>
            <IonContent scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}>

            {loading ? (<IonSpinner name="circles" className="spinner-home" />) : (
                            data.getPosts && data.getPosts.map(post =>(
                                <IonItemSliding key={post.id}>
                                    <IonItemOptions side="start">
                                        <IonItemOption onClick={() => console.log('favorite clicked')}>Favorite</IonItemOption>
                                        <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Share</IonItemOption>
                                    </IonItemOptions>
                                
                                    <IonItem slots="end" routerAnimation className="post-item" onClick={()=> console.log("clicked")}>
                                        <PostCard post={post} key={post.id}/>                                     
                                    </IonItem>
                                
                                    {user && user.username === post.username && (
                                        <DeleteButton postId={post.id} />
                                    )}
                                    
                                </IonItemSliding>
                                
                            ))
                        )}
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="dark" >
                    <IonIcon icon={arrowUpCircleOutline}/>                   
                </IonFabButton>
                <IonFabList side="top">              
                    <IonFabButton onClick={callForm}><IonIcon icon={add} /></IonFabButton>
                </IonFabList>
            </IonFab>
            </IonContent> 
            <PostForm state={openForm} setState={setOpenForm}/>
            
        </IonPage>
         
    )
}


export default Posts;