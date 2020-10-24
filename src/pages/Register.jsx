import React,{useState} from 'react'
import {IonRow, IonCol,IonButton,IonIcon} from '@ionic/react'
import { InputControls,RoleInput } from '../components/Input';
import {star} from 'ionicons/icons'
import {useForm} from '../utils/Hooks'

function UserRegister(){

    const [role,setRole] = useState()

    const selectCalcUnitHandler = (value) => {
        setRole(value)
    }

    const {onChange,onSubmit,values} = useForm(registerUser,{
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: ''
    })


    // below is function that interact with register API
    function registerUser() {

    }

    return (
        <IonRow>
            <IonCol>
                <InputControls type="username" focus="true" display="Username" onChange={onChange} value={values.username}/>
                <InputControls type="email" display="Email" onChange={onChange} value={values.email}/>
                <InputControls type="password"  display="Password" onChange={onChange} value={values.password}/>
                <InputControls type="password"  display="Confirm Password" onChange={onChange} value={values.confirmPassword}/>
                <RoleInput role={role} onSelectValue={selectCalcUnitHandler} onChange={onChange} value={values.role}/>
                <IonButton expand="block" color="dark" className="login-register-button" router-direction="forward" routerAnimation><IonIcon slot="start" icon={star}  onIonFocus={onSubmit} />Register</IonButton>
            </IonCol>           
        </IonRow>
    )
}

export default UserRegister;