import React from 'react'
import {IonItem,IonLabel,IonInput,IonSelect,IonSelectOption} from '@ionic/react'


function InputControls(props){
    return(
        <IonItem>
            <IonLabel position="floating">{props.display}</IonLabel>
            <IonInput type={props.type} ref={props.ref} autofocus={props.focus} clearInput="true" onIonChange={props.onChange}></IonInput>
        </IonItem>
    )
}



function RoleInput(props){
    const inputChangeHandler = (event) => {
        props.onSelectValue(event.detail.value)
        props.onChange(event)
    }
    return(
        <IonItem className="ion-margin-top">
            <IonLabel>Role</IonLabel>
            <IonSelect value={props.role} placeholder="Select One Role" onIonChange={inputChangeHandler} okText="Okay" cancelText="Dismiss">
              <IonSelectOption value="Supplier">Supplier</IonSelectOption>
              <IonSelectOption value="Distributor">Distributor/Reseller</IonSelectOption>
            </IonSelect>
        </IonItem>
    )
}

export {InputControls,RoleInput}