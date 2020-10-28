import React,{useState,useRef} from 'react'
import {IonRow, IonCol, IonSlide,IonSlides} from '@ionic/react'
import { MenuBar } from '../components/MenuBar';

import UserLogin from './Login'
import UserRegister from './Register'

function LoginOrRegister(props){

    const slidesRef = useRef();

    const [LoginOrRegister, setLoginOrRegister] = useState("Register")

    const setLoginOrRegisterHandler = (value) => {
        setLoginOrRegister(value)
        if(value === "Register"){
            slidesRef.current.slideTo(0);
        }else if(value === "Login"){
            slidesRef.current.slideTo(1);
        }       
    }

    var slideOpts = {
        speed: 400
    };

    const slideChanged = async () => {
        var segment = await slidesRef.current.getActiveIndex();
        if(segment === 1){
            setLoginOrRegister("Login")
        }else if(segment === 0){
            setLoginOrRegister("Register")
        }
    }
    return (
        <div>
            <IonRow>
                <IonCol>
                    <MenuBar selectedValue={LoginOrRegister} onSelectValue={setLoginOrRegisterHandler}/>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                    <IonSlides options={slideOpts} onIonSlideDidChange={slideChanged} ref={slidesRef}>  
                        <IonSlide>
                            <UserRegister props={props}/>                          
                        </IonSlide>  
                        <IonSlide>
                            <UserLogin props={props}/>
                        </IonSlide>   
                    </IonSlides>                  
                </IonCol>           
            </IonRow>
        </div>
    )
}


export default LoginOrRegister;