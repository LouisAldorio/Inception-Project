import React, { useState,useContext } from 'react'
import { IonRow, IonCol, IonButton, IonIcon,IonSpinner,IonAlert} from '@ionic/react'

import { InputControls, RoleInput } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { bagAdd } from 'ionicons/icons'
import { mapForm, useForm } from '../utils/Hooks'
import {AuthContext} from '../context/Auth'
import '../App.css'

function UserRegister(props) {
    const context = useContext(AuthContext)
    const [errors, setError] = useState({})

    const [role, setRole] = useState()
    const selectCalcUnitHandler = (value) => {
        setRole(value)
    }

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        role: ''
    })
    

    const [addUser,{loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            // context.login(result.data.register)
            console.log(result);
            console.log("aaa")

            //redirect to home page when success
            // props.props.history.push("/Posts")
        },
        onError(err){
            console.log(err.graphQLErrors);
            setError(err.graphQLErrors)
        },
        variables: values
    })

    // below is function that interact with register API
    function registerUser() {
        clearError()
        addUser()     
    }
    const clearError = () => {
        setError({})
    }
    
    //map error as object
    const erro = mapForm(errors)

    //role alert
    const [roleAlert,setRoleAlert] = useState(false)
    if(Object.keys(erro).length > 0  && erro.role){
        setRoleAlert(true)
        clearError()
    }

    //username taken alert
    const [userRegistered,setUserRegistered] = useState(false)
    if(Object.keys(erro).length > 0  && erro.registered){
        setUserRegistered(true)
        clearError()
    }
    
    let outCome;

    if(loading) {
        outCome = <IonSpinner name="circles" className="spinner-login-register" />
    }else{
        outCome = (
            <React.Fragment >
                <IonAlert
                    isOpen={roleAlert}
                    onDidDismiss={() => setRoleAlert(false)}
                    cssClass='my-custom-class'
                    header={'Choose One Role'}
                    message={'To Proceed , Please Choose one Role!'}
                    buttons={['Okay']}
                />
                <IonAlert
                    isOpen={userRegistered}
                    onDidDismiss={() => setUserRegistered(false)}
                    cssClass='my-custom-class'
                    header={'Username has been registered or taken!'}
                    message={erro.registered}
                    buttons={['Okay']}
                />
                <IonRow>
                    <IonCol>
                        <InputControls 
                        type="username" 
                        focus="true" 
                        name="username" 
                        display="Username" 
                        onChange={onChange} 
                        value={values.username} 
                        errorMessage={Object.keys(erro).length > 0 && erro.username }/>

                        <InputControls 
                        type="email" 
                        display="Email" 
                        name="email" 
                        onChange={onChange} 
                        value={values.email} 
                        errorMessage={Object.keys(erro).length > 0 && erro.email }/>

                        <InputControls 
                        type="password" 
                        display="Password" 
                        name="password" 
                        onChange={onChange} 
                        value={values.password} 
                        errorMessage={Object.keys(erro).length > 0 && erro.password }/>

                        <InputControls 
                        type="password" 
                        display="Confirm Password" 
                        name="confirm_password" 
                        onChange={onChange} 
                        value={values.confirmPassword} 
                        errorMessage={Object.keys(erro).length > 0 && erro.confirmPassword }/>

                        <RoleInput role={role} onSelectValue={selectCalcUnitHandler} name="role" onChange={onChange} value={values.role} placeholder={Object.keys(erro).length > 0 && erro.role }/>                  
                        
                        <IonButton                    
                        expand="block"                       
                        className="login-register-button color" 
                        router-direction="forward" routerAnimation 
                        onIonFocus={onSubmit}><IonIcon slot="start" icon={bagAdd} />Register</IonButton>

                    </IonCol>
                </IonRow>
                
            </React.Fragment>
        )
    }

    return outCome
}



const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirm_password: String!
        $role: String!      
    ){
        user{
            register(
                input: {
                    username: $username
                    email: $email
                    password: $password
                    confirm_password: $confirm_password
                    role: $role
                }
            )
        }
    }
`

export default UserRegister;