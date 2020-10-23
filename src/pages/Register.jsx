import React,{useState} from 'react'
import {IonRow, IonCol} from '@ionic/react'
import { ConfirmPasswordInput, EmailInput,UsernameInput,PasswordInput,RoleInput } from '../components/Input';


function UserRegister(){

    const [role,setRole] = useState()

    const selectCalcUnitHandler = (value) => {
        setRole(value)
    }
    return (
        <IonRow>
            <IonCol>
                <UsernameInput />
                <EmailInput />
                <PasswordInput />
                <ConfirmPasswordInput />
                <RoleInput role={role} onSelectValue={selectCalcUnitHandler}/>
            </IonCol>           
        </IonRow>
    )
}

export default UserRegister;