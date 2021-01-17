import React,{useContext, useState} from 'react'
import {IonButton,IonItem,IonLabel,IonPicker,IonDatetime, IonContent, IonChip, IonCard, IonIcon,IonToast,IonSpinner} from '@ionic/react'
import moment from 'moment'
import {useForm} from '../utils/Hooks'
import {InputControls} from './Input'
import {pricetag,textOutline} from 'ionicons/icons'
import {CREATE_SCHEDULE,FETCH_SCHEDULE} from '../utils/graphql'
import { AuthContext } from '../context/Auth'
import {useMutation} from '@apollo/client'
import DeleteSchedule from './DeleteSchedule'


function ScheduleView(props){

    const user = props.data

    const {user: loggedInUser} = useContext(AuthContext)

    const date = new Date()
    const formattedDate = moment(date).format('YYYY-MM-DD')

    const MaxAllowedStartDate = (date.getTime() + (1000*24*60*60*1000))
    const formattedMaxAllowedStartDate = moment(MaxAllowedStartDate).format('YYYY-MM-DD')

    const MaxAllowedEndDate = (date.getTime() + (1001*24*60*60*1000))
    const formattedMaxAllowedEndDate = moment(MaxAllowedEndDate).format('YYYY-MM-DD') 

    const DayOfWeek =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    const [minEndDate,setMinEndDate] = useState(moment(date.getTime() + (1*24*60*60*1000)).format('YYYY-MM-DD'))

    const [friendPicker,setFriendPicker] = useState(false)
    const [chosenFriend,setChosenFriend] = useState()
    const [selectedStartDate,setSelectedStartDate] = useState(formattedDate)
    const [selectedEndDate,setSelectedEndDate] = useState(moment(date.getTime() + (1*24*60*60*1000)).format('YYYY-MM-DD'))
    const [chosenDays,setChosenDays] = useState([])
    const [deliveryTime,setDeliveryTime] = useState({
        start: "00:00:00",
        end: "00:00:00"
    })

    const [involvedUsers,setInvolvedUsers] = useState([])
    const [toast,setToast] = useState(false)
    

    const { onChange, onSubmit, values } = useForm(createSchedule, {
        schedule_name: '',
        commodity_name: '',
        dealed_unit: '',
        start_date: '',
        end_date: '',
        start_time:'',
        end_time: '',
    })
    const [CreateSchedule,{loading}] = useMutation(CREATE_SCHEDULE,{
        variables: values,
        update(proxy,result){

            const data = proxy.readQuery({query: FETCH_SCHEDULE})
            proxy.writeQuery({query:FETCH_SCHEDULE,data:{schedule_by_user: [result.data.schedule.create,...data.schedule_by_user]}})
            props.stateModelHandler(false)
        },
        onError(error){
            console.log(error)
        }
    })
    
    function createSchedule(){
        CreateSchedule()
    }
    

    let friends;
    let distributorFriends = () => {
        let Options = []
        for (var i = 0; i < user.friend_list.length; i++) {     
            Options.push({
                text: user.friend_list[i].username,
                value: user.friend_list[i].username
            })
        }
        return {
          name: "pickedFriend",
          options: Options
        }
    }
    let supplierFriends = () => {
        let Options = []
        for (var i = 0; i < user.friend_list.length; i++) {     
            Options.push({
                text: user.friend_list[i],
                value: user.friend_list[i]
            })
        }
        return {
          name: "pickedFriend",
          options: Options
        }
    }

    const [commodityPicker,setCommodityPicker] = useState(false)
    const [chosenCommodity,setChosenCommodity] = useState()
    
    let products;
    let SupplierProducts = () => {
        let Options = []
        

        for (var i = 0; i < user.products.length; i++) {          
            Options.push({
                text: user.products[i].name,
                value: user.products[i].name
            })
        }
        return {
          name: "pickedCommodity",
          options: Options
        }
    }

    let DistributorProducts = () => {
        let Options = []
        let Commodity = []
        if(chosenFriend){
            for (var i = 0; i < user.friend_list.length; i++){
                if(chosenFriend.pickedFriend.value === user.friend_list[i].username){
                    Commodity = user.friend_list[i].user.products
                }
            }          
        }
        for (var i = 0; i < Commodity.length; i++) {          
            Options.push({
                text: Commodity[i].name,
                value: Commodity[i].name,
            })
        }
        return {
          name: "pickedCommodity",
          options: Options
        }
    }


    
    if (loggedInUser.Role === 'Supplier') {
        products = SupplierProducts
        friends = supplierFriends
    }else {
        products = DistributorProducts
        friends = distributorFriends
    }

    function CreateButtonClicked(callback,e){
        values.start_date = selectedStartDate
        values.end_date = selectedEndDate
        values.end_time = deliveryTime.end
        values.start_time = deliveryTime.start
        values.involved_users_username = involvedUsers
        values.day = chosenDays
        if (involvedUsers.length < 1 || chosenDays.length == 0 || values.schedule_name.trim() === '' || values.dealed_unit.trim() === ''){
            setToast(true)
            return
        } 
        values.dealed_unit += ` ${chosenCommodity && chosenCommodity.pickedCommodity.unit}`
        callback(e,null,null,null);
    }

    


    return (
        <React.Fragment>
            <InputControls 
                    type="text" 
                    display={ <div><IonIcon icon={textOutline}/> Schedule Name</div>}
                    name="schedule_name" 
                    onChange={onChange} 
                    value={values.schedule_name}/>
            <IonItem >
                <IonLabel color="medium">Choose Friend To Trade</IonLabel>
                <IonButton color="warning" onClick={() => {setFriendPicker(true)}}>{!chosenFriend ? 'Pick' : (chosenFriend && chosenFriend.pickedFriend.value) }</IonButton>
                <IonPicker onIonChange={onChange}
                    name="friend"
                    isOpen={friendPicker}
                    columns={[friends()]}
                    buttons={[
                        {
                            text: "Cancel",
                            handler: () => {
                                setFriendPicker(false)
                            }
                        },
                        {
                            text: "Confirm",
                            handler: user => {
                                setChosenFriend(user)                              
                                setFriendPicker(false)
                                setInvolvedUsers([...involvedUsers,loggedInUser.Username,user.pickedFriend.value])
                                setChosenCommodity()
                            }
                        }
                    ]}
                ></IonPicker>
            </IonItem>
           
            <IonItem>
                <IonLabel color="medium">Choose Commodity </IonLabel>
                <IonButton color="warning" onClick={() => {setCommodityPicker(true)}}>{!chosenCommodity || !chosenFriend ? 'Pick' : ( chosenFriend && chosenCommodity && chosenCommodity.pickedCommodity.value)}</IonButton>
                <IonPicker
                    isOpen={commodityPicker}
                    name="commodity"
                    columns={[products()]}
                    buttons={[
                        {
                            text: "Cancel",
                            handler: () => {
                                setCommodityPicker(false)
                            }
                        },
                        {
                            text: "Confirm",
                            handler: commodity => {
                                
                                if(commodity.pickedCommodity.value){
                                    let friend = user.friend_list.find((b) => {
                                        return b.username === chosenFriend.pickedFriend.value                                      
                                    })
                                    let item;

                                    if(loggedInUser.Role === 'Supplier'){
                                        item = user.products.find(item => {
                                            return item.name === commodity.pickedCommodity.value
                                        })
                                    }else {
                                        item = friend.user.products.find((item) => {
                                        return item.name === commodity.pickedCommodity.value
                                    })
                                    }
                                    
                                    setChosenCommodity({pickedCommodity:{
                                        ...commodity.pickedCommodity,
                                        min_purchase: item.min_purchase,
                                        unit: item.unit_type
                                    }})    
                                    values.commodity_name = commodity.pickedCommodity.value                                   
                                    setCommodityPicker(false)
                                }
                            }
                        }
                    ]}
                ></IonPicker>
            </IonItem>

            {chosenCommodity && (
                
                <InputControls 
                    type="number" 
                    display={ <div><IonIcon icon={pricetag}/> Min Purchase : {chosenCommodity.pickedCommodity.min_purchase} {chosenCommodity.pickedCommodity.unit}</div>}
                    name="dealed_unit" 
                    onChange={onChange} 
                    value={values.dealed_unit}/>
                
            )}
                
            <IonItem >
                <IonLabel color="medium">Start Date </IonLabel>
                <IonDatetime 
                    name="start_date"
                    min={moment(date).format('YYYY-MM-DD')}
                    max={formattedMaxAllowedStartDate} 
                    displayFormat="DDDD, MMMM DD, YYYY" 
                    placeholder="Select Date" value={selectedStartDate} 
                    onIonChange={e => {
                        setSelectedStartDate(e.detail.value)
                        e.target.value = moment(e.detail.value).format("YYYY-MM-DD")
                        onChange(e)

                        var newEndDate = new Date(e.detail.value)
                        setSelectedEndDate(moment(newEndDate.getTime() + (1*24*60*60*1000)).format('YYYY-MM-DD'))
                        setMinEndDate(moment(newEndDate.getTime() + (1*24*60*60*1000)).format('YYYY-MM-DD'))
                    }}></IonDatetime>
            </IonItem>

            <IonItem>
                <IonLabel color="medium">End Date </IonLabel>
                <IonDatetime 
                    name="end_date"
                    min={minEndDate}
                    max={formattedMaxAllowedEndDate} 
                    displayFormat="DDDD, MMMM DD, YYYY" 
                    placeholder="Select Date" value={selectedEndDate} 
                    onIonChange={e => {
                        setSelectedEndDate(e.detail.value)
                        e.target.value = moment(e.detail.value).format("YYYY-MM-DD")
                        onChange(e)

                        
                    }}></IonDatetime>
            </IonItem>

           
            <IonContent className="ion-padding schedule-content"> 
                <IonLabel color="medium">Select Days Of Week </IonLabel>
                <IonCard className="ion-padding">
                    {
                        DayOfWeek.map((day,index) => (
                            <IonChip color={chosenDays.includes(day) ? "primary" : "warning"} key={index} onClick={() => {
                                    if(chosenDays.includes(day) === false){
                                        setChosenDays([...chosenDays,day])
                                    }else{
                                        let filtered = chosenDays.filter(function(item) {
                                            return item !== day
                                        })
                                        setChosenDays(filtered)
                                    }                              
                                }}>
                                <IonLabel>{day}</IonLabel>
                            </IonChip>
                        ))
                    }
                </IonCard>
                <IonItem>
                    <IonLabel color="medium" >Delivery Start Time </IonLabel>
                    <IonDatetime
                        displayFormat="HH:mm:ss"
                        value={deliveryTime.start}
                        onIonChange={e => setDeliveryTime(prevState => ({
                            ...prevState,
                            start: e.detail.value
                        }))}
                    ></IonDatetime>
                </IonItem>
                <IonItem>
                    <IonLabel color="medium">Delivery End Time </IonLabel>
                    <IonDatetime
                        displayFormat="HH:mm:ss"
                        value={deliveryTime.end}
                        onIonChange={e => setDeliveryTime(prevState => ({
                            ...prevState,
                            end: e.detail.value
                        }))}
                    ></IonDatetime>
                </IonItem>
            </IonContent>
            <IonButton
                className="ion-margin"
                expand="block"
                color="warning"
                onClick={(e) => {
                    CreateButtonClicked(onSubmit,e)     
                }}
            >{loading ? (<IonSpinner color="dark"></IonSpinner>): <p>Create Schedule</p>}</IonButton>

            <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={"All Fields are required!"}
                position="center"
                duration={800}
            />
        </React.Fragment>
    )
}

export default ScheduleView;