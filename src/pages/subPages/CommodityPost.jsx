import React, { useState,useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { IonCard, IonCardContent, IonGrid, IonToast, IonContent, IonFabButton, IonIcon, IonBackButton, IonCardHeader, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonFab, IonText, IonSlide, IonSlides, IonInfiniteScroll, IonInfiniteScrollContent, IonSpinner, IonItem, IonAvatar, IonRow, IonCol, IonCardTitle, IonChip } from '@ionic/react'
import '../../App.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/Auth'
import ImageZoom from '../../components/PhotoZoom'
import { add, pricetag, cart, mail, call, personAdd, checkmarkCircle } from 'ionicons/icons'

import Carousel from 'react-material-ui-carousel'
import Header from '../../components/Header'
import SearchBar from '../../components/SearchBar'
import '@open-wa/whatsapp-button/whatsapp-button.js';
import CommodityCreate from '../../components/CreateCommodity'
import {FETCH_COMMODITY_QUERY} from '../../utils/graphql'

function Posts(props) {

    const { user } = useContext(AuthContext)

    const [modalState, setModalState] = useState(false)
    const [openCreateForm, setOpenCreateForm] = useState(false)
    const [searchedItem, setSearchItem] = useState('')
    const [toast, setToast] = useState(false)

    //query to API
    
    const [items,setItems] = useState([])
    const [rightItems,setRightItems] = useState([])
    console.log(items,rightItems)
    const {loading,data,fetchMore} = useQuery(FETCH_COMMODITY_QUERY,{
        onCompleted: () => {
            setItems([...items,...data.comodities.nodes.slice(0, data.comodities.nodes.length / 2)])
            setRightItems([...rightItems,...data.comodities.nodes.slice(data.comodities.nodes.length / 2)])
        },
        variables: {
          page: 1,
          limit: 10
        }
    })
    
    const [modalData, setModalData] = useState(null)

    function ToggleModal(image) {
        // TestWa()
        setModalData(image)
        setModalState(true)
    }

    function CleanData() {
        setModalState(false)
        setModalData(null)
    }
    const TypeSearchWord = (value) => {
        setSearchItem(value)
    }

    function AddOrRemoveFriend() {
        setToast(true)
    }
    // console.log(items)

    return (
        <React.Fragment>
            <Header />
            <IonContent scrollEvents={true}
                onIonScrollStart={() => { }}
                onIonScroll={() => { }}
                onIonScrollEnd={() => { 
                    if(data.comodities.total_item > (items.length + rightItems.length)){
                        fetchMore({
                            variables: {
                                page: ((items.length + rightItems.length)/10)+1,
                                limit: 10
                              }
                        }).then(result => {
                            // setItems([...items,...result.data.comodities.nodes])     
                            setItems([...items,...result.data.comodities.nodes.slice(0, result.data.comodities.nodes.length / 2)])
                            setRightItems([...rightItems,...result.data.comodities.nodes.slice(result.data.comodities.nodes.length / 2)])                                          
                        })
                    }    
                }}
                className="ion-content-bottom">

                {loading ? (<IonSpinner color="warning" className="spinner-home"></IonSpinner>) : (
                    <React.Fragment>
                        <SearchBar selectedValue={searchedItem} changeHandler={TypeSearchWord} />  
                        <div className="commodity-list">
                            {items.length > 0 && rightItems.length > 0 ? (
                                 <IonGrid>
                                    <IonRow>
                                        <IonCol size="6" className="grid-view-col">
                                            {items.length > 0 && items.map((image, i) => (                                                                                                             
                                                <IonCard className="Ubuntu" key={image.id} onClick={() => ToggleModal(image)} >
                                                    <IonItem lines={"none"}>
                                                        <IonAvatar slot="start">
                                                            <img src={image.user.profile_image} />
                                                        </IonAvatar>
                                                        <h4 className="list-view-card">{image.user.username}</h4>
                                                    </IonItem>
    
                                                    <img src={image.image[0]} />
                                                    <IonCardContent>
                                                        <h4 className="list-view-card">{image.name}</h4>
                                                    </IonCardContent>
    
                                                    <IonRow>
                                                        <IonCol size="12">
                                                            <IonItem lines={"none"}>
                                                                <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                                                <p className="list-view-card">Rp. {image.unit_price}</p>
                                                            </IonItem>
                                                            <IonItem lines={"none"}>
                                                                <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                                                <p className="list-view-card">Min: {image.min_purchase} {image.unit_type}</p>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            ))}
                                        </IonCol>
                                        <IonCol size="6" className="grid-view-col">
                                            {rightItems.length > 0 && rightItems.map((image, i) => (                                                                                                             
                                                <IonCard className="Ubuntu" key={image.id} onClick={() => ToggleModal(image)} >
                                                    <IonItem lines={"none"}>
                                                        <IonAvatar slot="start">
                                                            <img src={image.user.profile_image} />
                                                        </IonAvatar>
                                                        <h4 className="list-view-card">{image.user.username}</h4>
                                                    </IonItem>
    
                                                    <img src={image.image[0]} />
                                                    <IonCardContent>
                                                        <h4 className="list-view-card">{image.name}</h4>
                                                    </IonCardContent>
    
                                                    <IonRow>
                                                        <IonCol size="12">
                                                            <IonItem lines={"none"}>
                                                                <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                                                <p className="list-view-card">Rp. {image.unit_price}</p>
                                                            </IonItem>
                                                            <IonItem lines={"none"}>
                                                                <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                                                <p className="list-view-card">Min: {image.min_purchase} {image.unit_type}</p>
                                                            </IonItem>
                                                        </IonCol>
                                                    </IonRow>
                                                </IonCard>
                                            ))}
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            ):  <img id="photo-fullscreen" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Tl87UxYtH39b-RUyxSB2SrtNkPZB_55dtw&usqp=CAU" />}                          
                        </div>

                        {(items.length + rightItems.length) < data.comodities.total_item && (
                            <IonInfiniteScroll threshold="100px" id="infinite-scroll">
                                <IonInfiniteScrollContent loadingSpinner="dots"><IonSpinner color="warning" className="pagination-spinner"></IonSpinner></IonInfiniteScrollContent>
                            </IonInfiniteScroll>
                        )}

                        {user.Role === 'Supplier' && <IonFab vertical="bottom" horizontal="end" edge id="schedule-add" slot='fixed'>
                            <IonFabButton color="warning" onClick={() => setOpenCreateForm(true)}>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>} 
                    </React.Fragment> 
                )}
            </IonContent>

            <CommodityCreate isOpen={openCreateForm} stateHandler={setOpenCreateForm}  items={items} rightItems={rightItems} setItems={setItems} total={data && data.comodities.total_item}/>

            <IonModal isOpen={modalState}>
                <IonHeader translucent>
                    <IonToolbar color='warning'>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/Posts" onClick={() => CleanData()} />
                        </IonButtons>
                        <IonTitle>Commodity's Detail</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent scrollEvents={true}>
                    <IonCard>
                        <Carousel animation="slide" autoPlay={true} interval={4000}>
                            {modalData && modalData.image.map((img) => (
                                <ImageZoom src={img} key={img} width="500px" height="300px" />
                            ))}
                        </Carousel>
                        <IonCardContent>
                            <IonCardTitle>
                                <h1>Commodity: {modalData && modalData.name}</h1>
                            </IonCardTitle>
                            <p>
                                {modalData && modalData.description}
                            </p>
                        </IonCardContent>
                        <IonRow>
                            <IonCol size="6">
                                <IonItem lines={"none"}>
                                    <IonIcon icon={pricetag} slot="start" className="pricetag"></IonIcon>
                                    <p>Rp. {modalData && modalData.unit_price}</p>
                                </IonItem>
                            </IonCol>
                            <IonCol size="6">
                                <IonItem lines={"none"}>
                                    <IonIcon icon={cart} slot="start" className="min-purchase"></IonIcon>
                                    <p>Min: {modalData && modalData.min_purchase} {modalData && modalData.unit_type}</p>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonCardContent>
                            <IonItem lines={"none"}>
                                <IonAvatar slot="start">
                                    <img src={modalData && modalData.user.profile_image} />
                                </IonAvatar>
                                <h1>{modalData && modalData.user.username}</h1>
                                <IonChip slot="end" color="warning" onClick={AddOrRemoveFriend}><IonIcon icon={modalData && (modalData.user.friend_list.includes(user.Username) ? checkmarkCircle : personAdd)} color="dark"></IonIcon></IonChip>
                            </IonItem>
                            <IonItem lines={"none"} >
                                <IonIcon slot="start" icon={mail}></IonIcon>{modalData && modalData.user.email}
                            </IonItem>
                            <IonItem lines={"none"}>
                                <IonIcon slot="start" icon={call}></IonIcon>
                                {modalData && modalData.user.whatsapp_number}
                            </IonItem>
                            <IonItem lines={"none"}>
                                <whatsapp-button phone={modalData && modalData.user.whatsapp_number} dialcode="62" text="hey there lets chat!" label="Chat"></whatsapp-button>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </IonContent>

            </IonModal>
            <IonToast
                isOpen={toast}
                onDidDismiss={() => setToast(false)}
                message={modalData && (modalData.user.friend_list.includes(user.Username) ? "User Remove from Friend List" : "User Added to Friend List")}
                position="top"
                duration={800}
            />
        </React.Fragment>

    )
}


export default Posts;