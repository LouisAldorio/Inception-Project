import React from 'react'
import {IonSegment,IonSegmentButton,IonLabel} from '@ionic/react'

function MenuBar(props){
    
    const inputChangeHandler = (event) => {
        props.onSelectValue(event.detail.value)
    }

    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler} >

            <IonSegmentButton value="Register">
                <IonLabel>Register</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="Login">
                <IonLabel>Login</IonLabel>
            </IonSegmentButton>
            
        </IonSegment>
    )  
}

export {MenuBar}