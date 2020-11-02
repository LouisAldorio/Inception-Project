import React, { useState,useContext } from 'react'
import { IonRow, IonCol, IonButton, IonIcon,IonSpinner } from '@ionic/react'
import { InputControls } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { star } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'
import {AuthContext} from '../context/Auth'

function UserLogin(props){
    const context = useContext(AuthContext)
    const [errors, setError] = useState({})

    const {onChange,onSubmit,values} = useForm(loginUser,{
        username: '',
        password: '',
    })

    // below is function that interact with login API
    const [LoginUser,{loading}] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login)

            //redirect to home page when success
            props.props.history.push('/Posts')
        },
        onError(err) {
            setError(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    })

    function loginUser(){
        clearError()
        LoginUser()
    }

    const clearError = () => {
        setError({})
    }

    let outCome;
    if(loading){
        outCome = <IonSpinner name="circles" className="spinner-login-register" />
    }else{
        outCome = (
            <IonRow>
                <IonCol>
                    <InputControls type="username" 
                    display="Username" 
                    name="username" 
                    focus="true" 
                    onChange={onChange} 
                    value={values.username} 
                    errorMessage={Object.keys(errors).length > 0 && errors.username}/>

                    <InputControls 
                    type="password" 
                    display="Password" 
                    name="password" 
                    onChange={onChange} 
                    value={values.password} 
                    errorMessage={Object.keys(errors).length > 0 && errors.password}/>

                    <IonButton 
                    expand="block" 
                    color="dark" 
                    className="login-register-button" 
                    router-direction="forward" routerAnimation 
                    onIonFocus={onSubmit}><IonIcon slot="start" icon={star}/>Login</IonButton>

                </IonCol>           
            </IonRow>
        )
    }

    return outCome
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
            username: $username
            password: $password          
        ) {
            id
            email
            username
            createdAt
            token
        }
    }
`

export default UserLogin;