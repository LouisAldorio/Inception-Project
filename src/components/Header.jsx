import React from 'react'
import { IonHeader, IonTitle, IonToolbar} from '@ionic/react'
function Header(props){
    
    return (
        <IonHeader>           
            <IonToolbar color="warning">
                <IonTitle>
                    WHOLESALER
                </IonTitle>          
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;