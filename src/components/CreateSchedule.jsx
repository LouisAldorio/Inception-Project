import { IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle, IonContent, IonPicker,IonButton } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth'
import DistributorScheduleView from './DistributorSchedule'
import SupplierScheduleView from './SupplierSchedule'


function SchedulePost(props){
    const {user} = useContext(AuthContext)
    let userSupllier;
    let userDistributor;

    function closeModal(){
        props.stateHandler(false)
    }
    
    let OutCome;
    
    if(user.Role === 'Distributor'){
        userDistributor = props.userData
        OutCome = (
            <DistributorScheduleView data={userDistributor}/>
        )
    }else if(user.Role === 'Supplier'){
        userSupllier = props.userData
        OutCome = (
            <SupplierScheduleView data={userSupllier} />
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