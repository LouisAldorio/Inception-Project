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
        {src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN"],text:"img1"},
        {src:["https://drive.google.com/uc?export=view&id=1Bg1c5HJcIB2CKT17uJ53CWZpNhkYynlV"],text:"img1"},
        {src:["https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K","https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN"],text:"img1"}
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

    return (
        <React.Fragment> 
            <Header />          
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}
                    >               
                
                    {items.length > 0 ? items.map((image, i) => (
                        <IonCard key={i} onClick={() => ToggleModal(image)} >
                            <IonCardContent>
                                <IonCardHeader>                              
                                    <img src={image.src[0]} height="250px" width="500px"/>                                                                  
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonLabel>{image.text}</IonLabel>
                                </IonCardContent>
                            </IonCardContent>                              
                        </IonCard>
                    )): <img id="photo-fullscreen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Tl87UxYtH39b-RUyxSB2SrtNkPZB_55dtw&usqp=CAU"/> }  

                    {items.length > 0 && (
                        <IonInfiniteScroll threshold="100px" id="infinite-scroll">                    
                            <IonInfiniteScrollContent loadingSpinner="dots"><IonSpinner color="warning" className="pagination-spinner"></IonSpinner></IonInfiniteScrollContent>
                        </IonInfiniteScroll>  
                    )}
                                                 
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
                            <ImageZoom src={img} key={img} width="500px" height="300px"/>            
                        ))}
                    </Carousel>                   
                    <IonText>{modalData && modalData.text}</IonText>
                </IonContent>

            </IonModal>
        </React.Fragment>
         
    )
}


export default Posts;