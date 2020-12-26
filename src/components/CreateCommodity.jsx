import React, { useState } from 'react'
import { IonModal,IonToast, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItemGroup, IonFabButton, IonFab, IonSpinner, IonIcon, IonItem, IonAvatar,IonButton } from '@ionic/react'
import ImageZoom from './PhotoZoom'
import { images } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'
import {InputControls, InputTextArea, UnitTypeInput} from '../components/Input'
import {lockOpen,fileTrayStacked,pricetag,removeCircle,text,bagAdd} from 'ionicons/icons'
import {gql,useMutation} from '@apollo/client'
import {FETCH_COMMODITY_QUERY} from '../utils/graphql'

function CommodityCreate(props) {
    const [formFieldEmpty,setformFieldEmpty] = useState(false)
    const [UploadProgress, setUploadProgress] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadedImages, setUploadedImages] = useState([])
    const [errors, setError] = useState({})

    const [unit_type, setUnit_type] = useState()
    const selectCalcUnitHandler = (value) => {
        setUnit_type(value)
    }

    const { onChange, onSubmit, values } = useForm(loginUser, {
        name: '',
        unit_price: 0,
        min_purchase: '',
        unit_type: '',
        description: '',
    })

    function loginUser() {
        createCommodity()
        clearError()
    }

    const [createCommodity,{loading}] = useMutation(CREATE_COMMODITY_MUTATION,{
        variables: values,
        update(proxy,result){
            EmptyImageContainer()

            //read from cache and write to cache the incoming result
            // const data = proxy.readQuery({query: FETCH_COMMODITY_QUERY})
            // proxy.writeQuery({query:FETCH_COMMODITY_QUERY,data:{comodities:{nodes: [result.data.commodity.create,...data.comodities.nodes]}}})
            let newList = [result.data.commodity.create,...props.items]
            newList.pop()
            props.setItems(newList)
        },
        onError(error){
            console.log(error)
            setError(error.graphQLErrors)
        }
    })

    const clearError = () => {
        setError({})
    }

    //clean inputed data when user click back
    function EmptyImageContainer(){
        props.stateHandler(false)
        setUploadedImages([])
    }

    //upload section
    function fileSelecterHandler(event) {
        setSelectedImage(event.target.files[0])
    }
    if (selectedImage) {
        updateProfilePic(selectedImage)
    }
    function updateProfilePic(selectedImage) {
        setUploadProgress(true)

        var formData = new FormData()
        formData.append('File', selectedImage, selectedImage.name)
        formData.append('Type_Adaptor', 'GDRIVE')

        //jalankan mutasi update profile user dan upload foto ke cloud
        fetch("https://secure-river-11996.herokuapp.com/upload", {
            method: 'POST',
            body: formData,
        }).then(response => {

            var imageData = response.json()
            imageData.then(data => {
                console.log(data)
                // setUploadedImages(data.ImageURL)

                setUploadedImages([...uploadedImages,data.ImageURL])
                //lakukan hit mutation ke update profile user
                
            })
            setUploadProgress(false)

        }).catch((error) => {
            console.log(error);
        })

        //set photos jadi kosong lg untuk menghindari re-render yang cukup banyak
        setSelectedImage(null)
        
    }

    return (
        <React.Fragment>
            <IonModal isOpen={props.isOpen}>
                
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/Posts" onClick={() => EmptyImageContainer()} />
                        </IonButtons>
                        <IonTitle>Post new Commodity!</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {loading ? (<IonSpinner color="warning"></IonSpinner>) : (
                     <IonContent scrollEvents={true}>
                        <InputControls 
                                type="text" 
                                display={ <div><IonIcon icon={fileTrayStacked}/> Commodity Name</div>}
                                name="name" 
                                onChange={onChange} 
                                value={values.name}/>
                        <InputControls 
                                type="number" 
                                display={ <div><IonIcon icon={pricetag}/> Unit Price</div>}
                                name="unit_price" 
                                onChange={onChange} 
                                value={values.unit_price}/>
                        <InputControls 
                                type="number" 
                                display={ <div><IonIcon icon={removeCircle}/> Minimum Purchase</div>}
                                name="min_purchase" 
                                onChange={onChange} 
                                value={values.min_purchase}/>
                        <InputTextArea 
                                display={ <div><IonIcon icon={text}/> Commodity Description</div>}
                                name="description" 
                                onChange={onChange} 
                                value={values.description}
                        />
                        <UnitTypeInput unit_type={unit_type} onSelectValue={selectCalcUnitHandler} name="unit_type" onChange={onChange} value={values.unit_type}/> 
    
                        <IonItemGroup className="attachment-group">                 
                            {uploadedImages.length > 0 && uploadedImages.map((image, i) => (                        
                                    <IonAvatar className="attachment ion-avatar" key={i}>
                                        <ImageZoom src={image} height="70px" width="70px" />
                                    </IonAvatar>                         
                            ))}                              
                        </IonItemGroup>
    
                        <IonButton                    
                            expand="block"  
                            color="warning"                     
                            className="create-post-button" 
                            router-direction="forward" routerAnimation 
                            onClick={(e) => {
                                if(values.name.trim() === '' || values.unit_price.trim() === '' || values.min_purchase.trim() === '' || values.description.trim() === '' || values.unit_type.trim() === ''){
                                    setformFieldEmpty(true)
                                    return
                                }
                                onSubmit(e,uploadedImages)
                            }}><IonIcon slot="start" icon={bagAdd} />Create Post
                        </IonButton>
    
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                                <IonFabButton color="warning" disabled={uploadedImages.length === 8 ? true : false}>{!UploadProgress ? <IonIcon icon={images} className="gallery"></IonIcon> : <IonSpinner className="gallery" color="dark" />}<input type="file" onChange={fileSelecterHandler} /></IonFabButton>
                            </IonFab>
                    </IonContent>
                )}
               
            </IonModal>
            <IonToast
                isOpen={formFieldEmpty}
                onDidDismiss={() => setformFieldEmpty(false)}
                message={"All field is required!"}
                position="bottom"
                duration={800}
            />
        </React.Fragment>
    )
}


const CREATE_COMMODITY_MUTATION = gql`
    mutation createCommodity(
        $name: String!
        $min_purchase: String!
        $unit_type: String!
        $unit_price: String!
        $description: String!
        $images: [String]!
    ){
        commodity{
            create(
                input:{
                    name: $name
                    min_purchase: $min_purchase
                    unit_type: $unit_type
                    unit_price: $unit_price
                    description: $description
                    images: $images
            }){
                id
                name
                image
                unit_price
                unit_type
                min_purchase
                description
                user{
                    profile_image
                    username
                    email
                    role
                    whatsapp_number
                    hashed_password
                    friend_list
                }
            }
        }
    }
`

export default CommodityCreate;