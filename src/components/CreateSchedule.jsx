import { IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle, IonContent, IonPicker,IonButton } from '@ionic/react'
import React, { useState } from 'react'
import DistributorScheduleView from './DistributorSchedule'


function SchedulePost(props){
    const user = {
        role: "Distributor"
    }
    const userSupllier = {
        username: "Lusiana",
        email: "lusiana@gmail.com",
        userImg: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
        whatsapp_number: "085594947643",
        friend_list: ["louisaldorio","susi"],
        products: [
            {
                src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                commodityName:"Beras Raskin",
                minPurchase: "50 kg",
                unitPrice: "100.000", 
                ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." , 
            },
            {
                src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                commodityName:"Gula Merah",
                minPurchase: "100 kg",
                unitPrice: "150.000", 
                ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
            },
        ],
    }

    const userDistributor = {
        friend_list: [
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
                        minPurchase: "50 kg",
                        unitPrice: "100.000", 
                        ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." , 
                    },
                    {
                        src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                        commodityName:"Gula Merah",
                        minPurchase: "100 kg",
                        unitPrice: "150.000", 
                        ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
                    },
                    {
                        src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                        commodityName:"Semen tiga roda",
                        minPurchase: "100 kg",
                        unitPrice: "150.000", 
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
                products: [
                    {
                        src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                        commodityName:"Keju Prancis",
                        minPurchase: "20 kg",
                        unitPrice: "350.000", 
                        ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
                    },
                    {
                        src:["https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN","https://drive.google.com/uc?export=view&id=1KB3r9uHLQ9m6VS8r177Dyac1e44I6p6K"],
                        commodityName:"Soda Api",
                        minPurchase: "20 kg",
                        unitPrice: "350.000", 
                        ComodityDescription: "The most popular industrial group ever, and largely responsible for bringing the music to a mass audience." ,
                    },
                ],
            },
        ],
    }

    function closeModal(){
        props.stateHandler(false)
    }

    // Determine what is the user role, (conditional rendering)
    
    let OutCome;
    if(user.role === 'Distributor'){
        OutCome = (
            <DistributorScheduleView data={userDistributor}/>
        )
    }else if(user.role === 'Supplier'){
        OutCome = (
            <IonPicker>

            </IonPicker>
        )
    }

    return (
        <React.Fragment>
            <IonModal isOpen={props.isOpen}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/Posts" onClick={closeModal}/>
                        </IonButtons>
                        <IonTitle>Create New Schedule!</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    {OutCome}
                </IonContent>
            </IonModal>
        </React.Fragment>
    )
}

export default SchedulePost;