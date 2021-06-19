const RosteringPages = {
   DRIVERS: 1,
   TASKS: 2,
   ASSIGNMENT: 3,
};
const AccountPages = {
   PROFILE: 4,
   SETTINGS: 5,
   LOGOUT: 6,
};

Object.freeze(RosteringPages);
Object.freeze(AccountPages);

const RosteringPageToPathAndName = {
	[RosteringPages.DRIVERS]: {path: '/drivers', displayName: 'Drivers'},
	[RosteringPages.TASKS]: {path: '/tasks', displayName: 'Tasks'},
	[RosteringPages.ASSIGNMENT]: {path: '/assignment', displayName: 'Assignment'},
};

const AccountPageToPathAndName = {
	[AccountPages.PROFILE]: {path: '/profile', displayName: 'Profile'},
	[AccountPages.SETTINGS]: {path: '/settings', displayName: 'Settings'},
	[AccountPages.LOGOUT]: {path: '/logout', displayName: 'Logout'},
}

export {RosteringPages, AccountPages, RosteringPageToPathAndName, AccountPageToPathAndName};