import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { editRobot, fetchRobotId } from './robot.slice';

export const RobotDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} =  useParams();
  const robotId = id;    
  const location = useLocation();
  const isEditMode = location.pathname.endsWith('/edit');
  const {selectedRobot, loading} = useSelector((state) => state.robots );

  const [formData, setFormData] = useState({
    robotName: "",
    ownerName: "",
    location:"",
    firmwareVersion:""
  });

 useEffect(() => {
  if (robotId && (!selectedRobot || selectedRobot.id !== robotId)) {
    dispatch(fetchRobotId(robotId));
  }
}, [selectedRobot, robotId, dispatch]);

  useEffect(() => {
    if(selectedRobot){
      setFormData({
        robotName: selectedRobot.robotName || "",
        ownerName: selectedRobot.ownerName || "",
        location: selectedRobot.location || "",
        firmwareVersion: selectedRobot.firmwareVersion || ""
      })
    }
}, [selectedRobot])

  
const handleChange = (e) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
    ...prev,
    [name] : value
  }));
}
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRobot = {
        ...selectedRobot,
        ...formData,
    };
    dispatch(editRobot(updatedRobot));
    navigate('/robot')
  }

if (loading || !selectedRobot) {
  return <p>Loading robot details...</p>;
}
  if(!selectedRobot) return <p>No robot selected</p>
  return (
    <>
        {isEditMode ? 
        (<form onSubmit={handleSubmit}>
            <label>Robot ID</label>
            <input type='text' name='robotName' value={formData.robotName} onChange={handleChange}></input>
            <input type='text' name='ownerName' value={formData.ownerName} onChange={handleChange}></input>
            <input type='text' name='location' value={formData.location} onChange={handleChange}></input>
            <input type='text' name='firmwareVersion' value={formData.firmwareVersion} onChange={handleChange}></input>
            <button type='submit'>Save</button>
        </form>) : 
        (<div>
            <h2>RobotDetails</h2>
            <p>Robot ID: {selectedRobot.id}</p>
            <p>Robot Name: {selectedRobot.robotName}</p>
            <p>Owner: {selectedRobot.ownerName}</p>
            <p>Location: {selectedRobot.location}</p>
            <p>Last Active: {selectedRobot.lastActive}</p>
            <p>Firmware Version: {selectedRobot.firmwareVersion}</p>
        </div>)
    }
    </>
  )
}
