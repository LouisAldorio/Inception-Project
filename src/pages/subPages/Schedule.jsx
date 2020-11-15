import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonButton, IonContent,IonGrid,IonRow,IonCol,IonAvatar} from '@ionic/react'


import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import Header from '../../components/Header'



function Schedule(props){

    const {user} = useContext(AuthContext)




    return (
        <React.Fragment>
            <Header />
            <IonContent scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}>
                 
            </IonContent> 
            
            
        </React.Fragment>
         
    )
}

export default Schedule
