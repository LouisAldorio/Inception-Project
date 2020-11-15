import { IonContent, IonPage,IonButton,IonGrid,IonRow,IonCol, IonAvatar,IonIcon,IonFabButton,IonFab ,IonInfiniteScrollContent,IonInfiniteScroll, IonItem, IonThumbnail} from '@ionic/react';
import {camera}  from 'ionicons/icons'
import React,{useContext, useState} from 'react'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom';
import { AuthContext } from '../../context/Auth';
import { usePhotoGallery } from '../../utils/UsePhotoGallery';



function Profile(props){
    //in this component run get user detail by username after getting the detail set profile picture menjadi link dari database jika ada

    const {user} = useContext(AuthContext)

    const [profilePicture, setProfilePicture] = useState()

    let { photos,takePhoto,setPhotos } = usePhotoGallery();

    if(photos) {
        
        updateProfilePic(photos)
    }

    function updateProfilePic(photo){
        setProfilePicture(photo)
        //jalankan mutasi update profile user dan upload foto ke cloud


        //set photos jadi kosong lg untuk menghindari re render yang cukup banyak
        setPhotos()
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
                                    <ImageZoom src={profilePicture.webviewPath} height="70px" width="70px"/> 
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
                    <IonFabButton onClick={takePhoto} color="warning"><IonIcon icon={camera}></IonIcon> </IonFabButton>
                </IonFab> 
                    
            </IonContent>
        </React.Fragment>
        
    )
}
export default Profile;