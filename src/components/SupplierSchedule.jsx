import React, { useState } from 'react'
import {IonItem,IonLabel,IonPicker,IonButton,IonDatetime,IonContent,IonCard,IonChip} from '@ionic/react'
import moment from 'moment'

function SupplierScheduleView(props){

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

    const friends = () => {
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
    };

    const [commodityPicker,setCommodityPicker] = useState(false)
    const [chosenCommodity,setChosenCommodity] = useState()

    const products = () => {
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
    };

    return (
        <React.Fragment>
            <IonItem >
                <IonLabel color="medium">Choose Friend To Trade</IonLabel>
                <IonButton color="warning" onClick={() => {setFriendPicker(true)}}>{!chosenFriend ? 'Pick' : (chosenFriend && chosenFriend.pickedFriend.value) }</IonButton>
                <IonPicker
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
                            }
                        }
                    ]}
                ></IonPicker>
            </IonItem>

            <IonItem>
                <IonLabel color="medium">Choose Commodity </IonLabel>
                <IonButton color="warning" onClick={() => {setCommodityPicker(true)}}>{!chosenCommodity ? 'Pick' : chosenCommodity}</IonButton>
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
                                console.log(commodity);
                                if(commodity){
                                    setChosenCommodity(commodity.pickedCommodity.value)
                                }                         
                                setCommodityPicker(false)
                            }
                        }
                    ]}
                ></IonPicker>
            </IonItem>

            <IonItem >
                <IonLabel color="medium">Start Date </IonLabel>
                <IonDatetime 
                    name="start_date"
                    min={moment(date).format('YYYY-MM-DD')}
                    max={formattedMaxAllowedStartDate} 
                    displayFormat="DDDD, MMMM DD, YYYY" 
                    placeholder="Select Date" value={selectedStartDate} 
                    onIonChange={e => setSelectedStartDate(e.detail.value)}></IonDatetime>
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

export default SupplierScheduleView;