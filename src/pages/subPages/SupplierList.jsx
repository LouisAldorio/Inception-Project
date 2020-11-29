import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonChip, IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonRow } from '@ionic/react';
import React,{useContext, useState} from 'react'
import {IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonToast} from '@ionic/react'

import '../../App.css'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom'
import { personAdd,mail,call,checkmarkCircle,pricetag,cart } from 'ionicons/icons';
import { AuthContext } from '../../context/Auth';
import Carousel from 'react-material-ui-carousel'

function SupplierList(props) {

    const {user} = useContext(AuthContext)

    const color = ["tertiary","success","warning","secondary","danger","primary"]

    const [modalState,setModalState] = useState(false)
    const [postModalState,setPostModalState] = useState(false)
    const [toast,setToast] = useState(false)

    const items = [
        {
            username: "Lusiana",
            email: "lusiana@gmail.com",
            userImg: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
            whatsapp_number: "085594947643",
            friend_list: ["louisaldorio"],
            products: [
                {
                    src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                    commodityName:"Beras Raskin",
                    minPurchase: "100 kg",
                    unitPrice: "100.000", 
                    ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." , 
                },
                {
                    src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                    commodityName:"Beras Merah",
                    minPurchase: "100 kg",
                    unitPrice: "100.000", 
                    ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
                },
            ],
        },
        {
            username: "Britney Charvia",
            email: "britneyCharv@gmail.com",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWLgIQj7fc_3tK3Fa8pd3gnVZ8ySEdCDMFQ&usqp=CAU",
            whatsapp_number: "085594947643",
            friend_list: ["louisaldorio"],
            products: [],
        },
        {
            username: "Carine Wibawa",
            email: "CarineWibawa@gmail.com",
            userImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
            whatsapp_number: "085594947643",           
            friend_list: [],
            products: [],
        },
        
    ];


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
        setToast(true)
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
                    <h1>Suppliers </h1> 
                </IonListHeader>
                <IonList>
                    {items.length > 0 ? items.map((item,i) => (
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
                                <img src={item.userImg} />
                            </IonAvatar>
                        </IonItem>
                    )) : <img  src="https://i.pinimg.com/originals/88/36/65/8836650a57e0c941b4ccdc8a19dee887.png"/>}
                </IonList>

            </IonContent>

            {/* modal untuk membuka detail customer */}
            <IonModal isOpen={modalState} >
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
                            <ImageZoom src={modalData.userImg} width="500px" height="300px"/> 
                        )}
                        <IonCardHeader>
                            <IonCardTitle>
                                <IonItem>
                                    {modalData && modalData.username}
                                    <IonChip onClick={AddOrRemoveFriend} slot="end" color="warning"><IonIcon icon={modalData && (modalData.friend_list.includes(user.Username) ? checkmarkCircle : personAdd)} color="dark"></IonIcon></IonChip>
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
                                        <img src={product.src[0]} />
                                    </IonAvatar>
                                    <IonLabel><h2>{product.commodityName}</h2></IonLabel>
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
                                            {postModalData && postModalData.src.map((img) => (
                                                <ImageZoom src={img} key={img} width="500px" height="300px"/>            
                                            ))}
                                        </Carousel>                   
                                        <IonCardContent>
                                            <IonCardTitle>
                                                <h1>Commodity: {postModalData && postModalData.commodityName}</h1>
                                            </IonCardTitle>
                                            <p>
                                                {postModalData && postModalData.ComodityDescription}
                                            </p>
                                        </IonCardContent> 
                                        <IonRow>
                                            <IonCol size="6">
                                                <IonItem lines={"none"}>
                                                    <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                                    <p>Rp. {postModalData && postModalData.unitPrice}</p>
                                                </IonItem>                                  
                                            </IonCol>    
                                            <IonCol size="6">
                                                <IonItem lines={"none"}>
                                                    <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                                    <p>Min: {postModalData && postModalData.minPurchase}</p>
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
                message={modalData && (modalData.friend_list.includes(user.Username) ? "User Remove from Friend List" : "User Added to Friend List")}
                position="top"
                duration={800}
            />
        </React.Fragment>
    )
}

export default SupplierList;