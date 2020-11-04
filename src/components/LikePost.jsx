import React,{useState,useEffect} from 'react'
import {useMutation,gql} from '@apollo/client'
import {IonButton,IonIcon} from '@ionic/react'
import {heart,heartDislike} from 'ionicons/icons'
import {FETCH_POSTS_QUERY} from '../utils/graphql'

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
            <IonIcon slot='start'  icon={heartDislike} />
        )
    ) : (
        <IonIcon slot='start' icon={heartDislike} />
    )

    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        variables: {PostId: id},
        update(proxy,result) {
            console.log('testes');
            const newlyUpdated = result.data.likePost
            console.log(newlyUpdated);
            const data = proxy.readQuery({query: FETCH_POSTS_QUERY})

            console.log(data);

            // const temp =  data.map((like) => like.username === newlyUpdated.username ? newlyUpdated : like) 

            
            
            console.log('aaa');
            // proxy.writeQuery({query:FETCH_POSTS_QUERY,data:{getPosts: [result.data.createPost,...data.getPosts]}})       
        },
        onError(){}
    })

    return (       
        <IonButton as='div' labelPosition='right' basic onClick={likePost} color='dark'>
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