import React from 'react'
import {IonItem,IonLabel,IonInput,IonSelect,IonSelectOption, IonIcon, IonTextarea} from '@ionic/react'
import {ticket,clipboard} from 'ionicons/icons'


function InputControls(props){

    return(
        <IonItem>
            <IonLabel position="floating" color="medium">{props.errorMessage ? props.errorMessage : props.display}</IonLabel>
            <IonInput type={props.type} ref={props.ref} name={props.name} autofocus={props.focus} clearInput="true" onIonChange={props.onChange} ></IonInput>
        </IonItem>
    )
}

function InputTextArea(props){

    return(
        <IonItem>
            <IonLabel position="floating" color="medium">{props.errorMessage ? props.errorMessage : props.display}</IonLabel>
            <IonTextarea  ref={props.ref} name={props.name} autofocus={props.focus} clearInput="true" onIonChange={props.onChange} ></IonTextarea>
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
            <IonLabel><IonIcon icon={ticket} /> Role</IonLabel>
            <IonSelect value={props.role} name={props.name} placeholder={props.placeholder ? props.placeholder : "Choose Role"} onIonChange={inputChangeHandler} okText="Okay" cancelText="Dismiss">
              <IonSelectOption value="Supplier">Supplier</IonSelectOption>
              <IonSelectOption value="Distributor">Distributor/Reseller</IonSelectOption>
            </IonSelect>
        </IonItem>
        
    )
}

function UnitTypeInput(props){
    const inputChangeHandler = (event) => {
        props.onSelectValue(event.detail.value)
        props.onChange(event)
    }

    return(
        <IonItem className="ion-margin-top">
            <IonLabel><IonIcon icon={clipboard} /> Unit Type</IonLabel>
            <IonSelect value={props.unit_type} name={props.name} placeholder={props.placeholder ? props.placeholder : "Unit Type"} onIonChange={inputChangeHandler} okText="Okay" cancelText="Dismiss">
              <IonSelectOption value="Kg">Kg</IonSelectOption>
              <IonSelectOption value="Unit">Unit</IonSelectOption>
            </IonSelect>
        </IonItem>
        
    )
}

export {InputControls,RoleInput,UnitTypeInput,InputTextArea}