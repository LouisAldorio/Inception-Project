import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonCard, IonCardContent,IonLabel,IonToast, IonContent,IonFabButton,IonIcon,IonBackButton, IonCardHeader,IonModal,IonHeader,IonToolbar,IonTitle,IonButtons,IonFab,IonText,IonSlide,IonSlides, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner, IonItem, IonAvatar, IonRow, IonCol, IonCardTitle, IonChip } from '@ionic/react'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import ImageZoom from '../../components/PhotoZoom'
import {add,pricetag,cart,mail,call,personAdd} from 'ionicons/icons'

import Carousel from 'react-material-ui-carousel'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import '@open-wa/whatsapp-button/whatsapp-button.js';

function Posts(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)
    const [searchedItem,setSearchItem] = useState('')
    const [friendAdded,setFriendAdded] = useState(false)

    const items = [
        {
            src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
            commodityName:"Beras Raskin",
            minPurchase: "100 kg",
            unitPrice: "100.000", 
            ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." , 
            user:{
                userImg: "https://drive.google.com/uc?export=view&id=1Bg1c5HJcIB2CKT17uJ53CWZpNhkYynlV",
                username: "Louis Aldorio",
                email:"louisaldorio@gmail.com",
                WANumber:"082161723455",
            }
        },
        {
            src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
            commodityName:"Beras Merah",
            minPurchase: "100 kg",
            unitPrice: "100.000", 
            ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
            user:{
                userImg: "https://drive.google.com/uc?export=view&id=1Bg1c5HJcIB2CKT17uJ53CWZpNhkYynlV",
                username: "Louis Aldorio",
                email:"louisaldorio@gmail.com",
                WANumber:"082161723455",
            }
        },
        
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
    const TypeSearchWord = (value) => {
        setSearchItem(value)
    }

    function AddFriend(){
        setFriendAdded(true)
    }
    
    return (
        <React.Fragment> 
            <Header />          
            <IonContent scrollEvents={true}
                    onIonScrollStart={() => {}}
                    onIonScroll={() => {}}
                    onIonScrollEnd={() => {}}
                    className="ion-content-bottom">  
                    <SearchBar selectedValue={searchedItem} changeHandler={TypeSearchWord}/>            
                
                    <div className="commodity-list">
                        {items.length > 0 ? items.map((image, i) => (
                            <IonCard className="Montserrat" key={i} onClick={() => ToggleModal(image)} >
                                
                                <IonItem lines={"none"}>                             
                                    <IonAvatar slot="start">
                                        <img src={image.user.userImg} />
                                    </IonAvatar>                               
                                    <h2>{image.user.username}</h2>                               
                                </IonItem>
                                
                                <img src={image.src[0]} height="250px" width="500px"/>  
                                <IonCardContent>                             
                                    <h1>{image.commodityName}</h1>                              
                                </IonCardContent>   

                                <IonRow>
                                    <IonCol size="6">
                                        <IonItem lines={"none"}>
                                            <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                            <p>Rp. {image.unitPrice}</p>
                                        </IonItem>                                  
                                    </IonCol>    
                                    <IonCol size="6">
                                        <IonItem lines={"none"}>
                                            <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                            <p>Min: {image.minPurchase}</p>
                                        </IonItem>                                  
                                    </IonCol>  
                                </IonRow>                           
                            </IonCard>
                        )): <img id="photo-fullscreen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Tl87UxYtH39b-RUyxSB2SrtNkPZB_55dtw&usqp=CAU"/> } 
                     </div>

                    {items.length > 0 && (
                        <IonInfiniteScroll threshold="100px" id="infinite-scroll">                    
                            <IonInfiniteScrollContent loadingSpinner="dots"><IonSpinner color="warning" className="pagination-spinner"></IonSpinner></IonInfiniteScrollContent>
                        </IonInfiniteScroll>  
                    )}
                
                {user.Role == 'Supplier' && <IonFab vertical="bottom" horizontal="end" edge id="schedule-add" slot='fixed'>
                    <IonFabButton color="warning">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>}
                                                 
            </IonContent>   
            
            <IonModal isOpen={modalState} className="Montserrat">
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Detail</IonTitle>
                    </IonToolbar>
                </IonHeader>
                           
                <IonContent scrollEvents={true}>
                    <IonCard>
                        <Carousel animation="slide" autoPlay={true} interval={4000}>
                            {modalData && modalData.src.map((img) => (
                                <ImageZoom src={img} key={img} width="500px" height="300px"/>            
                            ))}
                        </Carousel>                   
                        <IonCardContent>
                            <IonCardTitle>
                                <h1>Commodity: {modalData && modalData.commodityName}</h1>
                            </IonCardTitle>
                            <p>
                                {modalData && modalData.ComodityDescription}
                            </p>
                        </IonCardContent> 
                        <IonRow>
                            <IonCol size="6">
                                <IonItem lines={"none"}>
                                    <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                    <p>Rp. {modalData && modalData.unitPrice}</p>
                                </IonItem>                                  
                            </IonCol>    
                            <IonCol size="6">
                                <IonItem lines={"none"}>
                                    <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                    <p>Min: {modalData && modalData.minPurchase}</p>
                                </IonItem>                                  
                            </IonCol>  
                        </IonRow> 
                        <IonCardContent>
                            <IonItem lines={"none"}>                             
                                <IonAvatar slot="start">
                                    <img src={modalData && modalData.user.userImg} />
                                </IonAvatar>                               
                                <h1>{modalData && modalData.user.username}</h1>    
                                <IonChip slot="end" color="warning" onClick={AddFriend}><IonIcon icon={personAdd}  color="dark"></IonIcon></IonChip>                           
                            </IonItem>
                            <IonItem lines={"none"} >                             
                                <IonIcon slot="start" icon={mail}></IonIcon>{modalData && modalData.user.email}                           
                            </IonItem>
                            <IonItem lines={"none"}>       
                                <IonIcon slot="start" icon={call}></IonIcon>                                                                                       
                                {modalData && modalData.user.WANumber}                        
                            </IonItem>
                            <IonItem lines={"none"}>
                                <whatsapp-button phone={modalData && modalData.user.WANumber} dialcode="62" text="hey there lets chat!" label="Chat"></whatsapp-button> 
                            </IonItem>
                        </IonCardContent>                     
                    </IonCard>
                </IonContent>

            </IonModal>
            <IonToast
                isOpen={friendAdded}
                onDidDismiss={() => setFriendAdded(false)}
                message="User Added to Friend List"
                position="top"
                duration={800}
            />
        </React.Fragment>
         
    )
}


export default Posts;