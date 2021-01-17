import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid,IonSpinner, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import React,{useContext, useState} from 'react'
import {IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonToast} from '@ionic/react'
import {useQuery} from '@apollo/client'
import {FETCH_USER_BY_ROLE,FETCH_USER_BY_USERNAME} from '../../utils/graphql'
import {gql,useMutation} from '@apollo/client'

import '../../App.css'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom'
import { personAdd,mail,call,checkmarkCircle,pricetag,cart } from 'ionicons/icons';
import { AuthContext } from '../../context/Auth';
import Carousel from 'react-material-ui-carousel'
import {useForm} from '../../utils/Hooks'

function SupplierList(props) {

    const {user} = useContext(AuthContext)

    const color = ["tertiary","success","warning","secondary","danger","primary"]

    const [modalState,setModalState] = useState(false)
    const [postModalState,setPostModalState] = useState(false)
    const [toast,setToast] = useState(false)
    const [friend,setFriend] = useState([])

    const {loading:loadingUser,data: dataUser} = useQuery(FETCH_USER_BY_USERNAME,{
        variables: {
            username: user.Username
        },
        onCompleted: () => {
            setFriend(dataUser.user_by_username.friend_list)
        }
    })

    const {loading,data} = useQuery(FETCH_USER_BY_ROLE,{
        variables: {
            role: "Supplier"
        }
    })


    const { onChange, onSubmit, values } = useForm(AddOrRemoveFriend, {})

    const [addOrRemoveFriend, { loading: friendLoading }] = useMutation(ADD_OR_REMOVE_FRIEND, {
        update(proxy, result) {
            setFriend(result.data.friends.add.friend_list)
            setToast(true) 
        },
        onError(err) {
            console.log(err)
        },
        variables: values
    })


    const [modalData,setModalData] = useState(null)
    const [postModalData,setPostModalData] = useState(null)

    function ToggleModal(item) {
        setModalData(item)
        setModalState(true)
    }
    function TogglePostModal(item){
        setPostModalData(item)
        setPostModalState(true)
    }

    function cleanPostData(){
        setPostModalData(null)
        setPostModalState(false)
    }
    function CleanData(){
        setModalState(false)
        setModalData(null)
    }

    

    function AddOrRemoveFriend(){       
            
        addOrRemoveFriend()
    }
    

    return (
        <React.Fragment>
            <Header />
            {loading ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : (
                <IonContent scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}}
                className="ion-content-bottom">
                    <IonListHeader  lines="inset"> 
                        <h1>Suppliers </h1> 
                    </IonListHeader>
                    <IonList>
                        {data.users_by_role.length > 0 ? data.users_by_role.map((item,i) => (
                            <IonItem key={i} onClick={() => ToggleModal(item)}>
                                
                                <IonLabel>
                                    <h2>{item.username}</h2>
                                    <p>
                                        {/* {item.looking_for.length > 0 && item.looking_for.map((lookedItem,i) => (
                                            <IonChip outline key={i} color={color[i + Math.floor((Math.random() * 600) + 1) % 6]}>
                                                <IonLabel>{lookedItem}</IonLabel>
                                            </IonChip>
                                        ))} */}
                                    </p>
                                </IonLabel>
                                <IonAvatar slot="end">
                                    <img src={item.profile_image} />
                                </IonAvatar>
                            </IonItem>
                        )) : <img  src="https://i.pinimg.com/originals/88/36/65/8836650a57e0c941b4ccdc8a19dee887.png"/>}
                    </IonList>

                </IonContent>
            )}
            

            {/* modal untuk membuka detail customer */}
            <IonModal isOpen={modalState} >
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Supplier's Details</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true}>
                    <IonCard>
                        {modalData && (
                            <ImageZoom src={modalData.profile_image} width="500px" height="300px"/> 
                        )}
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonItem>
                                    {modalData && modalData.username}
                                    <IonChip onClick={(e) => {
                                        
                                        if(!friend.includes(modalData.username)){          
                                            onSubmit(e,null,null,[...friend,modalData.username])              
                                        }else{
                                            onSubmit(e,null,null,friend.filter(item => item != modalData.username))
                                        }

                                    }} slot="end" color="warning">

                                    {friendLoading ? (<IonSpinner color="warning"></IonSpinner>): user.Username !== (modalData &&  modalData.username) && (
                                        <IonIcon icon={
                                            modalData && dataUser.user_by_username && (dataUser.user_by_username.friend_list.includes(modalData.username)) ? checkmarkCircle : personAdd} 
                                            color="dark"></IonIcon>
                                    )}

                                    </IonChip>
                                </IonItem>                               
                                <IonItem lines={"none"} >                             
                                    <IonIcon slot="start" icon={mail}></IonIcon>{modalData && modalData.email}                           
                                </IonItem>
                                <IonItem lines={"none"}>       
                                    <IonIcon slot="start" icon={call}></IonIcon>                                                                                       
                                    {modalData && modalData.whatsapp_number}                        
                                </IonItem>
                                <IonItem lines={"none"}>
                                    <whatsapp-button phone={modalData && modalData.whatsapp_number} dialcode="62" text="hey there lets chat!" label="Chat"></whatsapp-button> 
                                </IonItem>
                            </IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>

                            {/* list commodity supplier */}
                            {modalData && modalData.products.length > 0 && modalData.products.map((product,i) => (
                                <IonItem key={i} onClick={() => TogglePostModal(product)}>
                                    <IonAvatar slot="start">
                                        <img src={product.image[0]} />
                                    </IonAvatar>
                                    <IonLabel><h2>{product.name}</h2></IonLabel>
                                </IonItem>
                            ))}

                            {/* modal untuk tiap item yang dijual supplier */}
                            <IonModal isOpen={postModalState}>
                                <IonHeader translucent>
                                    <IonToolbar color='warning'>                      
                                        <IonButtons slot="start">                           
                                            <IonBackButton defaultHref="/Posts" onClick={()=> cleanPostData()} />                           
                                        </IonButtons>
                                        <IonTitle>Commodity's Detail</IonTitle>
                                    </IonToolbar>
                                </IonHeader>
                                        
                                <IonContent scrollEvents={true}>
                                    <IonCard>
                                        <Carousel animation="slide" autoPlay={true} interval={4000}>
                                            {postModalData && postModalData.image.map((img) => (
                                                <ImageZoom src={img} key={img} width="500px" height="300px"/>            
                                            ))}
                                        </Carousel>                   
                                        <IonCardContent>
                                            <IonCardTitle>
                                                <h1>Commodity: {postModalData && postModalData.name}</h1>
                                            </IonCardTitle>
                                            <p>
                                                {postModalData && postModalData.description}
                                            </p>
                                        </IonCardContent> 
                                        <IonRow>
                                            <IonCol size="6">
                                                <IonItem lines={"none"}>
                                                    <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                                    <p>Rp. {postModalData && postModalData.unit_price}</p>
                                                </IonItem>                                  
                                            </IonCol>    
                                            <IonCol size="6">
                                                <IonItem lines={"none"}>
                                                    <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                                    <p>Min: {postModalData && postModalData.min_purchase}</p>
                                                </IonItem>                                  
                                            </IonCol>  
                                        </IonRow>                 
                                    </IonCard>
                                </IonContent>
                            </IonModal>

                        </IonCardContent>      

                    </IonCard>
                </IonContent>              
            </IonModal>

            <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={modalData && (dataUser.user_by_username.friend_list.includes(modalData.username) ? "User Remove from Friend List" : "User Added to Friend List")}
                position="top"
                duration={800}
            />
        </React.Fragment>
    )
}


const ADD_OR_REMOVE_FRIEND = gql`
    mutation addFriend(
        $friends: [String]!
    ) {
        friends{
            add(friends:$friends){
                username
                friend_list
            }
        }
    }
`

export default SupplierList;