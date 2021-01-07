import {useState} from 'react'

export const useForm = (callback,initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    const onSubmit = (event,images,profile_image) => {
        event.preventDefault();

        if(images){
            values.images = images
        }
        if(profile_image){
            values.profile_image = profile_image
        }
        console.log(values)
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}

export const mapForm = (errors) => {
    const erro = {}
    if(errors.length > 0) {
        errors.map((err) => {
            const temp = err.message.toString()
            const arr1 = temp.split('input: ')
            if(arr1[1]){
                const arr2 = arr1[1].split(' ')
                if( arr2[0] === 'Username'){
                    erro.username = arr1[1]
                }else if(arr2[0] === 'Email'){
                    erro.email = arr1[1]
                }else if(arr2[0] === 'Password'){
                    erro.password = arr1[1]
                }else if(arr2[0] === 'Confirm'){
                    erro.confirmPassword = arr1[1]
                }else if(arr2[0] === 'Choose'){
                    erro.role = arr1[1]
                }
            }else{
                erro.registered = temp
            }                          
        })
    }
    return erro
}