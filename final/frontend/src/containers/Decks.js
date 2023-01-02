import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import Foot from "../components/Foot";
import Button from '@mui/material/Button';
import DeckCard from "../components/DeckCard";
import Pagination from '@mui/material/Pagination'
import AddCardIcon from '@mui/icons-material/AddCard';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import instance from "../api";
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
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: "100%",

    color: theme.palette.text.secondary,

  }));

  const displayTitle = (T) =>
  (
      <Grid sx={{ width: '70%', height :'9vh',alignItems: "start",justifyContent: 'space-around',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={3} sm={3} md={3} alignItems="center" justifyContent = "center" height = {1}>
            <Typography variant="h5">{T}</Typography>
          </Grid>
          <Grid item xs={3} sm={3} md={6} alignItems="center" justifyContent = "center" height = {1}>
          </Grid>
          <Grid item xs={3} sm={3} md={3} alignItems="center" justifyContent = "center" textAlign="center" height = {1}>
          </Grid>
      </Grid>
  )

function Decks() {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [decks,setDecks] = useState([]);
    const [deckID,setDeckID] = useState("1");
    const [deck,setDeck] = useState([]);
    const navigate = useNavigate();
    const getInitDeck = async () => {
        // example
      
        const {
          data: { message, contents },
        } = await instance.get("/initDeck", {
          params: { page: page },
        });
        setMaxPage(message)
        setDecks(contents)
        console.log(contents);
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
      useEffect(() => {
       
        getDeckDetailbyID()

      }, [deckID])
    const handleChange = (event, value) => {
        setPage(value);
        //alert(value)
    };
    const [open, setOpen] = useState(false);
    const handleOpen = (ind) => 
    {
        setDeckID(ind)
        setOpen(true);
        
        //alert(ind);
    }
    const handleClose = () => setOpen(false);
    useEffect(() => {
        // Just run the first time
        //alert('render')
      }, [])
    useEffect(() => {
        // Just run the first time
        //alert('render')
        getInitDeck()
      }, [page])

	return (
    	<>
            <HeadNav/>
            <Box
            sx = {{
                backgroundColor: '#F5F5F5',
                display: "flex",
                justifyContent: 'center',
                alignContent: "center",
                width: '100%',
                height: '110vh',
                margin: 0,
            }}
            >
                <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "100%",
                    margin: 0.4,
                    marginBottom: 10,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                }}
                >
                    <Grid sx={{ width: '100%', height :'100%',alignContent: "start",alignItems: "flex-start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid sx={{ width: '70%', height :'7%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                        </Grid>
                        {displayTitle("牌組分享區")}
                        <Grid sx={{ width: '70%', height :'7%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                        </Grid>
                        <Grid sx={{ width: '67%', height :'15%',alignContent: "start",alignItems: "start",justifyContent: 'start',display:'flex',borderRadius:'5%',backgroundColor:"#F0F8FF"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                            <Grid item xs={12} sm={12} md={12} alignContent="start" alignItems="start" justifyContent = "start" height = {0.3}>
                                <Typography variant="h6">說明:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} alignContent="start" alignItems="start" justifyContent = "start" height = {0.7}>
                                <Typography variant="body2">這裡是分享牌組的地方，登入過後的用戶可以在這裡分享自己推薦的牌組喔</Typography>
                                <Typography variant="body2">注：目前至支援指定模式的牌組分享！！</Typography>
                            </Grid>
                        </Grid>
                        <Grid sx={{ width: '70%', height :'12%',alignContent: "center",alignItems: "center",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                            <Grid item xs={3} sm={3} md={7} alignItems="center" justifyContent = "center" height = {1}>

                            </Grid>
                            <Stack spacing={2} direction="row">
                                {localStorage.getItem("uid")?
                                    <Button onClick={()=> navigate('/decks/send')}  size="medium" variant="outlined" color="success" endIcon={<AddCardIcon />}>分享牌組</Button>
                                    :<Button disabled size="medium" variant="outlined" color="success" endIcon={<AddCardIcon />}>分享牌組</Button>
                                }
                            </Stack>
                        </Grid>
                        <Grid sx={{ width: '67%', height :'20%',alignItems: "center",justifyContent: 'start',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                            {
                                decks.map((d) =>(
                                    <Grid item xs={3} sm={3} md={2} alignItems="center" justifyContent = "center" >
                                        <Box onClick = {() => handleOpen(d.Deck_ID)}> 
                                            <DeckCard name ={d.name} info={d.info} user={d.User_Name} time = {d.created_at.slice(0,10)} craft = {d.craft}/>
                                        </Box>
                                    </Grid>
                                ))
                            } 
                            
                            
                            
                            <Grid sx={{ width: '70%', height :'1%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 10, sm: 10, md: 10 }}>
                            </Grid>
                            <Grid item xs={4} sm={8} md={12} height ={0.02} alignItems="center">
                                <Stack spacing={2} alignItems="center" height="100%">
                                    <Pagination count={maxPage} page ={page} onChange = {handleChange}/>
                                </Stack>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                </Box>
            </Box>
            <Foot/>
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
                                    <Item>
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
                                    </Item>
                                </Grid>
                            ))
                            } 
                        </Grid>
                    </Stack>
                </Box>
            </Modal>
        </>

  	);
}

export default Decks;