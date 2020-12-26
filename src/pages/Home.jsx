import React from 'react';
import {Route,Redirect} from 'react-router-dom'
import {IonPage,IonTabs,IonTabBar,IonTabButton,IonLabel,IonIcon,IonRouterOutlet} from '@ionic/react'
import {  home,personCircle,calendar } from 'ionicons/icons';

import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import Profile from './subPages/Profile';
import Posts from './subPages/Posts';
import Schedule from './subPages/Schedule';
import Header from '../components/Header';




function Home(props) {

    const {user} = useContext(AuthContext)

    let result;
    if(user) {
        result = (                                                           
            <IonTabs>
                <IonRouterOutlet>
                    <Redirect from='/home' to='/Posts' /> 
                    <Route path="/:tab(Posts)" component={Posts} exact />
                    <Route path="/:tab(Profile)" component={Profile} exact />  
                    <Route path="/:tab(Schedule)" component={Schedule} exact />  
                    <Route path="/Supplier" component={Posts} exact />
                    <Route path="/Distributor" component={Schedule} exact />  
                    <Route path="/Reseller" component={Profile} exact />  
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
        )
    }else{
        result = <Redirect to='/' />
    }
    
    return result
}

export default Home;
