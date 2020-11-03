import React,{useState,useEffect} from 'react'
import {useMutation,gql} from '@apollo/client'
import {IonButton,IonIcon} from '@ionic/react'
import {heart} from 'ionicons/icons'

function LikeButton({user, post:{id,likes,likesCount}}){

    const [liked,setLiked] = useState(false)

    //the second parameter of useEffect is array that contain if anything inside the array element change(state change) then re calculate, code useEffenct rerun
    useEffect(() => {
        if(user && likes.find((like) => like.username === user.username)){
            setLiked(true)
        }else setLiked(false)
    },[user,likes])

    const likeButton = user ? (
        liked ? (
            <IonIcon slot='start'  icon={heart} />
        ):(
            <IonIcon slot='start'  icon={heart} />
        )
    ) : (
        <IonIcon slot='start' icon={heart} />
    )

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables: {PostId: id},
        onError(){}
    })

    return (       
        <IonButton as='div' labelPosition='right' basic onIonFocus={likePost} color='dark'>
            {likeButton}      
            {likesCount}       
        </IonButton>   
    )
}


const LIKE_POST_MUTATION = gql`
    mutation likePost($PostId: ID!){
        likePost(PostId: $PostId){
            id
            likes{
                id
                username
            }
            likesCount
        }
    }
`

export default LikeButton