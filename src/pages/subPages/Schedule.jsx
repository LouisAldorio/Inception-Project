import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonAvatar, IonContent,IonFab,IonFabButton,IonIcon,IonInfiniteScroll,IonInfiniteScrollContent,IonSpinner, IonCard,IonCardContent,IonCardHeader,IonLabel, IonItem, IonImg,IonItemSliding,IonItemOption,IonItemOptions} from '@ionic/react'
import {add} from 'ionicons/icons'


import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import Header from '../../components/Header'
import Clock from '../../components/Clock'



function Schedule(props){

    const {user} = useContext(AuthContext)

    const items = [
        {
            schedule_name: "Transport beras merah",
            commodity_name: "Beras Raskin",
            dealed_unit: "100 kg",
            start_date: "2020-11-20",
            end_date: "",
            day: ["monday","wednesday","friday"],
            start_time: "08:00",
            end_time: "10:00",
            invloved_users: [
                {
                    userImg: "https://drive.google.com/uc?export=view&id=1Bg1c5HJcIB2CKT17uJ53CWZpNhkYynlV",
                    username: "Louis Aldorio",
                    email:"louisaldorio@gmail.com",
                    WANumber:"082161723455",
                },{
                    userImg: "https://drive.google.com/uc?export=view&id=1Nd6n86C8jZRsII8wJ2CATVxrFtxBgLTN",
                    username: "Louis Aldorio",
                    email:"louisaldorio@gmail.com",
                    WANumber:"082161723455",
                }
            ], 
        },
    ];


    return (
        <React.Fragment> 
            <Header />  
            
            <IonContent scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}} className='ion-content-bottom'> 
                <Clock />

                <div className="schedule-list">
                    {items.length > 0 ? items.map((image, i) => (
                        <IonItemSliding key={i}>                                                      
                            <IonItem slots="start" routerAnimation className="post-item" onClick={()=> console.log("clicked")} lines={"none"}>
                                <IonCard key={i}  className="Montserrat">
                                    <IonItem>
                                        <h4>{image.schedule_name}</h4>
                                        <IonAvatar slot="end">
                                            <img src={image.invloved_users[0].userImg} />
                                        </IonAvatar>
                                        <IonAvatar slot="end">
                                            <img src={image.invloved_users[1].userImg} />
                                        </IonAvatar>
                                    </IonItem>
                                    <IonCardContent>
                                        
                                    </IonCardContent>                              
                                </IonCard>                            
                            </IonItem>
                        
                            {user && (
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" onClick={() => console.log('share clicked')}>Delete</IonItemOption>
                                </IonItemOptions>
                            )}
                            
                        </IonItemSliding>
                       
                    )) :  <img id="photo-fullscreen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Tl87UxYtH39b-RUyxSB2SrtNkPZB_55dtw&usqp=CAU"/>    
                  }              
                </div> 
                

                <IonFab vertical="bottom" horizontal="end" edge id="schedule-add" slot='fixed'>
                    <IonFabButton color="warning">
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                                            
            </IonContent> 
            
            
        </React.Fragment>
         
    )
}

export default Schedule


                                