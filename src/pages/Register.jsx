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
        console.log(values);
    }

    return (
        <IonRow>
            <IonCol>
                <InputControls type="username" focus="true" name="username" display="Username" onChange={onChange} value={values.username}/>
                <InputControls type="email" display="Email" name="email" onChange={onChange} value={values.email}/>
                <InputControls type="password"  display="Password" name="password" onChange={onChange} value={values.password}/>
                <InputControls type="password"  display="Confirm Password" name="confirmPassword" onChange={onChange} value={values.confirmPassword}/>
                <RoleInput role={role} onSelectValue={selectCalcUnitHandler} name="role" onChange={onChange} value={values.role}/>
                <IonButton expand="block" color="dark" className="login-register-button" router-direction="forward" routerAnimation  onIonFocus={onSubmit}><IonIcon slot="start" icon={star} />Register</IonButton>
            </IonCol>           
        </IonRow>
    )
}

export default UserRegister;