import React,{useState} from 'react';
import {Route} from 'react-router-dom'
import {IonReactRouter} from '@ionic/react-router'
import { IonApp, IonCol, IonContent, IonGrid, IonRouterOutlet, IonRow} from '@ionic/react';
import UserLogin from './pages/Login'
import UserRegister from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import { MenuBar } from './components/MenuBar';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
// import './theme/variables.css';
// import { text } from 'ionicons/icons';
import './App.css';


function App() {

  const [LoginOrRegister, setLoginOrRegister] = useState("Register")

  const setLoginOrRegisterHandler = (value) => {
    setLoginOrRegister(value)
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/login" component={UserLogin}/>
          <Route path="/Register" component={UserRegister}/>
          <Route path="/" component={Home}/>
        </IonRouterOutlet>
      </IonReactRouter>

      <Header />
  
      <IonContent className="ion-padding">

        <IonGrid>
          <IonRow>
            <IonCol>
              <MenuBar selectedValue={LoginOrRegister} onSelectValue={setLoginOrRegisterHandler}/>
            </IonCol>
          </IonRow>

          {LoginOrRegister === "Register" ? <UserRegister /> : <UserLogin />}
          
          
        </IonGrid>
        
      </IonContent>
      
    </IonApp>
  );
}

export default App;
