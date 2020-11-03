import React,{useState} from 'react'
import { gql, useMutation } from '@apollo/client'

import {useForm} from '../utils/Hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql'
import { IonButton,IonContent, IonModal,IonSpinner, IonHeader, IonToolbar, IonTitle, IonButtons} from '@ionic/react'

import {InputControls} from '../components/Input'

function PostForm(props){

    const{onChange,onSubmit,values} = useForm(createPostCallBack,{
        body: ''
    })

    const [errors, setError] = useState({})

    const [createPost,{loading}] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy,result){
            props.setState(false)
            //read from cache
            const data = proxy.readQuery({query: FETCH_POSTS_QUERY})
            proxy.writeQuery({query:FETCH_POSTS_QUERY,data:{getPosts: [result.data.createPost,...data.getPosts]}})

            values.body = ''
        },
        onError(error){
            setError(error.graphQLErrors[0].message)
        }
    })

    const clearError = () => {
        setError({})
    }
    
    
    function createPostCallBack(){
        createPost()
        clearError()            
    }

    function closeModal(){
        props.setState(false)
    }

    let outCome;
    if(loading) {
        outCome = (
            <IonModal isOpen={props.state}>
                <IonSpinner name="circles" className="spinner-create-post" />
            </IonModal>
        )
    }else{       
        outCome = (
            <IonModal isOpen={props.state}>
                
                <IonHeader translucent>
                    <IonToolbar color='dark'>
                        <IonTitle>Create New Post!</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onIonFocus={closeModal}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding" fullscreen>
                    <InputControls type="text" 
                        display="What's On your mind ?" 
                        name="body" 
                        focus="true" 
                        onChange={onChange} 
                        value={values.body} 
                        errorMessage={Object.keys(errors).length > 0 && errors}/>
                    <IonButton expand="block" 
                        color="dark" 
                        className="login-register-button" 
                        router-direction="forward" 
                        routerAnimation 
                        onIonFocus={onSubmit} 
                        type="submit">Submit</IonButton>

                </IonContent>
            </IonModal>
        )
    }

    return outCome
}

const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body: String!
    ){
        createPost(body: $body){
            id
            body
            createdAt
            username
            comments{
                id
                username
                body
                createdAt
            }
            likes{
                username
            }
            likesCount
            commentsCount
        }
    }
`

export default PostForm
