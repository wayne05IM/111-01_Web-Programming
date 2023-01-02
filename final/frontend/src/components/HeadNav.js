import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme ,ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
const pages = ['cards', 'decks', 'articles'];
const settings = ['user', 'logout'];
const pagesDict = {
  cards:{title:"卡牌圖鑑"},
  decks:{title:"卡組分享"},
  articles:{title:"精選文章"},
  battles:{title:"對局分享"}
}
const settingsDict = {
  user:{title:"個人頁面"},
  logout:{title:"登出"}
}
let theme = createTheme({

  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#fff',
      light: "#8ab4c0",
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#F5F5F5',
    },
  },
});
function HeadNav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    
  };
  const handleSettings = (s) => {
    setAnchorElUser(null);
    if(s == "user")
      navigate('/'+s+'/'+ localStorage.getItem("uid"))
    if(s == "logout")
    {
      localStorage.removeItem("uid")
      navigate('/')
    }


    
  };
  const loginDisplay = () =>
  (
    <Box sx={{ flexGrow: 0 }}>
        <Button
          onClick={ ()=>navigate('/login')}
          sx={{ my: 2, color: 'black', display: 'block' }}
        >
          Login
        </Button>
    </Box>
  )
  const avatarDisplay = () =>
  (
    <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=> handleSettings(setting)}>
                  <Typography textAlign="center">{settingsDict[setting].title}</Typography>
                </MenuItem>
              ))}
            </Menu>
    </Box>
  )
  return (
    <ThemeProvider theme={theme}>
    <AppBar position="static" >
      <Container maxWidth="xxl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              flexGrow: 0,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SV-TOOLBOX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) =>(
                <MenuItem key={page} onClick={()=> navigate('/'+page)}>
                  <Typography 
                  textAlign="center"
                  >
                    {pagesDict[page]["title"]}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SV-TOOLBOX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=> navigate('/'+page)}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {pagesDict[page]["title"]}
              </Button>
            ))}
          </Box>
          {localStorage.getItem("uid") ? avatarDisplay() : loginDisplay()
          }
          {//avatarDisplay()
          }
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default HeadNav;