import React, { useState, useContext } from 'react'
import { IonRow, IonCol, IonButton, IonIcon, IonSpinner,IonAlert } from '@ionic/react'
import { InputControls } from '../components/Input';
import { gql, useMutation } from '@apollo/client'
import { logIn } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'
import { AuthContext } from '../context/Auth'
import {person,lockClosed} from 'ionicons/icons'

function UserLogin(props) {
    const context = useContext(AuthContext)
    const [errors, setError] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUser, {
        username: '',
        password: '',
    })

    const [userNotFoundAlert,setUserNotFoundAlert] = useState(false)

    // below is function that interact with login API
    const [LoginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            console.log(result.data.user.login);
            context.login(result.data.user.login)



            //redirect to home page when success
            props.props.history.push('/Posts')
        },
        onError(err) {
            setError(err.graphQLErrors)
        },
        variables: values
    })

    function loginUser() {
        clearError()
        LoginUser()
    }

    const clearError = () => {
        setError({})
    }

    if( errors.length >0) {
        setUserNotFoundAlert(true)
        clearError()
    }

    let outCome;
    if (loading) {
        outCome = <IonSpinner color="warning" className="spinner-login-register" />
    } else {
        outCome = (
            <IonRow>
                <IonCol>
                    <IonAlert
                        isOpen={userNotFoundAlert}
                        onDidDismiss={() => setUserNotFoundAlert(false)}
                        header={'User not Found!'}
                        buttons={['Okay']}
                    />
                    <InputControls type="username"
                        display={ <div><IonIcon icon={person}/> Username</div>} 
                        name="username"
                        focus="true"
                        onChange={onChange}
                        value={values.username}
                        errorMessage={Object.keys(errors).length > 0 && errors.username} />

                    <InputControls
                        type="password"
                        display={ <div><IonIcon icon={lockClosed}/> Password</div>}
                        name="password"
                        onChange={onChange}
                        value={values.password}
                        errorMessage={Object.keys(errors).length > 0 && errors.password} />

                    <IonButton
                        expand="block"
                        color="warning"
                        className="login-register-button"
                        router-direction="forward" routerAnimation
                        onIonFocus={onSubmit}><IonIcon slot="start" icon={logIn} />Login</IonButton>

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
        user{
            login(input:{
                username: $username
                password: $password
            }){
            access_token
            user{
                username
                email
                role
                hashed_password
            }
        }
    }
}
`

export default UserLogin;