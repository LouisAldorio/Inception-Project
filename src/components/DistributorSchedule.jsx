import React,{useState} from 'react'
import {IonButton,IonItem,IonLabel,IonPicker} from '@ionic/react'

function DistributorScheduleView(props){

    const user = props.data

    const [friendPicker,setFriendPicker] = useState(false)
    const [chosenFriend,setChosenFriend] = useState()

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
                    Commodity = user.friend_list[i].products
                }
            }          
        }
        for (var i = 0; i < Commodity.length; i++) {          
            Options.push({
                text: Commodity[i].commodityName,
                value: Commodity[i].commodityName
            })
        }
        return {
          name: "pickedCommodity",
          options: Options
        }
    };

    return (
        <React.Fragment>
            <IonItem>
                <IonLabel color="medium">Choose Friend To Trade</IonLabel>
                <IonButton color="warning" onClick={() => {setFriendPicker(true)}}>{!chosenFriend ? 'Pick Friend' : (chosenFriend && chosenFriend.pickedFriend.value) }</IonButton>
                <IonPicker
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
                <IonButton color="warning" onClick={() => {setCommodityPicker(true)}}>{!chosenCommodity || !chosenFriend ? 'Pick Commodity' : ( chosenFriend && chosenCommodity && chosenCommodity.pickedCommodity.value)}</IonButton>
                <IonPicker
                    isOpen={commodityPicker}
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
                                if(commodity){
                                    setChosenCommodity(commodity)
                                }                         
                                setCommodityPicker(false)
                            }
                        }
                    ]}
                ></IonPicker>
            </IonItem>
           
           
        </React.Fragment>
    )
}

export default DistributorScheduleView;