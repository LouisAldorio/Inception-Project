import React from 'react'
import { IonHeader, IonTitle, IonToolbar} from '@ionic/react'
function Header(props){
    
    return (
        <IonHeader>           
            <IonToolbar className="color">
                <IonTitle className="srisakdi">
                    Wholesaler
                </IonTitle>          
            </IonToolbar>
        </IonHeader>
    )
}

export default Header;