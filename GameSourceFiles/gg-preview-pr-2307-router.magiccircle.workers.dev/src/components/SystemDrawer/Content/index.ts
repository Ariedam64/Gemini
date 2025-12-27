import PartyDrawer from './PartyDrawer/PartyDrawer';
import ProfileDrawer from './ProfileDrawer/ProfileDrawer';

const drawerContent = {
  profile: ProfileDrawer,
  'profile-avatar': ProfileDrawer,
  party: PartyDrawer,
  'party-players': PartyDrawer,
  'party-join': PartyDrawer,
  'party-invite': PartyDrawer,
  'party-settings': PartyDrawer,
};

export type DrawerType = keyof typeof drawerContent;
export default drawerContent;
