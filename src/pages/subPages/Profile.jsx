import { IonContent, IonSpinner,IonGrid,IonRow,IonCol, IonAvatar,IonIcon,IonFabButton,IonFab, IonItem,IonToast, IonText,IonButton, IonModal,IonHeader,IonToolbar,IonBackButton,IonTitle,IonButtons, IonLabel } from '@ionic/react';
import {camera,images,lockOpen,mail,pencil,createOutline,logoWhatsapp,person,bagAdd}  from 'ionicons/icons'
import React,{useContext, useEffect, useState} from 'react'
import Header from '../../components/Header';
import ImageZoom from '../../components/PhotoZoom';
import { AuthContext } from '../../context/Auth';
import {InputControls} from '../../components/Input'
import { Mail } from '@material-ui/icons';
import {FETCH_USER_BY_USERNAME} from '../../utils/graphql'
import {gql, useQuery,useMutation} from '@apollo/client'
import {useForm} from '../../utils/Hooks'

function Profile(props){
    const {user} = useContext(AuthContext)

    
    const [formFieldEmpty,setformFieldEmpty] = useState(false)
    const [profilePicture, setProfilePicture] = useState()
    const [UploadProgress,setUploadProgress] = useState(false)
    const [selectedImage,setSelectedImage] = useState(null)
    const [editProfile,setEditProfile] = useState(false)
    const [errors, setError] = useState({})

    const [currentUser,setCurrentUser] = useState()
    const {loading,data} = useQuery(FETCH_USER_BY_USERNAME,{
        variables: {
            username: user.Username
        },
        onCompleted: () => {
            setProfilePicture(data.user_by_username.profile_image)          
            setCurrentUser(data.user_by_username)
        }
    })


    const { onChange, onSubmit, values } = useForm(updateUserProfile, {
        email:'',
        whatsapp_number: ''
    })
    function updateUserProfile(){
        updateProfile()
        values.email = ''
        values.whatsapp_number = ''
    }

    const [updateProfile,{loading:loadingUpdate}] = useMutation(UPDATE_USER_PROFILE,{
        variables: values,
        update(proxy,result){
            console.log(result)
            setEditProfile(false)
            setCurrentUser(result.data.user.update)

            // const data = proxy.readQuery({query: FETCH_COMMODITY_QUERY})
            // proxy.writeQuery({query:FETCH_COMMODITY_QUERY,data:{comodities:{nodes: [result.data.commodity.create,...data.comodities.nodes]}}})
        },
        onError(error){
            setError(error.graphQLErrors)
        }
    })

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

    function CleanData(){
        setEditProfile(false)
    }

    return (
        <React.Fragment>
            <Header/>
            <IonContent> 
                <IonItem>
                    <h1>Profile</h1>
                </IonItem>

                {loading ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : 
                    currentUser ? (
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
                            <IonCol>
                                <IonItem>
                                    <IonIcon icon={person} slot="start"></IonIcon>
                                    <IonLabel>
                                        {currentUser.username}
                                    </IonLabel>
                                    
                                </IonItem>  
                            </IonCol>                        
                        </IonRow> 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonIcon icon={logoWhatsapp} slot="start"></IonIcon>
                                    <IonLabel>
                                        {currentUser.whatsapp_number}
                                    </IonLabel>
                                    
                                </IonItem>  
                            </IonCol>                        
                        </IonRow> 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonIcon icon={mail} slot="start"></IonIcon>
                                    <IonLabel>
                                        {currentUser.email}
                                    </IonLabel>
                                    
                                </IonItem>  
                            </IonCol>                        
                        </IonRow>                             
                    </IonGrid>
                    ): (<IonSpinner color="warning" className="spinner-home"></IonSpinner>)                 
                }
                 
                   
                <IonFab vertical="bottom" horizontal="end" slot="fixed" edge id="schedule-add">
                    <IonFabButton  color="warning" disabled={loading ? true : false} onClick={() => {
                        setEditProfile(true)
                    }}><IonIcon icon={createOutline} className="gallery"></IonIcon></IonFabButton>
                </IonFab> 
                    
            </IonContent>


            <IonModal isOpen={editProfile}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/Posts" onClick={() => CleanData()} />
                        </IonButtons>
                        <IonTitle>Edit Profile</IonTitle>
                    </IonToolbar>
                </IonHeader>

                    
                <IonContent scrollEvents={true}>
                    {loadingUpdate ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : currentUser && (
                        <React.Fragment>
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
                            </IonGrid>

                            <InputControls type="email"
                                    display={values.email === '' ? currentUser.email : <div><IonIcon icon={mail}/> Email</div>} 
                                    name="email"
                                    focus="true"
                                    onChange={onChange}
                                    value={values.email === '' ? currentUser.email : values.email} />
                            <InputControls type="whatsapp_number"
                                    display={values.whatsapp_number === '' ? currentUser.whatsapp_number : <div><IonIcon icon={logoWhatsapp}/> Whatsapp Number</div>} 
                                    name="whatsapp_number"
                                    focus="true"
                                    onChange={onChange}
                                    value={values.whatsapp_number === '' ?  currentUser.whatsapp_number : values.email} />

                            <IonButton                    
                                    expand="block"  
                                    color="warning"                     
                                    className="create-post-button" 
                                    router-direction="forward" routerAnimation 
                                    onClick={(e) => {
                                        if(values.email.trim() === ''){
                                            values.email = data.user_by_username.email
                                        }
                                        if(values.whatsapp_number.trim() === ''){
                                            values.whatsapp_number = data.user_by_username.whatsapp_number
                                        }
                                        onSubmit(e,null,profilePicture)
                                    }}><IonIcon slot="start" icon={bagAdd} />Edit Profile
                                </IonButton>
                        </React.Fragment>
                    )}
                    
                </IonContent>

                <IonFab vertical="bottom" horizontal="end" slot="fixed" >
                    <IonFabButton  color="warning" disabled={loadingUpdate ? true : false}>{!UploadProgress ? <IonIcon icon={images} className="gallery"></IonIcon> : <IonSpinner className="gallery" color="dark"/>}<input type="file" onChange={fileSelecterHandler} /></IonFabButton>
                </IonFab> 
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


const UPDATE_USER_PROFILE = gql`
    mutation updateUser (
        $email: String!
        $profile_image: String!
        $whatsapp_number: String!
    ){
        user{
            update(input:{
                email: $email
                profile_image: $profile_image
                whatsapp_number: $whatsapp_number
            }){
                profile_image
                username
                email
                role
                whatsapp_number
                hashed_password
                friend_list
                looking_for
                products{
                    id
                    name
                    image
                    unit_price
                    unit_type
                    min_purchase
                    description
                }
            }
        }
    }
`
export default Profile;


