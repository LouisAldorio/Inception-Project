import React from 'react'
import {IonSegment,IonSegmentButton,IonLabel} from '@ionic/react'

function MenuBar(props){
    
    const inputChangeHandler = (event) => {
        props.onSelectValue(event.detail.value)
    }


    return (
        <IonSegment value={props.selectedValue} onIonChange={inputChangeHandler} color="dark">
 
            <IonSegmentButton value="Register" >
                <IonLabel>REGISTER</IonLabel>
            </IonSegmentButton>

            <IonSegmentButton value="Login">
                <IonLabel>LOGIN</IonLabel>
            </IonSegmentButton>

        </IonSegment>
    )  
}

export {MenuBar}