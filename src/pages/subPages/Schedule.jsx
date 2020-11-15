import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonButton, IonContent,IonFab,IonFabButton,IonIcon,IonInfiniteScroll,IonInfiniteScrollContent,IonSpinner, IonCard,IonCardContent,IonCardHeader,IonLabel} from '@ionic/react'
import {add} from 'ionicons/icons'


import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import Header from '../../components/Header'



function Schedule(props){

    const {user} = useContext(AuthContext)

    const items = [
        {id:"1", src: ['http://placekitten.com/g/300/500','http://placekitten.com/g/500/500'], text: 'a picture of a cat1' },
        {id:"2", src: ['http://placekitten.com/g/500/500','http://placekitten.com/g/500/500'], text: 'a picture of a cat2' },
        {id:"3", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat3' },
        {id:"4", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat4' },
        {id:"5", src: ['http://placekitten.com/g/500/300','http://placekitten.com/g/500/500'], text: 'a picture of a cat5' },
    ];


    return (
        <React.Fragment> 
            <Header />  
             
            <IonContent scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}}>  


                {items.map((image, i) => (
                        <IonCard key={i}  >
                            <IonCardContent>
                                <IonCardHeader>                              
                                    <img src={image.src[0]} height="250px" width="500px"/>                                                                  
                                </IonCardHeader>
                                <IonCardContent>
                                    <IonLabel>{image.text}</IonLabel>
                                </IonCardContent>
                            </IonCardContent>                              
                        </IonCard>
                    ))}              
                
                <IonFab vertical="bottom" horizontal="end" edge id="schedule-add" >
                    <IonFabButton color="warning">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                
                <IonInfiniteScroll threshold="100px" id="infinite-scroll">                    
                    <IonInfiniteScrollContent loadingSpinner="dots"><IonSpinner color="warning" className="pagination-spinner"></IonSpinner></IonInfiniteScrollContent>
                </IonInfiniteScroll>                               
            </IonContent> 
            
            
        </React.Fragment>
         
    )
}

export default Schedule
