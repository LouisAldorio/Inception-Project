import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonCard, IonCardContent,IonLabel, IonContent,IonImg,IonBackButton, IonCardHeader,IonModal,IonHeader,IonToolbar,IonTitle,IonButtons,IonButton, IonItem,IonText,IonSlide,IonSlides, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner } from '@ionic/react'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import ImageZoom from '../../components/PhotoZoom'

import Carousel from 'react-material-ui-carousel'
import Header from '../../components/Header'

function Posts(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)

    

    const items = [
        {id:"1", src: ['https://secure-river-11996.herokuapp.com/lalalamove/user/profile/download (1) - 638557402.jpg','http://placekitten.com/g/300/500','http://placekitten.com/g/500/500'], text: 'a picture of a cat1' },
        {id:"2", src: ['https://secure-river-11996.herokuapp.com/lalalamove/user/profile/download (1) - 680243943.jpg','http://placekitten.com/g/500/500'], text: 'a picture of a cat2' },
        {id:"3", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat3' },
        {id:"4", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat4' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },     
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },
    ];

    const [modalData,setModalData] = useState(null)

    function ToggleModal(image) {
        setModalData(image)
        setModalState(true)
    }

    function CleanData(){
        setModalState(false)
        setModalData(null)
    }

    console.log(modalData);

    return (
        <React.Fragment> 
            <Header />          
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}
                    >               
                
                    {items.map((image, i) => (
                        <IonCard key={i} onClick={() => ToggleModal(image)} >
                            <IonCardContent>
                                <IonCardHeader>                              
                                    <IonImg src={image.src[0]}/>                               
                                    
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonLabel>{image.text}</IonLabel>
                                </IonCardContent>
                            </IonCardContent>                              
                        </IonCard>
                    ))}  
                    <IonInfiniteScroll threshold="100px" id="infinite-scroll">                    
                        <IonInfiniteScrollContent loadingSpinner="dots"><IonSpinner color="warning" className="pagination-spinner"></IonSpinner></IonInfiniteScrollContent>
                    </IonInfiniteScroll>                               
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
                           
                <IonContent>
                    <Carousel animation="slide" autoPlay={true} interval={4000}>
                        {modalData && modalData.src.map((img) => (
                            <ImageZoom src={img} key={img}/>            
                        ))}
                    </Carousel>                   
                    <IonText>{modalData && modalData.text}</IonText>
                </IonContent>

            </IonModal>
        </React.Fragment>
         
    )
}


export default Posts;