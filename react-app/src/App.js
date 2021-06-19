import React, {useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Button from '@material-ui/core/Button';
import {Table} from './table'
import {ButtonAppBar} from './components/bar';
import {Drivers} from './components/drivers';
import {Tasks} from './components/tasks';
import {Assignment} from './components/assignment';
import {Notifications} from './components/notifications';



function App() {

  const [selectDriver, setSelectDriver] = useState(undefined);
  const [selectTask, setSelectTask] = useState(undefined);

  const [drivers, setDrivers] = useState([]);
  const [driverToTask, setDriverToTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [taskToDriver, setTaskToDriver] = useState({});

  // Notifications management
  const [alert, setAlert] = React.useState({open: false, msg: '', severity: ''}); 

  useEffect(async () => {
      fetch('http://localhost:3000/drivers')
      .then(res => res.json())
      .then(data => setDrivers(data))
      .catch(e => setAlert({open: true, msg: 'Failed to fetch drivers!', severity: 'error'}));

      fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(e => setAlert({open: true, msg: 'Failed to fetch tasks!', severity: 'error'}));

      fetch('http://localhost:3000/assignment')
      .then(res => res.json())
      .then(data => {
        setTaskToDriver(data.taskToDriver);
        setDriverToTask(data.driverToTask);
      })
      .catch(e => setAlert({open: true, msg: 'Failed to fetch assocs !', severity: 'error'}));
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlert({open: false, msg: '', severity: 'success'});
  };

  const resetSelection = () => {
    setSelectDriver(undefined);
    setSelectTask(undefined);
  }
  const assignmentProps = {
    selectDriver,
    setSelectDriver,
    selectTask,
    setSelectTask,
    drivers,
    setDrivers,
    tasks,
    setTasks,
    driverToTask,
    setDriverToTask,
    taskToDriver,
    setTaskToDriver,
    alert,
    setAlert,
  }

  return (
    <>
      <Router>
        <div className="App" onClick={resetSelection}>
          <ButtonAppBar />
          <Switch>
            <Route path="/drivers">
              <Drivers 
                drivers={drivers}
                tasks={tasks}
                driverToTask={driverToTask} 
                viewOnly={true}/>
            </Route>
            <Route path="/tasks">
              <Tasks
                tasks={tasks}
                drivers={drivers}
                taskToDriver={taskToDriver}
                viewOnly={true}
            />
            </Route>
            <Route path={["/", "/assignment", "/home"]}>
            <Assignment 
              selectedDriver={selectDriver}
              onSelectDriver={setSelectDriver}
              selectedTask={selectTask}
              onSelectTask={setSelectTask}
              onFullMatch={resetSelection}
              {...assignmentProps}
            />
            </Route>
            <Route path="/profile">
              Profile
            </Route>
            <Route path="/settings">
              Settings
            </Route>
            <Route path="/logout">
              Logout
            </Route>
          </Switch>
        </div>
      </Router>
      <Notifications handleClose={handleClose} {...alert}/>
    </>
  );
}

export default App;
