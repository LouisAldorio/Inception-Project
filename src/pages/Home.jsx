import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {IonPage,IonTabs,IonTabBar,IonTabButton,IonLabel,IonIcon,IonRouterOutlet} from '@ionic/react'
import {  home,personCircle,calendar } from 'ionicons/icons';

import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import Profile from './subPages/Profile';
import Posts from './subPages/Posts';
import Schedule from './subPages/Schedule';



function MyApp(props) {

    const {user} = useContext(AuthContext)

    let result;
    if(user) {
        result = (
            <IonPage>
                <IonTabs>
                    <IonRouterOutlet>
                        <Redirect from='/home' to='/Posts' /> 
                        <Route exact path='/posts/:postId' component={Profile} />
                        <Route path="/:tab(Posts)" component={Posts} exact />
                        <Route path="/:tab(Profile)" component={Profile} exact />  
                        <Route path="/:tab(Schedule)" component={Schedule} exact />                   
                    </IonRouterOutlet>
                    
                    <IonTabBar slot="bottom" color='warning'>
                        <IonTabButton tab="Posts" href="/Posts" >
                            <IonIcon icon={home} />
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="Schedule" href='/Schedule' >
                            <IonIcon icon={calendar} />
                            <IonLabel>Schedule</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="Profile" href='/Profile' >
                            <IonIcon icon={personCircle} />
                            <IonLabel>Profile</IonLabel>
                        </IonTabButton>                       
                    </IonTabBar>    
                </IonTabs>
            </IonPage>  
        )
    }else{
        result = <Redirect to='/' />
    }
    
    return result
}

export default MyApp;
