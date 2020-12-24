import React, { useState,useContext } from 'react'
import { IonRow, IonCol, IonButton, IonIcon,IonSpinner,IonAlert} from '@ionic/react'

import { InputControls, RoleInput } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { bagAdd,logoWhatsapp,mail,person,lockClosed,lockOpen } from 'ionicons/icons'
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
        role: '',
        wa_number: ''
    })
    

    const [addUser,{loading}] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result)
            context.login(result.data.user.register)
            
            console.log("aaa")


            //redirect to home page when success
            if(values.role === 'Supplier'){
                props.props.history.push('/Distributor')

            }else{
                props.props.history.push('/Commodity')
            }
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
        outCome = <IonSpinner color="warning" className="spinner-login-register" />
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
                        display={ <div><IonIcon icon={person}/> Username</div>} 
                        onChange={onChange} 
                        value={values.username} 
                        errorMessage={Object.keys(erro).length > 0 && erro.username }/>

                        <InputControls 
                        type="email" 
                        display={ <div><IonIcon icon={mail}/> Email</div>}
                        name="email" 
                        onChange={onChange} 
                        value={values.email} 
                        errorMessage={Object.keys(erro).length > 0 && erro.email }/>

                        <InputControls 
                        type="wa_number" 
                        name="wa_number" 
                        display={ <div><IonIcon icon={logoWhatsapp}/> Whatsapp Number</div>}
                        onChange={onChange} 
                        value={values.username} 
                        errorMessage={Object.keys(erro).length > 0 && erro.username }/>

                        <InputControls 
                        type="password" 
                        display={ <div><IonIcon icon={lockClosed}/> Password</div>}
                        name="password" 
                        onChange={onChange} 
                        value={values.password} 
                        errorMessage={Object.keys(erro).length > 0 && erro.password }/>

                        <InputControls 
                        type="password" 
                        display={ <div><IonIcon icon={lockOpen}/> Confirm Password</div>}
                        name="confirm_password" 
                        onChange={onChange} 
                        value={values.confirmPassword} 
                        errorMessage={Object.keys(erro).length > 0 && erro.confirmPassword }/>

                        <RoleInput role={role} onSelectValue={selectCalcUnitHandler} name="role" onChange={onChange} value={values.role} placeholder={Object.keys(erro).length > 0 && erro.role }/>                  
                        
                        <IonButton                    
                        expand="block"  
                        color="warning"                     
                        className="login-register-button" 
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
        $wa_number: String!    
    ){
        user{
            register(
                input: {
                    username: $username
                    email: $email
                    password: $password
                    confirm_password: $confirm_password
                    role: $role
                    whatsapp_number: $wa_number
                }
            ){
                access_token
                user{
                    username
                    email
                    role
                    whatsapp_number
                    hashed_password
                }
            }
        }
    }
`

export default UserRegister;