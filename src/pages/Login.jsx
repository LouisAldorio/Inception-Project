import React from 'react'
import {InputControls} from '../components/Input'
import {IonRow,IonCol,IonIcon,IonButton} from '@ionic/react'
import {star} from 'ionicons/icons'
import {useForm} from '../utils/Hooks'

function UserLogin(){

    const {onChange,onSubmit,values} = useForm(loginUser,{
        username: '',
        password: '',
    })


    // below is function that interact with login API
    function loginUser() {

    }


    return (
        <IonRow>
            <IonCol>
                <InputControls type="username" display="Username" focus="true" onChange={onChange} value={values.username}/>
                <InputControls type="password" display="Password" onChange={onChange} value={values.password}/>
                <IonButton expand="block" color="dark" className="login-register-button" router-direction="forward" routerAnimation onIonFocus={onSubmit}><IonIcon slot="start" icon={star}/>Login</IonButton>
            </IonCol>           
        </IonRow>
    )
}

export default UserLogin;