import React from 'react'
import {IonItem,IonLabel,IonInput,IonSelect,IonSelectOption} from '@ionic/react'

function UsernameInput(props){
    return(
        <IonItem>
            <IonLabel position="floating">Username </IonLabel>
            <IonInput type="username" ref={props.usernameInputRef} autofocus="true" clearInput="true"></IonInput>
        </IonItem>
    )
}

function PasswordInput(props){
    return(
        <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput type="password" ref={props.passwordInputRef} clearInput="true"></IonInput>
        </IonItem>
    )
}

function EmailInput(props){
    return(
        <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" ref={props.emailInputRef} clearInput="true"></IonInput>
        </IonItem>
    )
}

function ConfirmPasswordInput(props){
    return(
        <IonItem>
            <IonLabel position="floating">Confirm Password</IonLabel>
            <IonInput type="password" ref={props.confirmPasswordInputRef} clearInput="true"></IonInput>
        </IonItem>
    )
}

function RoleInput(props){
    const inputChangeHandler = (event) => {
        props.onSelectValue(event.detail.value)
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

export {UsernameInput,PasswordInput,EmailInput,ConfirmPasswordInput,RoleInput}