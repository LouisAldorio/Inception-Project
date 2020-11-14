import React,{useContext, useRef} from 'react'
import { IonHeader, IonTitle, IonToolbar,IonMenu, IonContent, IonList, IonItem, IonIcon, IonLabel, IonButton, IonRouterOutlet, IonSplitPane, IonMenuButton,IonButtons, IonCard} from '@ionic/react'
import {heart,paperPlane,mail} from 'ionicons/icons'


import {Route} from 'react-router-dom'
import Posts from '../pages/subPages/CommodityPost'
import Profile from '../pages/subPages/Profile'
import Schedule from '../pages/subPages/Schedule'
import { AuthContext } from '../context/Auth'


function Header(props){
    
    const {user} = useContext(AuthContext)

    let outcome 

    if(user){
        // if(props.dontRender) {
        //     return null
        // }
        outcome = (
            <React.Fragment>
                <IonHeader>
                    <IonToolbar color="warning">
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>WholeSaler</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonMenu  contentId="content">
                    <IonHeader>
                        <IonToolbar color="warning">
                            <IonTitle>WholeSaler</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent id="content">                      
                        <IonItem href='/Posts' button={true} routerAnimation>
                            <IonIcon icon={mail} slot="start"></IonIcon>
                            <IonLabel>Supplier</IonLabel>
                        </IonItem>
                        <IonItem  href='/Schedule' button={true}>
                            <IonIcon icon={paperPlane} slot="start"></IonIcon>
                            <IonLabel>Outbox</IonLabel>
                        </IonItem>
                        <IonItem  href='/Profile' button={true}>
                            <IonIcon icon={heart} slot="start"></IonIcon>
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