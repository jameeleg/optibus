import React from 'react';
import { Link } from "react-router-dom";


import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';


import {
  RosteringPageToPathAndName,
  AccountPageToPathAndName
} from '../consts'



const useStyles = makeStyles({
  list: {
    width: 250,
  },
  noLink: {
    textDecoration: 'none',
    color: 'black',
  }
});



export const LeftNavigationBar = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState(!state);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {Object.keys(RosteringPageToPathAndName).map((page, index) => {
          const icons = [EmojiPeopleIcon, AssignmentTurnedInIcon, AssignmentIcon];
          const Icon = icons[index];
          const {path, displayName} = RosteringPageToPathAndName[page];
          return(
            <Link color="primary" to={path} key={displayName} className={classes.noLink} onClick={() => props.onPageChanged(displayName)}>
              <ListItem button>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={displayName} />
              </ListItem>
            </Link>
        )
      })}
      </List>
      <Divider />
      <List>
        {Object.keys(AccountPageToPathAndName).map((page, index) => {
          const {path, displayName} = AccountPageToPathAndName[page];
          const icons = [PersonIcon, SettingsIcon, ExitToAppIcon]
          const Icon = icons[index];

          return (
            <Link color="primary" to={path} key={displayName} className={classes.noLink} onClick={() => props.onPageChanged(displayName)}>
              <ListItem button>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={displayName} />
              </ListItem>
            </Link>
        )})}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <MenuIcon onClick={toggleDrawer}/>
          <Drawer anchor={'left'} open={state} onClose={toggleDrawer}>
            {list()}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
