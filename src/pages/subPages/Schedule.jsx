import React, { useState } from 'react'
import {useQuery} from '@apollo/client'
import { IonAvatar, IonContent,IonFab,IonFabButton,IonIcon, IonCard,IonCardContent,IonLabel, IonItem,IonItemSliding,IonItemOption,IonItemOptions, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardTitle, IonChip, IonModal,IonHeader,IonToolbar,IonButtons,IonTitle,IonBackButton} from '@ionic/react'
import {add,infiniteOutline} from 'ionicons/icons'



import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import Header from '../../components/Header'
import Clock from '../../components/Clock'



function Schedule(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)
    const [value, onChange] = useState(new Date());

    const items = [
        {
            schedule_name: "Transport beras merah",
            commodity_name: "Beras Raskin",
            dealed_unit: "100 kg",
            start_date: "2020-11-20",
            end_date: "",
            day: ["monday","tuesday","wednesday","friday"],
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
        {
            schedule_name: "Transport beras Raskin",
            commodity_name: "Beras Raskin",
            dealed_unit: "100 kg",
            start_date: "2020-11-20",
            end_date: "2020-12-31",
            day: ["monday","tuesday","wednesday","friday"],
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

    const [modalData,setModalData] = useState(null)

    function ToggleModal(image) {
        setModalData(image)
        setModalState(true)
    }

    function CleanData(){
        setModalState(false)
        setModalData(null)
    }


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
                            <IonItem slots="start" routerAnimation className="post-item" onClick={() => ToggleModal(image)} lines={"none"}>
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
                                        <IonCardTitle>Comodity: {image.commodity_name}</IonCardTitle> 
                                        <IonCardContent>
                                            <h2>Days: {image.day.length > 0 && image.day.map((day,i) => 
                                                (
                                                    <IonChip key={i} color="warning">
                                                        <IonLabel>{day.charAt(0).toUpperCase() + day.slice(1).substring(0,2)}</IonLabel>
                                                    </IonChip>
                                                )
                                            )}</h2>
                                            <h2>Start Date : {image.start_date}</h2>
                                            <h2>End Date  &nbsp;: {image.end_date === '' ? <> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<IonIcon icon={infiniteOutline} slot="end"></IonIcon></> : image.end_date}</h2>
                                        </IonCardContent>
                                                                           
                                        <IonGrid>
                                            <IonRow>
                                                <IonCol size="8">
                                                    Amount: {image.dealed_unit}
                                                </IonCol>
                                                <IonCol size="4">
                                                    <IonCardSubtitle>{`${image.start_time} - ${image.end_time}`}</IonCardSubtitle>
                                                </IonCol>
                                            </IonRow>
                                        </IonGrid>                               
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
            <IonModal isOpen={modalState} className="Montserrat">
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Schedule Details</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true}>
                    
                </IonContent>
                
            </IonModal>
            
        </React.Fragment>
         
    )
}

export default Schedule


                                