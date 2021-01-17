import React, { useRef, useState,useEffect } from 'react'
import {useQuery,useMutation} from '@apollo/client'
import { IonAvatar,IonPopover, IonContent,IonFab,IonFabButton,IonIcon,IonCardHeader, IonCard,IonCardContent,IonLabel, IonItem,IonSpinner,IonItemSliding,IonItemOption,IonItemOptions, IonCardSubtitle, IonGrid, IonRow, IonCol, IonCardTitle, IonChip, IonModal,IonHeader,IonToolbar,IonButtons,IonTitle,IonBackButton, IonList, IonListHeader} from '@ionic/react'
import {add,infiniteOutline,logoWhatsapp,mail,arrowBack,chevronBack,trashBin,closeCircleOutline} from 'ionicons/icons'



import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import Header from '../../components/Header'
import Clock from '../../components/Clock'
import SchedulePost from '../../components/CreateSchedule'
import {FETCH_SCHEDULE,FETCH_USER_BY_USERNAME,FETCH_FRIEND_LIST_DISTRIBUTOR} from '../../utils/graphql'
import DeleteSchedule from '../../components/DeleteSchedule'




function Schedule(props){

    const {user} = useContext(AuthContext)

    const [modalState,setModalState] = useState(false)
    const [openCreateForm, setOpenCreateForm] = useState(false)
    const deleteButtonRef = useRef([])
    
    const [showPopover, setShowPopover] = useState({
        open: false,
        event: undefined,
        data: undefined,
      });

    const {loading,data} = useQuery(FETCH_SCHEDULE,{
        onCompleted: () => {
            console.log(data.schedule_by_user)
        }
    })

    const {loading: supplierLoading,data: supplierData} = useQuery(FETCH_USER_BY_USERNAME,{
        variables: {
            username: user.Username
        },
    })
    const {loading: distributorLoading,data: distributorData} = useQuery(FETCH_FRIEND_LIST_DISTRIBUTOR,{
        variables: {
            username: user.Username
        },
    })


    const [modalData,setModalData] = useState(null)

    function ToggleModal(data) {
        setModalData(data)
        setModalState(true)
    }

    function CleanData(){
        setModalState(false)
        setModalData(null)
    }

    //toggle option button
    function ToggleOption(i){
        deleteButtonRef.current[i].getSlidingRatio().then(number => {
            
            if(number > 0){
                deleteButtonRef.current[i].close()
            }else{
                deleteButtonRef.current[i].open()
            }         
        })  
    }

    //mutations delete 
    // const [DeleteSchedule,{loading: DeleteLoading}] = useMutation(DELETE_SCHEDULE,{
    //     variables: {
            
    //     },
    //     update(proxy,result){

    //         const data = proxy.readQuery({query: FETCH_SCHEDULE})
    //         proxy.writeQuery({query:FETCH_SCHEDULE,data:{schedule_by_user: [result.data.schedule.create,...data.schedule_by_user]}})
    //         props.stateModelHandler(false)
    //     },
    //     onError(error){
    //         console.log(error)
    //     }
    // })

    return (
        <React.Fragment> 
            <Header />             
            <IonContent scrollEvents={true}
                onIonScrollStart={() => {}}
                onIonScroll={() => {}}
                onIonScrollEnd={() => {}} className='ion-content-bottom'> 
                <Clock />

                {loading ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : (
                    <div className="schedule-list">
                        {data.schedule_by_user.length > 0 ? data.schedule_by_user.map((image, i) => (
                            <IonItemSliding key={i} ref={el => deleteButtonRef.current[i] = el}> 
                                                                                    
                                <IonItem slots="start" routerAnimation className="post-item"  lines={"none"} >
                                    <IonIcon icon={chevronBack} slot="end" color="medium" onClick={() => ToggleOption(i)}></IonIcon>
                                    <IonCard key={i}  className="Ubuntu" onClick={() => ToggleModal(image)}>
                                        <IonItem >
                                            <h4>{image.schedule_name}</h4>
                                            <IonAvatar slot="end">
                                                <img src={image.involved_users[0].profile_image} />
                                            </IonAvatar>
                                            <IonAvatar slot="end">
                                                <img src={image.involved_users[1].profile_image} />
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
                                                    <IonCol size="7">
                                                        Amount: {image.dealed_unit}
                                                    </IonCol>
                                                    <IonCol size="5">
                                                        <IonCardSubtitle>{`${image.start_time} - ${image.end_time}`}</IonCardSubtitle>
                                                    </IonCol>
                                                </IonRow>
                                            </IonGrid>                               
                                        </IonCardContent>                              
                                    </IonCard>                            
                                </IonItem>
                            
                                {user && (
                                    <IonItemOptions side="end" > 
                                        <IonItemOption  color="warning" onClick={() => ToggleOption(i)}>UPDATE</IonItemOption>
                                        {/* <IonItemOption  color="danger" onClick={() => {
                                            ToggleOption(i)
                                        }}>DELETE</IonItemOption> */}
                                        <DeleteSchedule ToggleOption={ToggleOption} i={i} id={image.id}/>
                                        <IonItemOption  color="medium" onClick={() => ToggleOption(i)}>CANCEL</IonItemOption>
                                    </IonItemOptions>
                                )}
                                
                            </IonItemSliding>
                        
                        )) :  <img id="photo-fullscreen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Tl87UxYtH39b-RUyxSB2SrtNkPZB_55dtw&usqp=CAU"/>    
                    }              
                    </div> 
                )}
                
                

                <IonFab vertical="bottom" horizontal="end" edge id="schedule-add" slot='fixed' >
                    <IonFabButton color="warning" onClick={() => setOpenCreateForm(true)} disabled={supplierLoading || distributorLoading}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                                            
            </IonContent> 
            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>                      
                        <IonButtons slot="start">                           
                            <IonBackButton defaultHref="/Posts" onClick={()=> CleanData()} />                           
                        </IonButtons>
                        <IonTitle>Schedule Details</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true}>
                    <IonCard>
                        {modalData && (                         
                            <IonItem lines="full">
                                <IonAvatar >
                                    <img src={modalData.involved_users[0].profile_image} />
                                </IonAvatar>
                                
                                <IonLabel>
                                    <img src={"https://i.pinimg.com/originals/69/94/87/699487bb246152a16ccedd1a18814b4e.gif"} />
                                </IonLabel>
                                
                                <IonAvatar >
                                    <img src={modalData.involved_users[1].profile_image} />
                                </IonAvatar>
                            </IonItem>              
                        )}
                        
                        <IonCardHeader>
                            <IonCardTitle>{modalData && modalData.schedule_name}</IonCardTitle>
                            <IonCardSubtitle>{modalData && modalData.commodity_name}</IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonCard>
                                <IonCardContent>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="7">
                                                Amount: {modalData && modalData.dealed_unit}
                                            </IonCol>
                                            <IonCol size="5">
                                                <IonCardSubtitle>{`${modalData && modalData.start_time} - ${modalData && modalData.end_time}`}</IonCardSubtitle>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            {modalData && modalData.day.length > 0 && modalData.day.map((day,i) => 
                                                (
                                                    <IonChip key={i} color="warning">
                                                        <IonLabel>{day.charAt(0).toUpperCase() + day.slice(1)}</IonLabel>
                                                    </IonChip>
                                            ))}
                                        </IonRow>
                                        <IonRow>
                                            <h2>Start Date : {modalData && modalData.start_date}</h2>
                                            <h2>End Date  &nbsp;: { modalData && (modalData.end_date === '' ? <>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<IonIcon icon={infiniteOutline} slot="end"></IonIcon></> : modalData.end_date)}</h2>
                                        </IonRow>
                                    </IonGrid>  
                                </IonCardContent>
                            </IonCard>
                            <IonCardHeader> 
                                <IonPopover 
                                isOpen={showPopover.open}
                                event={showPopover.event}                           
                                onDidDismiss={e => setShowPopover({open: false, event: undefined})}>
                                <IonList>
                                    <IonListHeader>User's Profile</IonListHeader>
                                    <IonItem>
                                        <IonAvatar slot="start">
                                            <img src={showPopover.data && showPopover.data.profile_image} alt=""/>
                                        </IonAvatar>
                                        <IonLabel> {showPopover.data && showPopover.data.username}</IonLabel>
                                    </IonItem>
                                    <IonItem button><IonIcon icon={mail} slot="end"></IonIcon>{showPopover.data && showPopover.data.email}</IonItem>
                                    <IonItem button href={`//api.whatsapp.com/send?phone=62${showPopover.data && showPopover.data.whatsapp_number}&text=Hello`}><IonIcon icon={logoWhatsapp} slot="start"></IonIcon>{showPopover.data && showPopover.data.whatsapp_number}</IonItem>
                                </IonList>
                            </IonPopover>
                                <IonChip onClick={e => setShowPopover({open: true, event: e.nativeEvent,data: modalData.involved_users[0]})}>
                                    <IonAvatar>
                                        <img src={modalData && modalData.involved_users[0].profile_image} alt=""/>
                                    </IonAvatar>
                                    <IonLabel>{modalData && modalData.involved_users[0].username}</IonLabel>
                                </IonChip>
                                <IonChip onClick={e => setShowPopover({open: true, event: e.nativeEvent,data:modalData.involved_users[1]})}>
                                    <IonAvatar>
                                        <img src={modalData && modalData.involved_users[1].profile_image} alt=""/>                   
                                    </IonAvatar>
                                    <IonLabel>{modalData && modalData.involved_users[1].username}</IonLabel>
                                </IonChip>                       
                            </IonCardHeader>
                        </IonCardContent>
                    </IonCard>          
                </IonContent>              
            </IonModal>

            {/* below is modal for creating schedule */}
            <SchedulePost isOpen={openCreateForm} stateHandler={setOpenCreateForm} userData={user.Role === 'Distributor' ? distributorData : supplierData && supplierData.user_by_username}/>
        </React.Fragment>
         
    )
}

export default Schedule


                                