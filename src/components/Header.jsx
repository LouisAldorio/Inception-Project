import React,{useContext, useRef, useState} from 'react'
import { IonHeader, IonTitle, IonToolbar,IonMenu, IonContent, IonList,IonPopover, IonItem, IonIcon, IonLabel, IonButton, IonRouterOutlet, IonSplitPane, IonMenuButton,IonButtons, IonCard, IonMenuToggle} from '@ionic/react'
import {heart,paperPlane,mail,ellipsisVertical,server,cart,albums} from 'ionicons/icons'

import { AuthContext } from '../context/Auth'


function Header(props){
    
    const {user,logout} = useContext(AuthContext)

    function logOut(){
        logout()    
    }
    const [showPopover, setShowPopover] = useState({
        open: false,
        event: undefined,
      });

    let outcome 
    if(user){
        
        outcome = (
            <React.Fragment>
                <IonHeader>
                    <IonToolbar color="warning">
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>WholeSaler</IonTitle>
                        
                        <IonPopover 
                            isOpen={showPopover.open}
                            event={showPopover.event}                           
                            onDidDismiss={e => setShowPopover({open: false, event: undefined})}
                        >
                            {user && (<IonItem onClick={logOut} >log out</IonItem>)} 
                        </IonPopover>
                        <IonButtons slot="end">
                            <IonButton onClick={e => setShowPopover({open: true, event: e.nativeEvent})}>
                                <IonIcon slot="icon-only" icon={ellipsisVertical}></IonIcon>
                            </IonButton>
                        </IonButtons>
                            
                    </IonToolbar>
                </IonHeader>
                <IonMenu  contentId="content">
                    <IonHeader>
                        <IonToolbar color="warning">
                            <IonTitle>WholeSaler</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent id="content">                      
                        <IonItem href='/Supplier' button={true} routerAnimation>
                            <IonIcon icon={server} slot="start"></IonIcon>
                            <IonLabel>Supplier</IonLabel>
                        </IonItem>
                        <IonItem href='/Commodity' button={true} routerAnimation>
                            <IonIcon icon={albums} slot="start"></IonIcon>
                            <IonLabel>Commodity</IonLabel>
                        </IonItem>
                        <IonItem  href='/Distributor' button={true}>
                            <IonIcon icon={cart} slot="start"></IonIcon>
                            <IonLabel>Distributor</IonLabel>
                        </IonItem>    
                                                                     
                    </IonContent>
                </IonMenu>
            </React.Fragment>
        )
    }else {
        outcome = (
            <IonHeader>
                <IonToolbar color="warning">
                    <IonTitle>WholeSaler</IonTitle>
                </IonToolbar>
            </IonHeader>
        )
    }
    return outcome
}

export default Header;