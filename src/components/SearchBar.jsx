import { IonCol, IonGrid, IonItem,IonRow, IonSearchbar } from '@ionic/react'
import moment from 'moment'
import React, { useState } from 'react'
import '../App.css'

function SearchBar(props){

    function onSearchChange(event){
        props.changeHandler(event.detail.value)
    }
    // console.log(props.selectedValue);
    return (   
        <IonGrid id="search-bar" slot='fixed'>
            <IonRow>
                <IonCol size='12'><IonSearchbar animated={true} value={props.selectedValue} placeholder="Commodity Name!" onIonChange={onSearchChange}/></IonCol>
            </IonRow>           
        </IonGrid>                        
    )
}

export default SearchBar;
