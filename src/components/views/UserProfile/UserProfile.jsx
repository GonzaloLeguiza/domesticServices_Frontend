import React, { useState ,useEffect } from "react";
import styles from "./UserProfile.module.css";
import {useDispatch, useSelector} from 'react-redux'
import { getUser } from "../../../redux/actions";
import toast, { Toaster } from "react-hot-toast";

import axios from "axios";

export default function UserProfile() {
 
  const [showServiceContent, setShowServiceContent] = useState(false);
  const [showProfileSection, setShowProfileSection] = useState(false);
  const [showEditProfile, setshowEditProfile] = useState(false);
  const [showMyOrders, setShowMyOrders] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const idUser = useSelector(state => state.currentUserIdLoggedIn)
  const userInfo = useSelector(state => state.userInfo);
  const [services, setServices] = useState(userInfo.Services);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState(userInfo.imageUrl);
  const [inputs, setInputs] = useState({
    imageUrl: "",
    name: "", 
    country: "",
    city: "",
    email: "", 
    description: "",
    phone: "",
  });
  console.log(userInfo);

  useEffect(() => {
    dispatch(getUser(idUser));
  }, [dispatch, idUser])


  //<--MANEJADOR DE PERFIL-->
  const handleProfileClick = () => {
    setShowProfileSection(true);
    setShowServiceContent(false);
    setShowMyOrders(false);
    setshowEditProfile(false);
    setInitialLoad(false);

  };
  
  //<--MANEJADOR DE EDITOR DE PERFIL-->
  const handleEditProfileClick = () => {
    setShowProfileSection(false);
    setshowEditProfile(true);
    setShowServiceContent(false);
    setShowMyOrders(false);
    setInitialLoad(false);
  };

  //<--MANEJADOR DE SERVICIOS-->
  const handleServiceClick = () => {
    setShowServiceContent(true);
    setShowProfileSection(false);
    setShowMyOrders(false);
    setshowEditProfile(false);
    setInitialLoad(false);
  };

//<--MANEJADOR DE COMPRAS-->
  const handleMyOrdersClick = () => {
    setShowServiceContent(false);
    setShowProfileSection(false);
    setShowMyOrders(true);
    setshowEditProfile(false);
    setInitialLoad(false);
  };
  
  //<--MANEJADOR DE BOTON SWITCH-->
  const handleSwitchChange = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, enabled: !service.enabled }
          : service
      )
    );
  };

  //<--MANEJADOR DE CLICK EN IMAGEN-->
  const handleEditClick = () => {
    setIsEditing(true);
  };


  //<--MANEJADOR DE INPUTS-->
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    if (name === "imageUrl") {
      const file = event.target.files[0];
      const imageSelected = URL.createObjectURL(file);
      setSelectedImages([imageSelected]);
    
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "services_wfy");
      formData.append("api_key", "168773883428854");
    
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/Joaquin/image/upload",
          formData
        );
    
        const imageUrl = response.data.secure_url;
        setImageUrl(imageUrl);
        setIsEditing(false);
    
        setInputs({
          ...inputs,
          imageUrl: [...inputs.imageUrl, imageUrl],
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else{
      
      setInputs({
        ...inputs,
        [name]: value,
      });
    }
  }

  //<--MANEJADOR DEL SUBMIT-->
  const handleSubmit = async(event) => {
      event.preventDefault();

    //<--RUTA DEL POST-->
      try {
        
      } catch (error) {
        
      }
  }

  return (
  <div className={styles.containerPrincipal}>
      <h4>Account Settings</h4>
    <div className={styles.containerSecundary}>
      <div className={styles.containerLeftRight}>
        <div className={styles.columnLeft}>
            <h3 className={styles.name}>Profile Settings</h3>
        <button type="button" class="btn btn-primary btn-lg" value="My profile" onClick={handleProfileClick}>My profile</button>
        <button type="button" class="btn btn-primary btn-lg" value="My profile" onClick={handleEditProfileClick}>Edit profile</button>
        <button type="button" class="btn btn-primary btn-lg" value="Service" onClick={handleServiceClick}>Services</button>
        <button type="button" class="btn btn-primary btn-lg" value="Logout" onClick={handleMyOrdersClick}>Orders</button>
      </div>
      {(initialLoad) && (
      <div className={styles.infoProfileContainer}>
      <div className={styles.infoProfile}>
            <h5><strong>My profile</strong></h5>
            <div className={styles.profile1}>
              <img src={userInfo.imageUrl}/>
              <div className={styles.profileson}>
                <h5><strong>{userInfo.name}</strong></h5>
                <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
              </div>
            </div>
            <div className={styles.profile2}>
              <h5><strong>Personal information</strong></h5>
              <div className={styles.profilep} >
                <p>Full Name: <strong>{userInfo.name}</strong></p>
                <p>Email address: <strong>{userInfo.email}</strong></p>
              </div>
              <div className={styles.profilep1}>
                <p>Phone: <strong>{userInfo.phone ? userInfo.phone : "Please confirm your phone"}</strong></p>
              </div>
            </div>
            <div className={styles.profile3}>
              <h5><strong>Address</strong></h5>
              <div className={styles.profilep2}>
                <p>Country: <strong>{userInfo.country ? userInfo.country : "Please confirm your country"}</strong></p>
                <p>City: <strong>{userInfo.city ? userInfo.city : "Please confirm your city"}</strong></p>
              </div>
            </div>
      </div>
      </div>
      )}
    </div>
      <div className={styles.columnRight}>
        {showProfileSection && (
          <div className={styles.infoProfile}>
          <h5><strong>My profile</strong></h5>
          <div className={styles.profile1}>
            <img src={userInfo.imageUrl}/>
            <div className={styles.profileson}>
              <h5><strong>{userInfo.name}</strong></h5>
              <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
            </div>
          </div>
          <div className={styles.profile2}>
            <h5><strong>Personal information</strong></h5>
            <div className={styles.profilep} >
              <p>Full Name: <strong>{userInfo.name}</strong></p>
              <p>Email address: <strong>{userInfo.email}</strong></p>
            </div>
            <div className={styles.profilep1}>
              <p>Phone: <strong>{userInfo.phone ? userInfo.phone : "Please confirm your phone"}</strong></p>
            </div>
          </div>
          <div className={styles.profile3}>
            <h5><strong>Address</strong></h5>
            <div className={styles.profilep2}>
              <p>Country: <strong>{userInfo.country ? userInfo.country : "Please confirm your country"}</strong></p>
              <p>City: <strong>{userInfo.city ? userInfo.city : "Please confirm your city"}</strong></p>
            </div>
          </div>

    </div>
        )}

        {showEditProfile && (
          <>
           <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className={styles.title1}>
              <p><strong>My personal information</strong></p>
            </div>
            <div className={styles.containerEditProfile}>

              <div>
                <div className={styles.subtitle}>
                  <p >Basic information</p>
                </div>
               
                <div className={styles.imageProfile}>
                  <p><strong>Profile Image</strong> </p>
                  <p>A profile photo helps personalize your account</p>
                  {isEditing ? (
                    <input
                    name="imageUrl"
                    value={inputs.imageUrl}
                    type="file" 
                    onChange={handleInputChange} />
                  ) : (
                    <>
                      <img src={userInfo.imageUrl} alt="Profile" />
                      <button onClick={handleEditClick}>Edit</button>
                    </>
                  )}
                </div>
                <div className={styles.imageProfile}>
                  <p><strong>Name</strong></p>
                  <p>{userInfo.name}</p>
                  <input
                  name="name" 
                  value={inputs.name}
                  onChange={handleInputChange}
                  type="name" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New name"
                  >
                  </input>
                </div>

                <div className={styles.imageProfile}>
                  <p><strong>Country</strong></p>
                  <p>{userInfo.country ? userInfo.country : "Please confirm your country"}</p>
                  <input 
                  name="country" 
                  value={inputs.country}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New country"></input>
                </div>

                <div className={styles.imageProfileCity}>
                  <p><strong>City</strong></p>
                  <p>{userInfo.city ? userInfo.city : "Please confirm your country"}</p>
                  <input 
                  name="city" 
                  value={inputs.city}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl1} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New city"></input>
                </div>

              </div>
            </div>
              <div className={styles.newInfo}>
              <div>
              <div className={styles.subtitle}>
                  <p>Contact information</p>
                </div>
                <div className={styles.imageProfile}>
                  <p><strong>Email</strong></p>
                  <p>{userInfo.email}</p>
                  <input 
                  name="email" 
                  value={inputs.email}
                  onChange={handleInputChange}
                  type="email" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New email"></input>
                </div>

                <div className={styles.imageProfile}>
                  <p><strong>Description</strong></p>
                  <p>{userInfo.description ? userInfo.description : "Please confirm a description"}</p>
                  <input 
                  name="description" 
                  value={inputs.description}
                  onChange={handleInputChange}
                  type="text" 
                  className={`${styles.inputControl} && form-control`} 
                  id="exampleFormControlInput1" 
                  placeholder="New description"></input>
                </div>

                <div className={styles.imageProfileCity}>
                  <p><strong>Phone</strong></p>
                  <p>{userInfo.phone ? userInfo.phone: "Please confirm your phone"}</p>
                  <input 
                  name="phone" 
                  value={inputs.phone}
                  onChange={handleInputChange}
                  type="name" 
                  className={`${styles.inputControl1} && form-control`} 
                  id="exampleFormControlInput1"
                  placeholder="New phone"></input>
                </div>

                </div>
              </div>
              <div className="col-12">
            <button
              type="submit"
              className={`${styles.myButton} btn btn-outline-secondary`} 
              disabled={isSubmitting}>
               {isSubmitting ? "Saving..." : "Save changes"}
            </button>
          </div>
          <Toaster position="bottom-right" reverseOrder={false} />
              </form>
          </>
        )}
        {showServiceContent && (
        <>
        <div className={styles.title}>
          <p><strong>My services</strong></p>
        </div>
       
          {userInfo.Services && userInfo.Services.map((service, index) => ( 
          <div key={index} className={styles.containerService}>
              <img src={service.imageUrl[0]}/>
              <div>
                <p><strong>{service.nameService}</strong></p>
                <p>{service.location?.pais} -{" "}
                {service.location?.ciudad}</p>
                <p>Price per hour: ${service.pricePerHour}</p>
            </div>
                <div className={styles.descriptionService}>
                <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`switchButton-${service.id}`}
                checked={service.enabled}
                onChange={() => handleSwitchChange(service.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`switchButton-${service.id}`}
              >
                {service.enabled ? 'Enabled' : 'Disabled'}
              </label>
            </div>
                  
                </div>
          </div>))}
        
          
          
         </>
        )}
        {showMyOrders && (
          <>
        <div className={styles.title}>
          <p><strong>My orders</strong></p>
        </div>
          <div className={styles.containerOrder}>ORDER
          
          </div>
          
          </>
        )}
        
        </div>
      </div>
  </div>
  );
}


