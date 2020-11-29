import { IonContent, IonSpinner,IonGrid,IonRow,IonCol, IonAvatar,IonIcon,IonFabButton,IonFab } from '@ionic/react';
import {camera,images}  from 'ionicons/icons'
import React,{useContext, useState} from 'react'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom';
import { AuthContext } from '../../context/Auth';

function Profile(props){
    //in this component run get user detail by username after getting the detail set profile picture menjadi link dari database jika ada
    // const {user} = useContext(AuthContext)

    const [profilePicture, setProfilePicture] = useState()
    const [UploadProgress,setUploadProgress] = useState(false)

    const [selectedImage,setSelectedImage] = useState(null)
    function fileSelecterHandler(event) {
        setSelectedImage(event.target.files[0])
    }

    if(selectedImage) {      
        updateProfilePic(selectedImage)
    }
 
    function updateProfilePic(selectedImage){
        setUploadProgress(true)

        var formData = new FormData()
        formData.append('File',selectedImage,selectedImage.name)
        formData.append('Type_Adaptor','GDRIVE')

        //jalankan mutasi update profile user dan upload foto ke cloud
        fetch("https://secure-river-11996.herokuapp.com/upload" , {
            method: 'POST',
            body: formData,
        }).then(response => {

            var imageData = response.json()
            imageData.then(data => {
                setProfilePicture(data.ImageURL)              
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
            <Header/>
            <IonContent> 
                <IonGrid>
                    <IonRow>
                        {profilePicture ? (
                            <IonCol size="3" offset=''>
                                
                                <IonAvatar className="ion-avatar">
                                    <ImageZoom src={profilePicture} height="70px" width="70px"/> 
                                    <IonIcon icon={camera} slot="end"></IonIcon> 
                                </IonAvatar> 
                                                                            
                            </IonCol>                         
                        ) : 
                        <IonCol size="3" offset=''>
                            <IonAvatar>
                                 <ImageZoom src={ 'https://cdn2.iconfinder.com/data/icons/user-people-4/48/6-512.png'} />
                            </IonAvatar>
                        </IonCol>  }
                    </IonRow>                 
                </IonGrid> 
                   
                <IonFab vertical="top" horizontal="end" slot="fixed">
                    <IonFabButton  color="warning">{!UploadProgress ? <IonIcon icon={images} className="gallery"></IonIcon> : <IonSpinner className="gallery" color="dark"/>}<input type="file" onChange={fileSelecterHandler} /></IonFabButton>
                </IonFab> 
                    
            </IonContent>
        </React.Fragment>
        
    )
}
export default Profile;