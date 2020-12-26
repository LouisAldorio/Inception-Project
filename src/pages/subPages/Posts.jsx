import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonCard, IonCardContent,IonLabel, IonContent,IonImg,IonBackButton, IonCardHeader,IonModal,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton, IonItem,IonText,IonSlide,IonSlides } from '@ionic/react'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import ImageZoom from '../../components/PhotoZoom'

import Header from '../../components/Header'

function Posts(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)

    

    const items = [
        {id:"1", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat1' },
        {id:"2", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat2' },
        {id:"3", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat3' },
        {id:"4", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat4' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat5' },
        {id:"6", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat6' },
        {id:"7", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat7' },
        {id:"8", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat8' },
        {id:"9", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat9' },
        {id:"10", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat10' },
        {id:"11", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/300'], text: 'a picture of a cat11' },
    ];

    const [modalData,setModalData] = useState()

    function ToggleModal(image) {
        setModalData(image)
        setModalState(true)
    }

    function CleanData(){
        setModalState(false)
        setModalData()
    }

    return (
        <React.Fragment> 
            <Header />          
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}>               
                
                    {items.map((image, i) => (
                        <IonCard key={i} onClick={() => ToggleModal(image)} >
                            <IonCardContent>
                                <IonCardHeader>                              
                                    <IonImg src={image.src[0]}/>                               
                                    <IonLabel>{image.text}</IonLabel>
                                </IonCardHeader>
                            </IonCardContent>                              
                        </IonCard>
                    ))}                                   
            </IonContent>   
            
            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Detail</IonTitle>
                    </IonToolbar>
                </IonHeader>
                           
                <IonContent >
                    <IonSlides >                   
                          {modalData && modalData.src.map((img) => (
                              <IonSlide key={img}>
                                  <ImageZoom src={img} /> 
                              </IonSlide>
                          ))}
                    </IonSlides> 
                    
                                
                    <IonText>{modalData && modalData.text}</IonText>
                </IonContent>

            </IonModal>
        </React.Fragment>
         
    )
}


export default Posts;