import React,{useContext} from 'react'
import {IonButton, IonPage} from '@ionic/react'
import {AuthContext} from '../context/Auth'

function Home(props){
    const {user,logout} = useContext(AuthContext)

    if(!user){
        props.history.push('/')
    }

    function logOut(){
        logout()
        props.history.push('/')
    }

    return (
        <IonPage>
            <IonButton onClick={logOut} to>log out</IonButton>
        </IonPage>
    )
}

export default Home;