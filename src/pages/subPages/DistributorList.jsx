import { IonAvatar, IonChip, IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import React,{useState} from 'react'
import {IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle} from '@ionic/react'

import '../../App.css'
import Header from '../../components/Header';

function DistributorList(props) {

    const color = ["tertiary","success","warning","secondary","danger","primary"]

    const [modalState,setModalState] = useState(false)

    const items = [
        {
            username: "Lusiana",
            email: "lusiana@gmail.com",
            userImg: "https://images.unsplash.com/photo-1503104834685-7205e8607eb9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Z2lybHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
            whatsapp_number: "085594947643",
            looking_for: ["biji besi","beras miskin","Soju","beras merah","susu kedelai","kentang","wortel"]
        },
        {
            username: "Britney Charvia",
            email: "britneyCharv@gmail.com",
            userImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWWLgIQj7fc_3tK3Fa8pd3gnVZ8ySEdCDMFQ&usqp=CAU",
            whatsapp_number: "085594947643",
            looking_for: ["biji besi","beras miskin"]
        },
        {
            username: "Carine Wibawa",
            email: "CarineWibawa@gmail.com",
            userImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHN8ZW58MHx8MHw%3D&auto=format&fit=crop&w=500&q=60",
            whatsapp_number: "085594947643",
            looking_for: ["biji besi","beras miskin"]
        },
        
    ];

    const [modalData,setModalData] = useState(null)

    function ToggleModal(item) {
        setModalData(item)
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
                    className="ion-content-bottom">

                <IonList>
                    {items.length > 0 ? items.map((item,i) => (
                        <IonItem key={i} onClick={() => ToggleModal(item)}>
                            <IonAvatar slot="start">
                                <img src={item.userImg} />
                            </IonAvatar>
                            <IonLabel>
                                <h2>{item.username}</h2>
                                <p>
                                    {item.looking_for.length > 0 && item.looking_for.map((lookedItem,i) => (
                                        <IonChip outline key={i} color={color[i % 6]}>
                                            <IonLabel>{lookedItem}</IonLabel>
                                        </IonChip>
                                    ))}
                                </p>
                            </IonLabel>
                        </IonItem>
                    )) : <img  src="https://i.pinimg.com/originals/88/36/65/8836650a57e0c941b4ccdc8a19dee887.png"/>}
                </IonList>

            </IonContent>
            <IonModal isOpen={modalState} className="Montserrat">
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Distributor's Details</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true}>
                    
                </IonContent>              
            </IonModal>
        </React.Fragment>
    )
}

export default DistributorList;