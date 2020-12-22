import { IonContent, IonSpinner,IonGrid,IonRow,IonCol, IonAvatar,IonIcon,IonFabButton,IonFab, IonItem } from '@ionic/react';
import {camera,images,lockOpen,mail,pencil}  from 'ionicons/icons'
import React,{useContext, useEffect, useState} from 'react'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom';
import { AuthContext } from '../../context/Auth';
import {InputControls} from '../../components/Input'
import { Mail } from '@material-ui/icons';

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
                //lakukan hit mutaion ke update profile user

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
                <IonItem>
                    <h1>Profile</h1>
                </IonItem>
                <IonGrid>
                    <IonRow>
                        {profilePicture ? (
                            <IonCol size="7" offset="3">
                                <ImageZoom src={profilePicture} height="140" width="160"/>                                        
                            </IonCol>                         
                        ) : 
                        <IonCol size="7" offset="3">    
                            <ImageZoom src={ 'https://www.baytekent.com/wp-content/uploads/2016/12/facebook-default-no-profile-pic1.jpg'} height="140" width="160" />             
                        </IonCol>  }

                    </IonRow>  
                    <IonRow>
                        <IonCol size="9">
                            <InputControls 
                                type="email" 
                                display={ <div><IonIcon icon={mail}> </IonIcon> User's Email</div>}
                                name="email"  />
                        </IonCol>
                        <IonCol size="3">
                            <IonItem lines={"none"} button>
                                <IonIcon icon={pencil} slot="end" color="warning"></IonIcon>
                            </IonItem>                        
                        </IonCol>
                    </IonRow>                     
                    <IonRow>
                        <IonCol size="9">
                            <InputControls 
                                type="number" 
                                display={ <div><IonIcon icon={mail}> </IonIcon> User's Whatsapp</div>}
                                name="email"  />
                        </IonCol>
                        <IonCol size="3">
                            <IonItem lines={"none"} button>
                                <IonIcon icon={pencil} slot="end" color="warning"></IonIcon>
                            </IonItem>
                            
                        </IonCol>
                    </IonRow> 
                    <IonRow>
                        <IonCol size="9">
                            <InputControls 
                                type="password" 
                                display={ <div><IonIcon icon={mail}> </IonIcon> User's Password</div>}
                                name="email"  />
                        </IonCol>
                        <IonCol size="3">
                            <IonItem lines={"none"} button>
                                <IonIcon icon={pencil} slot="end" color="warning"></IonIcon>
                            </IonItem>
                            
                        </IonCol>
                    </IonRow>            
                </IonGrid> 
                   
                <IonFab vertical="bottom" horizontal="end" slot="fixed" edge id="schedule-add" >
                    <IonFabButton  color="warning">{!UploadProgress ? <IonIcon icon={images} className="gallery"></IonIcon> : <IonSpinner className="gallery" color="dark"/>}<input type="file" onChange={fileSelecterHandler} /></IonFabButton>
                </IonFab> 
                    
            </IonContent>
        </React.Fragment>
        
    )
}
export default Profile;