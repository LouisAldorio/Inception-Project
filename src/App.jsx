import React from 'react';
import {Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import { IonApp, IonContent, IonGrid} from '@ionic/react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client'



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

const httpLink = createHttpLink({
  uri: 'http://localhost:5000',
})
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <IonApp>
        <Header />
    
        <IonContent className="ion-padding">

          <IonGrid>
            
            
            <Route exact path="/" component={LoginOrRegister}/>
            <Route exact path="/home" component={Home}/>
                      
          </IonGrid>  
        </IonContent>     
      </IonApp>
    </Router>
  </ApolloProvider>
  );
}

export default App;
