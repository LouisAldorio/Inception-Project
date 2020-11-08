import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonContent,IonPage} from '@ionic/react'

import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'

function Posts(props){

    const {user} = useContext(AuthContext)


    return (
        <IonPage>
            <IonContent scrollEvents={true}
            onIonScrollStart={() => {}}
            onIonScroll={() => {}}
            onIonScrollEnd={() => {}}>

            
            </IonContent> 
            
            
        </IonPage>
         
    )
}


export default Posts;