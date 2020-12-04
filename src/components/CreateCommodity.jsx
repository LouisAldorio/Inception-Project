import React, { useState } from 'react'
import { IonModal, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItemGroup, IonFabButton, IonFab, IonSpinner, IonIcon, IonItem, IonAvatar } from '@ionic/react'
import ImageZoom from './PhotoZoom'
import { images } from 'ionicons/icons'
import { useForm } from '../utils/Hooks'

function CommodityCreate(props) {
    const [UploadProgress, setUploadProgress] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [uploadedImages, setUploadedImages] = useState([])
    const [errors, setError] = useState({})

    const { onChange, onSubmit, values } = useForm(loginUser, {
        name: '',
        unit_price: 0,
        min_purchase: '',
        unit_type: '',
        description: ''
    })

    function loginUser() {
        clearError()
        // LoginUser()
    }

    const clearError = () => {
        setError({})
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
                            <IonBackButton defaultHref="/Posts" onClick={() => props.stateHandler(false)} />
                        </IonButtons>
                        <IonTitle>Post new Commodity!</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent scrollEvents={true}>
                    <IonItemGroup>
                        {uploadedImages.length > 0 && uploadedImages.map((image, i) => (
                            <IonItem key={i}>
                                <IonAvatar className="ion-avatar">
                                    <ImageZoom src={image} height="70px" width="70px" />
                                </IonAvatar>
                            </IonItem>
                        ))}
                    </IonItemGroup>
                    <IonFab vertical="top" horizontal="end" slot="fixed">
                        <IonFabButton color="warning">{!UploadProgress ? <IonIcon icon={images} className="gallery"></IonIcon> : <IonSpinner className="gallery" color="dark" />}<input type="file" onChange={fileSelecterHandler} /></IonFabButton>
                    </IonFab>
                </IonContent>
            </IonModal>
        </React.Fragment>
    )
}

export default CommodityCreate;