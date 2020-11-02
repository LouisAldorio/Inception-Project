import { IonContent, IonPage,IonButton } from '@ionic/react';
import React,{useContext} from 'react'
import { AuthContext } from '../../context/Auth';

function Profile(props){

    const {user,logout} = useContext(AuthContext)

    function logOut(){
        logout()    
    }
    return (
        <IonPage>
            <IonContent>
                Profile
                {user && (<IonButton onClick={logOut} >log out</IonButton>)}
            </IonContent>
        </IonPage>
        
    )
}
export default Profile;