import React from 'react';
import { IonButton, IonDatetime } from '@ionic/react';
import '@ionic/react/css/core.css';
import './App.css';

function App() {
  return (
    <div>
      <IonDatetime displayFormat="MM/DD/YYYY" placeholder="Select Date"></IonDatetime>
      <IonButton fill="outline">Start</IonButton>
    </div>
  );
}

export default App;
