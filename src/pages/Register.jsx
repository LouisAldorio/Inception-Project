import React, { useState,useContext } from 'react'
import { IonRow, IonCol, IonButton, IonIcon} from '@ionic/react'

import { InputControls, RoleInput } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { star } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'
import {AuthContext} from '../context/Auth'

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
        confirmPassword: '',
        email: '',
    })

    const [addUser] = useMutation(REGISTER_USER, {
        update(_, result) {
            context.login(result.data.register)

            //redirect to home page when success
            props.props.history.push("/home")
        },
        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            if(err){
                setError(err.graphQLErrors[0].extensions.exception.errors)
            }        
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

    return (
        <React.Fragment >
            <IonRow>
                <IonCol>
                    <InputControls 
                    type="username" 
                    focus="true" 
                    name="username" 
                    display="Username" 
                    onChange={onChange} 
                    value={values.username} 
                    errorMessage={Object.keys(errors).length > 0 && errors.username}/>

                    <InputControls 
                    type="email" 
                    display="Email" 
                    name="email" 
                    onChange={onChange} 
                    value={values.email} 
                    errorMessage={Object.keys(errors).length > 0 && errors.email}/>

                    <InputControls 
                    type="password" 
                    display="Password" 
                    name="password" 
                    onChange={onChange} 
                    value={values.password} 
                    errorMessage={Object.keys(errors).length > 0 && errors.password}/>

                    <InputControls 
                    type="password" 
                    display="Confirm Password" 
                    name="confirmPassword" 
                    onChange={onChange} 
                    value={values.confirmPassword} 
                    errorMessage={Object.keys(errors).length > 0 && errors.confirmPassword}/>

                    <RoleInput role={role} onSelectValue={selectCalcUnitHandler} name="role" onChange={onChange} value={values.role} />
                    
                    <IonButton 
                    expand="block" 
                    color="dark" 
                    className="login-register-button" 
                    router-direction="forward" routerAnimation 
                    onIonFocus={onSubmit}><IonIcon slot="start" icon={star} />Register</IonButton>

                </IonCol>
            </IonRow>
        </React.Fragment>
    )
}



const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

export default UserRegister;