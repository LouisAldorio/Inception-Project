import { IonCol, IonGrid, IonItem,IonRow } from '@ionic/react'
import moment from 'moment'
import React, { useState } from 'react'
import '../App.css'

function Clock(){

    setInterval(updateTime,1000)

    const now = moment(new Date().toLocaleTimeString(), "h:mm:ss A").format("HH:mm:ss")
    const [time,setTime] = useState(now)

    function updateTime(){
        const newTime = moment(new Date().toLocaleTimeString(), "h:mm:ss A").format("HH:mm:ss")
        setTime(newTime)
    }

    const date = new Date().toLocaleDateString()
    const formattedDate = moment(date).format('D MMMM YYYY')

    return (           
        <IonGrid id="clock-schedule" slot='fixed'>
            <IonRow>
                <IonCol size='12' className='schedule-date'>{formattedDate}</IonCol>
            </IonRow>
            <IonRow>
                <IonCol size='12' className='schedule-time'>                       
                    {time}
                </IonCol>
            </IonRow>
        </IonGrid>               
    )
}

export default Clock;