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
    <div className='row'>
      <div className='col-6'>
           {isEditMode ? 
        (<div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>Edit RobotDetails</h5>
            </div>
            <div className='card-body'>

            <form onSubmit={handleSubmit}>
          <div className="mb-3 row">
            <label className='col-sm-3 col-form-label'>Robot Name</label>
            <div className="col-sm-9">
            <input type='text' name='robotName' value={formData.robotName} onChange={handleChange}></input>
            </div>
          </div>
            <div className="mb-3 row">
              <label className='col-sm-3 col-form-label'>Owner Name</label>
              <div className="col-sm-9">
                <input type='text' name='ownerName' value={formData.ownerName} onChange={handleChange}></input>
              </div>
            </div>
            <div className="mb-3 row">
              <label className='col-sm-3 col-form-label'>Location</label>
              <div className="col-sm-9">
                            <input type='text' name='location' value={formData.location} onChange={handleChange}></input>

              </div>
            </div>
            <div className="mb-3 row">
              <label className='col-sm-3 col-form-label'>Firmware Version</label>
              <div className="col-sm-9">
                <input type='text' name='firmwareVersion' value={formData.firmwareVersion} onChange={handleChange}></input>
              </div>
            </div>
            
            <button type='submit' className='btn-save'>Save</button>
        </form>
        </div>
          </div>
      ) : 
        (<div className='card'>
          <div className='card-header'>
            <h5 className='mb-0'>RobotDetails</h5>
          </div>
          <div className='card-body'>
             <p><b>Robot ID:</b> {selectedRobot.id}</p>
            <p><b>Robot Name:</b> {selectedRobot.robotName}</p>
            <p><b>Owner:</b> {selectedRobot.ownerName}</p>
            <p><b>Location:</b> {selectedRobot.location}</p>
            <p><b>Last Active:</b> {selectedRobot.lastActive}</p>
            <p><b>Firmware Version:</b> {selectedRobot.firmwareVersion}</p>
          </div>
        </div>)
    }
      </div>
       
    </div>
  )
}
