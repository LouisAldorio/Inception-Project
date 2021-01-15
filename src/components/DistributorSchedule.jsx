import React,{useState} from 'react'
import {IonButton,IonItem,IonLabel,IonPicker,IonDatetime, IonContent, IonChip, IonCard, IonIcon} from '@ionic/react'
import moment from 'moment'
import {InputTextArea} from '../components/Input'
import {home} from 'ionicons/icons'
import {useForm} from '../utils/Hooks'
import {InputControls} from './Input'
import {pricetag} from 'ionicons/icons'


function DistributorScheduleView(props){

    const user = props.data

    const date = new Date()
    const formattedDate = moment(date).format('D MMMM YYYY')

    const MaxAllowedStartDate = (date.getTime() + (1000*24*60*60*1000))
    const formattedMaxAllowedStartDate = moment(MaxAllowedStartDate).format('YYYY-MM-DD')

    const MaxAllowedEndDate = (date.getTime() + (1001*24*60*60*1000))
    const formattedMaxAllowedEndDate = moment(MaxAllowedEndDate).format('YYYY-MM-DD') 

    const DayOfWeek =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    const [friendPicker,setFriendPicker] = useState(false)
    const [chosenFriend,setChosenFriend] = useState()
    const [selectedStartDate,setSelectedStartDate] = useState(formattedDate)
    const [selectedEndDate,setSelectedEndDate] = useState(moment(date.getTime() + (1*24*60*60*1000)).format('D MMMM YYYY'))
    const [chosenDays,setChosenDays] = useState([])
    const [deliveryTime,setDeliveryTime] = useState({
        start: "00:00:00",
        end: "00:00:00"
    })

    const [days,setDays] = useState([])
    const [involvedUsers,setInvolvedUsers] = useState([])

    const { onChange, onSubmit, values } = useForm(createSchedule, {
        schedule_name: '',
        commodity_name: '',
        dealed_unit: '',
        start_date: selectedStartDate,
        end_date: '',
        day:[],
        start_time:'',
        end_time: '',
        involved_users_username:[],
    })
    console.log(values)
    function createSchedule(){

    }
    

    const friends = () => {
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
    };

    const [commodityPicker,setCommodityPicker] = useState(false)
    const [chosenCommodity,setChosenCommodity] = useState()
    

    const products = () => {
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
    };

    console.log(chosenCommodity)  

    return (
        <React.Fragment>
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
                                    let item = friend.user.products.find((item) => {
                                        return item.name === commodity.pickedCommodity.value
                                    })
                                    
                                    setChosenCommodity({pickedCommodity:{
                                        ...commodity.pickedCommodity,
                                        min_purchase: item.min_purchase,
                                        unit: item.unit_type
                                    }})                                         
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
                    display={ <div><IonIcon icon={pricetag}/> Min Purchase : {chosenCommodity.pickedCommodity.min_purchase}</div>}
                    name="unit_price" 
                    onChange={onChange} 
                    value={values.unit_price}/>
                
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
                        e.target.value = e.detail.value
                        onChange(e)
                    }}></IonDatetime>
            </IonItem>

            <IonItem>
                <IonLabel color="medium">End Date </IonLabel>
                <IonDatetime 
                    name="end_date"
                    min={moment(date.getTime() + (1*24*60*60*1000)).format('YYYY-MM-DD')}
                    max={formattedMaxAllowedEndDate} 
                    displayFormat="DDDD, MMMM DD, YYYY" 
                    placeholder="Select Date" value={selectedEndDate} 
                    onIonChange={e => setSelectedEndDate(e.detail.value)}></IonDatetime>
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
            >Create Schedule</IonButton>
        </React.Fragment>
    )
}

export default DistributorScheduleView;