import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonCard, IonCardContent,IonLabel, IonContent,IonImg,IonPage, IonCardHeader,IonModal,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton, IonItem,IonText } from '@ionic/react'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import ImageZoom from '../../components/PhotoZoom'

function Posts(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)


    const items = [
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat1' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat2' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat3' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat4' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat5' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat6' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat7' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat8' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat9' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat10' },
        { src: 'http://placekitten.com/g/500/300', text: 'a picture of a cat11' },
    ];

    const [modalData,setModalData] = useState(0)

    function ToggleModal(image) {
        setModalData(image)
        setModalState(true)
    }

    return (
        <IonPage>           
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}>               
                
                    {items.map((image, i) => (
                        <IonCard key={i} onClick={() => ToggleModal(image)}>
                            <IonCardContent>
                                <IonCardHeader>                              
                                    <IonImg src={image.src}/>                               
                                    <IonLabel>{image.text}</IonLabel>
                                </IonCardHeader>
                            </IonCardContent>                              
                        </IonCard>
                    ))}                                   
            </IonContent>   
            
            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        <IonTitle>Post Detail!</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={()=> setModalState(false)}>Close</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                
                <IonContent >
                    <ImageZoom src={modalData.src} /> 
                                
                    <IonText>{modalData.text}</IonText>
                </IonContent>
                
                
            </IonModal>
        </IonPage>
         
    )
}


export default Posts;