import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import React,{useContext, useState} from 'react'
import {IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonToast,IonSpinner} from '@ionic/react'
import {useMutation} from '@apollo/client'

import '../../App.css'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom'
import { personAdd,mail,call,checkmarkCircle } from 'ionicons/icons';
import { AuthContext } from '../../context/Auth';
import {useQuery} from '@apollo/client'
import {FETCH_USER_BY_ROLE,FETCH_USER_BY_USERNAME,ADD_OR_REMOVE_FRIEND} from '../../utils/graphql'
import {useForm} from '../../utils/Hooks'

function DistributorList(props) {

    const {user} = useContext(AuthContext)

    const color = ["tertiary","success","warning","secondary","danger","primary"]

    const [modalState,setModalState] = useState(false)
    const [toast,setToast] = useState(false)
    const [friend,setFriend] = useState([])

    const {loading,data} = useQuery(FETCH_USER_BY_ROLE,{
        variables: {
            role: "Distributor"
        }
    })

    const {loading:loadingUser,data: dataUser} = useQuery(FETCH_USER_BY_USERNAME,{
        variables: {
            username: user.Username
        },
        onCompleted: () => {
            setFriend(dataUser.user_by_username.friend_list)
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

    function ToggleModal(item) {
        setModalData(item)
        setModalState(true)
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
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}
                    className="ion-content-bottom">
                <IonListHeader  lines="inset"> 
                    <h1>Distributors </h1> 
                </IonListHeader>

                {loading ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : (
                    <IonList>
                        {data.users_by_role.length > 0 ? data.users_by_role.map((item,i) => (
                            <IonItem key={i} onClick={() => ToggleModal(item)}>
                                <IonAvatar slot="start">
                                    <img src={item.profile_image} />
                                </IonAvatar>
                                <IonLabel>
                                    <h2>{item.username}</h2>
                                    <p>
                                        {item.looking_for.length > 0 && item.looking_for.map((lookedItem,i) => (
                                            <IonChip outline key={i} color={color[i + Math.floor((Math.random() * 600) + 1) % 6]}>
                                                <IonLabel>{lookedItem}</IonLabel>
                                            </IonChip>
                                        ))}
                                    </p>
                                </IonLabel>
                            </IonItem>
                        )) : <img  src="https://i.pinimg.com/originals/88/36/65/8836650a57e0c941b4ccdc8a19dee887.png"/>}
                    </IonList>
                )}
                

            </IonContent>
            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Distributor's Details</IonTitle>
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
                                <p>
                                    {modalData && modalData.looking_for.length > 0 && modalData.looking_for.map((lookedItem,i) => (
                                        <IonChip outline key={i} color={color[i + Math.floor((Math.random() * 600) + 1) % 6]}>
                                            <IonLabel>{lookedItem}</IonLabel>
                                        </IonChip>
                                    ))}
                                </p>
                        </IonCardContent>
                        
                    </IonCard>
                </IonContent>              
            </IonModal>
            <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={modalData && (modalData.friend_list.includes(user.Username) ? "User Remove from Friend List" : "User Added to Friend List")}
                position="top"
                duration={800}
            />
        </React.Fragment>
    )
}

export default DistributorList;