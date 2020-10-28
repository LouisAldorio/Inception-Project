import React, { useState } from 'react'
import { IonRow, IonCol, IonButton, IonIcon, IonAlert } from '@ionic/react'
import { InputControls, RoleInput } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { star } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'

function UserRegister(props) {
    const [errors, setError] = useState(false)

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

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            // context.login(result.data.register)
            //redirect to home page when success
            console.log(result.data.register);
            // props.history.push('/')
        },
        onError(error) {
            if (error) {
                console.log(error.graphQLErrors[0].extensions.exception.errors);
                setError(true)
                console.log(errors);
            }
            error = null
        },
        variables: values
    })

    // below is function that interact with register API
    function registerUser() {
        addUser()
    }
    const clearError = () => {
        setError(false)
    }

    return (
        <IonRow>
            <IonCol>
                <InputControls type="username" focus="true" name="username" display="Username" onChange={onChange} value={values.username} />
                <InputControls type="email" display="Email" name="email" onChange={onChange} value={values.email} />
                <InputControls type="password" display="Password" name="password" onChange={onChange} value={values.password} />
                <InputControls type="password" display="Confirm Password" name="confirmPassword" onChange={onChange} value={values.confirmPassword} />
                <RoleInput role={role} onSelectValue={selectCalcUnitHandler} name="role" onChange={onChange} value={values.role} />
                <IonAlert isOpen={errors} message={400} buttons={[{ text: 'Okay', handler: clearError }]} onDidDismiss={clearError} />
                <IonButton expand="block" color="dark" className="login-register-button" router-direction="forward" routerAnimation onIonFocus={onSubmit}><IonIcon slot="start" icon={star} />Register</IonButton>
            </IonCol>
        </IonRow>
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