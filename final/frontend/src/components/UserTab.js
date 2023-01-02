import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import ArticleCard from "../components/ArticleCardLong";
import DeckCard from "../components/DeckCard";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Unstable_Grid2';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import instance from "../api";
const ranks = ["Beginner","C","B","A","AA","Master","Grand Master"]
const theme = createTheme({

    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#1976d2',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#F5F5F5',
      },
    },
  });
  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: "100%",

    color: theme.palette.text.secondary,

  }));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UserTab({info,setInfo,rank,setRank,articles,decks,user,id}) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [tempInfo, setTempInfo] = React.useState(info);
  const [tempRank, setTempRank] = React.useState(rank);
  const [deckID,setDeckID] = React.useState("1");
  const [deck,setDeck] = React.useState([]);
  const updateUserbyUserID = async () => {
    // example

  
    const {
      data: { message, contents },
    } = await instance.get("/updateUserByID", {
      params: { User_ID: id,rank:tempRank,info:tempInfo},
    });
    console.log(contents);

    return contents
  };
  const getDeckDetailbyID = async () => {
    // example
    
  
    const {
      data: { message, contents },
    } = await instance.get("/deckDetail", {
      params: { Deck_ID: deckID },
    });
    //alert(contents[0])
    setDeck(contents.deckCard)
    console.log(contents);
  };
  React.useEffect(() => {
       
    getDeckDetailbyID()

  }, [deckID])
  React.useEffect(() => {
       
    setTempInfo(info)
    setTempRank(rank)

  }, [value])
  const handleOpen = (ind) => 
  {
    
    setDeckID(ind)
    setOpen(true);
      
      //alert(ind);
  }

  
  const handleClose = () => setOpen(false);
  const handleEdit = () => 
  {
	if(tempInfo.length!= 0)
	{
		setInfo(tempInfo); 
		setRank(tempRank);
		updateUserbyUserID()
	}
	else
		alert("自我介紹不可為空")

  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="分享的牌組" {...a11yProps(0)} />
          <Tab label="撰寫的文章" {...a11yProps(1)} />
          {id === localStorage.getItem("uid") ? <Tab label="設定" {...a11yProps(2)} />:null}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={2}>
          {
            decks.map((d)=>(
            <Box color="secondary"onClick = {() => handleOpen(d.Deck_ID)}> 
              <DeckCard name ={d.name} info={d.info} user={user} time = {d.created_at.slice(0,10)} craft = {d.craft}/>
            </Box>      
            ))
          }                
        </Stack> 
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={2}>
            {articles.map((a)=>(<ArticleCard name={a.Artical_name} info={a.Content.slice(0,20)+"..."} image={a.image} id={a.Artical_ID}/>))
            //articles.map((a)=>(alert(a.Artical_name)))
            }
        </Stack> 
      </TabPanel>
      {id === localStorage.getItem("uid") ? 
      <TabPanel value={value} index={2}>
      <Stack spacing={2}>

          <FormControl fullWidth>
                <InputLabel id="cost-label">階級</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tempRank}
                label="craft"
                onChange={(e)=>setTempRank(e.target.value)}
                >	
                  {ranks.map((c) => (<MenuItem value={c}>{c}</MenuItem>))}
                </Select>
          </FormControl>
          <Box>自我介紹:</Box>
          <TextareaAutosize value = {tempInfo} minRows={3} onChange={(e) => {setTempInfo(e.currentTarget.value);}}/>
          <Box></Box>
      </Stack> 
      <Grid sx={{ width: '100%', height :'5vh',alignItems: "center",justifyContent: 'end',display:'flex'}} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={3} sm={3} md={10} alignItems="center" justifyContent = "start" height = {1}>
              
          </Grid>
          <Grid item xs={3} sm={3} md={2} alignItems="center" display = "flex"justifyContent = "end" height = {1}>
              <Button onClick={handleEdit}  variant="outlined" color="primary" endIcon={<SendIcon />}>修改</Button>
          </Grid>
      </Grid>
     

    </TabPanel>
    : null
      }
      
    </Box>
    <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2}>
                        <Grid sx={{ width: '100%', height :'10%',alignContent: "center",alignItems: "center",justifyContent: 'start',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                        {
                            deck.map((d) =>(
                              <Grid item xs={3} sm={3} md={5}  alignItems="center" justifyContent = "center" display="flex">
                                  <Item2>
                                      <Grid sx={{ width: '100%', height :'2%',alignContent: "center",alignItems: "center",justifyContent: 'center',display:'flex'}} padding = {0}container spacing={{ xs: 2, md: 0 }} columns={{ xs: 9, sm: 9, md: 9 }}>
                                          <Grid item xs={3} sm={3} md={3}  alignItems="center" justifyContent = "center">
                                            <p>{"費用"+d.Card_cost}</p>
                                          </Grid>
                                          <Grid item xs={3} sm={3} md={3}  alignItems="center" justifyContent = "center">
                                            <p>{d.Card_name}</p>
                                          </Grid>
                                          <Grid item xs={3} sm={3} md={3}  alignItems="center" justifyContent = "center">
                                            <p>{"x"+d.Amount}</p>
                                          </Grid>
                                      </Grid>
                                  </Item2>
                              </Grid>
                            ))
                            } 
  
                        </Grid>
                    </Stack>
                </Box>
            </Modal>
    </ThemeProvider>
  );
}
