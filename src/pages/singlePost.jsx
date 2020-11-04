import gql from 'graphql-tag';
import React,{useContext, useRef, useState} from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {chatbubble} from 'ionicons/icons'

import moment from 'moment'
import LikeButton from '../components/LikePost';
import {AuthContext} from '../context/Auth'
import DeleteButton from '../components/DeleteButton';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonLabel, IonRow,IonSpinner,IonIcon, IonInput, IonContent,IonItem,IonItemSliding } from '@ionic/react';


const FETCH_POST_QUERY = gql`
     query getPost($PostId: ID!){
        getPost(PostId: $PostId){
            id 
            body
            createdAt
            username
            likesCount
            likes{
                username
            }
            commentsCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($PostId: String!,$body: String!){
        createComment(PostId: $PostId,body: $body){
            id
            comments{
                id
                body
                createdAt
                username
            }
            commentsCount
        }
    }
`

function SinglePost(props){
    const {user} = useContext(AuthContext)
    const PostId = props.postID

    // props.match.params.postId
    console.log(PostId);

    const [comment,setComment] = useState('')
    const commentInputRef = useRef(null)

    const {data} = useQuery(FETCH_POST_QUERY,{      
        variables: {
            PostId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment('')
            commentInputRef.current.blur()
        },
        variables:{
            PostId,
            body: comment
        }
    })

    function deletePostCallBack(){
        props.history.push('/')
    }
    if(data){
        let postMarkup;
        if(!data.getPost){
            postMarkup = (           
                    <IonSpinner name="circles" className="spinner-create-post" />               
            )
        }else{
            const {id,body,createdAt,username,comments,likes,likesCount,commentsCount} = data.getPost
            console.log(data.getPost);
    
            postMarkup = (
                <IonContent scrollEvents={true}>
                <IonGrid>
                    <IonRow>
                        <IonCol width={12}>
                            <IonCard fluid>
                                <IonCardContent>
                                    <IonCardTitle>{username}</IonCardTitle>
                                    <IonCardSubtitle>{moment(createdAt).fromNow()}</IonCardSubtitle>
                                    <IonCardContent>{body}</IonCardContent>
                                </IonCardContent>

                                <hr/>

                                <IonCardContent >
                                    <LikeButton user={user} post={{id,likesCount,likes}}/>                              
                                    <IonButton   onClick={() => console.log("Comment On Post")} color='dark'>                                     
                                        <IonIcon icon={chatbubble} />
                                        <IonLabel  pointing="left">
                                            {commentsCount}
                                        </IonLabel>
                                    </IonButton>

                                    
                                    
                                    
                                    {user && user.username === username && (
                                        <DeleteButton postId={id} callback={deletePostCallBack}/>
                                    )}
                                </IonCardContent>
                            </IonCard>


                            {user && <IonCard fluid >
                                    <IonCardContent>
                                        <p>Post a Comment</p>
                                                                              
                                        <IonInput ref={commentInputRef} type="text" placeholder="Comment.." name="comment" value={comment} onIonChange={event => setComment(event.target.value)} />
                                        <IonButton type="submit"  disabled={comment.trim() === ''} onIonFocus={submitComment} color='dark'>Submit</IonButton>

                                    </IonCardContent>
                                </IonCard>}

                            {comments && comments.map((comment) => (
                                <IonItemSliding key={comment.id}>                     
                                    <IonItem slots="end" routerAnimation className="post-item" onClick={()=> console.log("clicked")}>
                                        <IonCard fluid key={comment.id} >
                                            <IonCardContent>
                                                <IonCardHeader>
                                                    
                                                    <IonCardTitle>{comment.username}</IonCardTitle>
                                                    <IonCardSubtitle>{moment(comment.createdAt).fromNow()}</IonCardSubtitle>
                                                    
                                                    
                                                </IonCardHeader>
                                                <IonCardContent>{comment.body}</IonCardContent>
                                                
                                            </IonCardContent>
                                        </IonCard>                                    
                                    </IonItem>

                                    {user && user.username === comment.username && (
                                        <DeleteButton postId={id} commentId={comment.id} />
                                    )}
                                
                                </IonItemSliding>
                                
                            ))}
                        </IonCol>
                    </IonRow>
                </IonGrid>
                </IonContent>
            )
        }
        return postMarkup
    }
    return null
}


export default SinglePost;