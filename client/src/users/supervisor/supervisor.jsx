import React, { useEffect, useState } from "react";
import axios from "axios"

import Modal from "../../components/UI/modal";

import "./supervisor.css";
import { Link, useNavigate } from "react-router-dom";

function SuperVisor() {
   
    const [formOpen, setFormOpen] = useState(false);  
    const [showNotifications, setShowNotifications] = useState(true);
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [shifts, setShifts] = useState([]);
    const [notificationForm, setNotificationForm] = useState(false)
    const [description, setDescription] = useState(); //description for hazards
    const [designation, setDesignation] = useState();
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const fetchShifts = async ()=>{
        const response = await axios.get('http://localhost:5000/api/v1/shifts', {fromTime, toTime})
        setShifts(response.data.shifts)
    }

    const fetchNotifications = async ()=>{
      const response = await axios.get('http://localhost:5000/api/v1/notifications');
      setNotifications(response.data.notifications)
    }

    useEffect(()=>{
        fetchShifts()
        fetchNotifications();
    },[])

  const formOpenHandler = ()=>{
    setFormOpen(true);
    setNotificationForm(false);
  }

  const formCloseHandler = ()=>{
    setFormOpen(false);
  }

  const notificationDisplayHanlder = ()=>{
    setNotificationForm(true);
    setFormOpen(true)
  }

  const formSubmitHandler = async ()=>{
    setFormOpen(false);
    try{
      if(notificationForm === true){
        await axios.post('http://localhost:5000/api/v1/notifications', {description, designation})
        fetchNotifications();
      }
      else{
        await axios.post('http://localhost:5000/api/v1/shifts', {fromTime, toTime})
        fetchShifts();
      }     
    }
    catch(error){
      console.log(error);
    }
    setNotificationForm(false);
  }

  return (
    <React.Fragment>
      <Modal
        show={formOpen}
        onCancel={formCloseHandler}
        header="Shift Form"
        contentClass="Place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <div>
            <button onClick={formCloseHandler}>CLOSE</button>{" "}
            <button onClick={formSubmitHandler}>SUBMIT</button>
          </div>
        }
      >
        {notificationForm? 
        <form>
          <textarea name="" id="" className="textarea" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Enter the hazard or Red flag"></textarea>
          <label htmlFor="">Addressing To :- </label>
            <select name="cars" id="cars" onChange={(e)=>{setDesignation(e.target.value)}}>
              <option style={{backgroundColor: "black", color: "white"}} value="">Select Designation</option>
              <option value="Everyone">Everyone</option>
              <option value="Electrical Engineer">Electrical Engineer</option>
              <option value="Mechanical Engineer">Mechanical Engineer</option>
              <option value="Mining Engineer">Mining Engineer</option>
              <option value="workmen">workmen</option>
            </select>
        </form>
        : 
        <form>
          <input
            type="text"
            placeholder="enter from time"
            onChange={(e) => setFromTime(e.target.value)}
            value={fromTime}
          />
          <input
            type="text"
            placeholder="enter to time"
            onChange={(e) => setToTime(e.target.value)}
            value={toTime}
          />
        </form>
        }
      </Modal>

      <header className="sup-op-header">
        <h1>Mine - RG-0</h1>
        <button style={{marginLeft: "20px"}} onClick={()=>{navigate('/')}}>back</button>
      </header>
      <section className="sup-op-section">
        <div className="buttons-div">
          <button
            onClick={() => {
              setShowNotifications(true);
            }}
          >
            notifications
          </button>
          <button
            onClick={() => {
              setShowNotifications(false);
            }}
          >
            shifts
          </button>
        </div>
        {showNotifications ? (
          <div className="notifications-container">
            <h1>Hazards and RedFlags</h1>
            {notifications.map((notification, index)=>{
              return (
              <div className="notification-card">
                <h2>{notification.description}</h2>
                <hr />
                <h3>Addressing To :- {notification.addressingTo}</h3>
              </div>
              )
            })}
            <button onClick={notificationDisplayHanlder}>Push Notification</button>
          </div>
        ) : (
          <div className="shifts-container">
            <h1>Shift - Logs</h1>
            {shifts.map((shift,index)=>{
                return(
                    <Link to={`/addOperator/${shift._id}`}>
                <div key={index} className="shift-card">
                <h2>Shift {index+1}</h2>
                <h2>{shift.fromTime} to {shift.toTime}</h2>
            </div>   </Link>
                )
            })}
            <button onClick={formOpenHandler}>Add Shifts</button>
          </div>
        )}
        <div className="smp-button-div">
          <Link to={'/smp'}><button>View SMP</button></Link> 
        </div>
      </section>
    </React.Fragment>
  );
}

export default SuperVisor;
