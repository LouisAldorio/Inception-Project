import React from 'react'
import {UsernameInput,PasswordInput} from '../components/Input'
import {IonRow,IonCol} from '@ionic/react'

function UserLogin(props){
    return (
        <IonRow>
            <IonCol>
                <UsernameInput />
                <PasswordInput />
            </IonCol>           
        </IonRow>
    )
}

export default UserLogin;