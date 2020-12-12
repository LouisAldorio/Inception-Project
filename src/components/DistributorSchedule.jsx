import React,{useState} from 'react'
import {IonButton,IonPicker} from '@ionic/react'

function DistributorScheduleView(props){

    const user = props.data

    const [friendPicker,setFriendPicker] = useState(false)

    const friends = () => {
        let Options = []
        for (var i = 0; i < user.friend_list.length; i++) {          
            Options.push({
                text: user.friend_list[i].username,
                value: user.friend_list[i].username
            })
        }
        return {
          name: "First",
          options: Options
        }
    };

    return (
        <React.Fragment>
            <IonButton onClick={() => {setFriendPicker(true)}}>pick friend</IonButton>
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
                        handler: value => {
                            console.log(value);
                            setFriendPicker(false)
                        }
                    }
                ]}
            ></IonPicker>
        </React.Fragment>
    )
}

export default DistributorScheduleView;