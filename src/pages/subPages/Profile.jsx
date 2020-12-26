import { IonContent, IonPage,IonButton } from '@ionic/react';
import React,{useContext} from 'react'
import Header from '../../components/Header';
import { AuthContext } from '../../context/Auth';

function Profile(props){

    const {user,logout} = useContext(AuthContext)

    function logOut(){
        logout()    
    }
    return (
        <React.Fragment>
            <Header />
            <IonContent>
                Profile
                
                {user && (<IonButton onClick={logOut} >log out</IonButton>)}
            </IonContent>
        </React.Fragment>
        
    )
}
export default Profile;