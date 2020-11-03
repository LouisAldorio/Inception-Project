import React,{useState} from 'react'
import {gql,useMutation} from '@apollo/client'
import {trashBin} from 'ionicons/icons'
import {FETCH_POSTS_QUERY} from '../utils/graphql'
import {IonAlert, IonIcon,IonItemOption,IonItemOptions} from '@ionic/react'

function DeleteButton({postId,commentId, callback}){
    const [confirmOpen,setConfirmOpen] =useState(false)

    const mutation = commentId ? DELETE_COMMENT_POST : DELETE_POST_MUTATION

    const [deletePostOrComment] = useMutation(mutation,{
        update(proxy){
            setConfirmOpen(false)

            if(!commentId) {
                //read write cache
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                const newData = data.getPosts.filter(p => p.id !== postId)
                proxy.writeQuery({query:FETCH_POSTS_QUERY,data:{getPosts:newData}})
            }

            if(callback) callback()
        },
        variables:{
            postId,
            commentId
        }
    })

    return (
        <div>           
            <IonItemOptions side="end">
                <IonItemOption color="danger" onClick={() => setConfirmOpen(true)}>
                    <IonIcon icon={trashBin} className="post-delete-icon"></IonIcon>
                </IonItemOption>
            </IonItemOptions>
            <IonAlert isOpen={confirmOpen} message={'Delete Post ?'} onDidDismiss={() => {setConfirmOpen(false)}} buttons={['Cancel', {
                text: 'Delete',
                handler: () => {
                    deletePostOrComment()
                }
            }]} />
        </div>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId:ID!){
        deletePost(PostId: $postId)
    }
`

const DELETE_COMMENT_POST = gql`
    mutation deleteComment($postId: String!,$commentId: String){
        deleteComment(PostId: $postId,commentId: $commentId){
            id
            comments{
                id
                username
                body
                createdAt
            }
            commentsCount
        }
    }
`

export default DeleteButton