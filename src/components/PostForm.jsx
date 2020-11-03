import React from 'react'
import { gql, useMutation } from '@apollo/client'

import {useForm} from '../utils/Hooks'
import {FETCH_POSTS_QUERY} from '../utils/graphql'
import { IonButton,IonInput, IonModal} from '@ionic/react'

function PostForm(props){

    const{onChange,onSubmit,values} = useForm(createPostCallBack,{
        body: ''
    })

    const [createPost,{error}] = useMutation(CREATE_POST_MUTATION,{
        variables: values,
        update(proxy,result){

            //read from cache
            const data = proxy.readQuery({query: FETCH_POSTS_QUERY})
            proxy.writeQuery({query:FETCH_POSTS_QUERY,data:{getPosts: [result.data.createPost,...data.getPosts]}})

            values.body = ''
        },
        onError(){}
    })

    function createPostCallBack(){
        createPost()
        if(!error) {
            props.setState(false)
        }
        
    }

    return (
        <IonModal isOpen={props.state}>
            <form onSubmit={onSubmit}>
                <h2>Create a post:</h2>
                
                <IonInput placeholder="Hi World!" name="body" onIonChange={onChange} value={values.body} error={error ? true:false} />
                <IonButton type="submit" color="dark" >Submit</IonButton>              
            </form>

            {error && (
                <div className="ui error message" style={{marginBottom: 20}}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </IonModal>      
    )
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
