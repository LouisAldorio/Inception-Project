import React from 'react'
import {IonItem,IonLabel,IonInput,IonSelect,IonSelectOption} from '@ionic/react'


function InputControls(props){
    return(
        <IonItem>
            <IonLabel position="floating" color="medium">{props.display}</IonLabel>
            <IonInput type={props.type} ref={props.ref} name={props.name} autofocus={props.focus} clearInput="true" onIonChange={props.onChange}></IonInput>
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
            <IonSelect value={props.role} name={props.name} placeholder="Select One Role" onIonChange={inputChangeHandler} okText="Okay" cancelText="Dismiss">
              <IonSelectOption value="Supplier">Supplier</IonSelectOption>
              <IonSelectOption value="Distributor">Distributor/Reseller</IonSelectOption>
            </IonSelect>
        </IonItem>
    )
}

export {InputControls,RoleInput}