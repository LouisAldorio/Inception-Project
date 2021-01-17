import React from 'react'
import {DELETE_SCHEDULE,FETCH_SCHEDULE} from '../utils/graphql'
import {useMutation} from '@apollo/client'
import {IonItemOption,IonSpinner} from '@ionic/react'

function DeleteSchedule(props){

    const [DeleteSchedule,{loading}] = useMutation(DELETE_SCHEDULE,{
        variables: {
            id: props.id
        },
        update(cache,result){
            if(result.data.schedule.delete){
                cache.modify({
                    fields: {
                        schedule_by_user(existingTaskRefs, { readField }) {
                            return existingTaskRefs.filter(
                                taskRef => props.id !== readField('id', taskRef),
                            );
                        },
                    },
                });
            }
            if(props.i > 0) {
                props.ToggleOption(props.i)
            } 
            
        },
        onError(error){
            console.log(error)
        }
    })

    return (
        <React.Fragment>            
            <IonItemOption  color="danger" onClick={() => {
                DeleteSchedule()                  
            }}>
                {loading ? (<IonSpinner color="warning"></IonSpinner>) : <p>DELETE</p>}
            </IonItemOption>
        </React.Fragment>
    )
    
}

export default DeleteSchedule;