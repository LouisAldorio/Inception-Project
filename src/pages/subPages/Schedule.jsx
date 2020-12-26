import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonButton, IonContent,IonPage} from '@ionic/react'

import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'

function Schedule(props){

    const {user} = useContext(AuthContext)


    return (
        <IonPage>
            <IonContent scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}>
                Schedule
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>
                <IonButton>tes</IonButton>

            </IonContent> 
            
            
        </IonPage>
         
    )
}

export default Schedule
