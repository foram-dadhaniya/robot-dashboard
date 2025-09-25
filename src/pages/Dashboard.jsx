import React, { useEffect } from 'react'
import { Cards } from '../components/Cards'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRobots } from '../features/robot/robot.slice';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {data: robots, loading} = useSelector((state) => (state.robots));
  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch]);

  const robotLocation = new Set(robots.map((r) => (r.location))).size;
  const uniqueUsers = robots.length > 0 
    ? new Set(robots.map((r) => r.ownerName)).size 
    : 0;

  const now = new Date();
  const activeRobot = robots.filter((r) => {
    const lastActive = new Date(r.lastActive);
    const diffHours = (now - lastActive) / (1000 * 60 * 60);
    return diffHours <= 24;
  }).length;
  if (loading) return <p>Loading robots...</p>;
  return (
    <div className='dashboard'>
      <div className='row'>
      <div className='col-md-3'>
        <Cards title="Robot Count" text={robots.length} className="card-lightshade-1" />
      </div>
      <div className='col-md-3'>
        <Cards title="Robot Covered Location" text={robotLocation} className="card-lightshade-2" />
      </div>
      <div className='col-md-3'>
        <Cards title="Active Robot" text={activeRobot} className="card-lightshade-3" />
      </div>
      <div className='col-md-3'>
        <Cards title="Users"  text={uniqueUsers} className="card-lightshade-4" />
      </div>
    </div>
    </div>
  )
}
