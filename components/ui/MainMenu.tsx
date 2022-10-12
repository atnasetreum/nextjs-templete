import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import {
  InboxOutlined as InboxOutlinedIcon,
  MailOutlineOutlined as MailOutlineOutlinedIcon,
} from '@mui/icons-material';

import { useAppSelector, useAppDispatch } from '@hooks';
import { toggleMenu } from '@slices';

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts'];

export const MainMenu = () => {
  const { isOpenMenu } = useAppSelector((state) => state.iu);
  const dispatch = useAppDispatch();

  const setToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <Drawer
      anchor="left"
      open={isOpenMenu}
      onClose={setToggleMenu}
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '5px 10px' }}>
          <Typography variant="h4">Menú</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text} onClick={setToggleMenu}>
              <ListItemIcon>
                {index % 2 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <MailOutlineOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {menuItems.map((text, index) => (
            <ListItem button key={text} onClick={setToggleMenu}>
              <ListItemIcon>
                {index % 2 ? (
                  <InboxOutlinedIcon />
                ) : (
                  <MailOutlineOutlinedIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
