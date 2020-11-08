import React from 'react';
import {Route} from 'react-router-dom'
import { IonApp, IonContent, IonGrid} from '@ionic/react';
import {setContext} from 'apollo-link-context'
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'

import { AuthProvider} from './context/Auth'

import Header from './components/Header'
import Home from './pages/Home'
import LoginOrRegister from './pages/LoginOrRegister'

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
import { IonReactRouter } from '@ionic/react-router';

const httpLink = createHttpLink({
  uri: 'https://safe-forest-36324.herokuapp.com/',
})

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken')
  return {
    headers: {
      Authorization: token ? `${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


function App() {

  return (
    <ApolloProvider client={client}>
      <AuthProvider>

        
          <IonApp>
          <IonReactRouter>
            <Header />
        
            <IonContent className="ion-padding">
            
              <IonGrid>
                      
                <Route exact path="/" component={LoginOrRegister}/>
                
                <Home />
                          
              </IonGrid>  
            </IonContent>  

          </IonReactRouter>
        </IonApp>
      

    </AuthProvider>
  </ApolloProvider>
  );
}

export default App;
