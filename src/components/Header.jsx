import React from 'react'
import { IonHeader, IonTitle, IonToolbar} from '@ionic/react'
function Header(props){
    
    return (
        <IonHeader>           
            <IonToolbar color="dark">
                <IonTitle>
                    Louis' Social Media
                </IonTitle>          
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;