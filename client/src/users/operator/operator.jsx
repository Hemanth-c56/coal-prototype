import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/UI/modal";

import "./operator.css";

function Operator() {
  const [shifts, setShifts] = useState([]);
  const [expandedShiftIndex, setExpandedShiftIndex] = useState(null);
  const [notificationFormOpenHanlder, setNotificationFormOpenHanlder] = useState(false)
  const [description, setDescription] = useState(); //description for hazards
  const [designation, setDesignation] = useState();
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const operatorId = '66d756d3f746f0c73ffb90bd';

  const fetchShifts = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/operators/${operatorId}/shifts`);
      setShifts(response.data.shifts);
    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  };

  const fetchNotifications = async ()=>{
    try {

      const response = await axios.get(`http://localhost:5000/api/v1/notifications`);
      setNotifications(response.data.notifications);

    } catch (error) {
      console.error("Error fetching shifts:", error);
    }
  }

  useEffect(() => {
    fetchShifts();
    fetchNotifications();
  }, []);

  const toggleExpand = (index) => {
    setExpandedShiftIndex(expandedShiftIndex === index ? null : index);
  };
  
  const formCloseHandler = ()=>{
    setNotificationFormOpenHanlder(false)
  }

  const formSubmitHandler=  async ()=>{
    setNotificationFormOpenHanlder(false)
    try{
        await axios.post('http://localhost:5000/api/v1/notifications', {description, designation})
        fetchNotifications();
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <React.Fragment>

<Modal
        show={notificationFormOpenHanlder}
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
      </Modal>

      <header className="sup-op-header">
        <h1>Mine - RG-0</h1>
        <button style={{marginLeft: "20px"}} onClick={()=>{navigate('/')}}>back</button>
      </header>
      <section className="sup-op-section">
        <div className="shifts-container">
          <h1>Assigned Shifts</h1>
          {shifts.map((shift, index) => (
            <div key={index}>
              <div 
                className="operator-shift-card" 
                onClick={() => toggleExpand(index)}
              >
                <h2>Shift - {index + 1}</h2>
                <h3>{shift.fromTime} to {shift.toTime}</h3>
              </div>
              <br />
              {expandedShiftIndex === index && (
                <div className="operator-shift-card-details">
                  <p>{shift.description || "No description available"}</p>
                </div>
              )}
            </div>
          ))}
        </div>
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
          <button onClick={()=>{setNotificationFormOpenHanlder(true)}}>Push Notification</button>
        </div>
        <Link to={'/smp'}>
          <button className="spm-btn">View SMP</button>
        </Link> 
      </section>
    </React.Fragment>
  );
}

export default Operator;
