import { IonModal,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle, IonContent, IonPicker,IonButton } from '@ionic/react'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Auth'
import ScheduleView from './Schedule'


function SchedulePost(props){
    const {user} = useContext(AuthContext)

    function closeModal(){
        props.stateHandler(false)
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
                    <ScheduleView data={props.userData} stateModelHandler={props.stateHandler}/>
                </IonContent>
            </IonModal>
        </React.Fragment>
    )
}

export default SchedulePost;