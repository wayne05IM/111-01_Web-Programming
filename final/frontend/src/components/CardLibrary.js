import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import axios from "axios";
import instance from "../api";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    alignItems: 'start',
    height : '22vh',
    color: theme.palette.text.secondary,
  }));
const costs = ["all",0,1,2,3,4,5,6,7,8,9,"10+"]
const rares = ["all","青銅","白銀","黃金","傳說"]
const crafts = ["all","中立","精靈","皇家護衛","巫師","龍族","死靈法師","吸血鬼","主教","復仇者"]
function CardLibrary() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [craft,setCraft] = useState("all");
    const [rare,setRare] = useState("all");
    const [cost,setCost] = useState("all");
    const [cards,setCards] = useState([]);
    const [card,setCard] = useState({Effect:[],Card_type:[]});
    const [cardID,setCardID] = useState("");
    const [maxPage, setMaxPage] = useState(10);
    const handleOpen = (ind) => 
    {
        setCardID(ind)
        setOpen(true);
        //alert(ind)
        
        //alert(ind);
    }
    const handleClose = () => setOpen(false);
    const handleChange = (event, value) => {
        setPage(value);
        //alert(value)
    };
    const getInitCard = async (p) => {
        // example
        const page = p
      
        const {
          data: { message, contents },
        } = await instance.get("/initCard", {
          params: { page: page ,cost:cost,craft:craft,rare:rare},
        });
        setMaxPage(message)
        //console.log(contents);
        setCards(contents)
      };
      const getCardbyID = async () => {
        // example
        const id = cardID;
      
        const {
          data: { message, contents },
        } = await instance.get("/getCard", {
          params: { _id: id },
        });
        console.log(contents);
        //alert(Object.keys(contents))
        setCard(contents)
      };
    useEffect(() => {
        // Just run the first time
        getInitCard(page)
        
        //alert('render')
      }, [])
    useEffect(() => {
        // Just run the first time
        getInitCard(page)
        //alert(cards)
        //alert('render')
      }, [page,cost,rare,craft])
      useEffect(() => {
        // Just run the first time
        if(cardID!="")
            getCardbyID()
        //alert(cards)
        //alert('render')
      }, [cardID])
	return (
    	<>
            <Box sx={{ flexGrow: 1 ,height :'100%',width:'100%',display: { xs: 'none', md: 'flex' }, alignItems: "end",justifyContent: 'center'}}>
                <Grid sx={{ width: '72%', height :'100%',alignItems: "center",alignContent: "start",justifyContent: 'start',display:'flex'}}  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                  <Grid item xs={4} sm={8} md={12} backgroundColor = "#F5F5F5" height ={0.05} width = '100%'alignItems="center" justifyContent = "center" m={0} borderRadius = "3%">
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent = "start" height = "100%">
                        <FormControl fullWidth>
                            <InputLabel id="cost-label">費用</InputLabel>
                            <Select
                                labelId="cost-label"
                                id="cost-select"
                                width = "100%"
                                value={cost}
                                label="cost"
                                onChange={(e)=>setCost(e.target.value)}
                            >
                                {costs.map((c) => (c == "10+" ? <MenuItem value={10}>{c}</MenuItem> :<MenuItem value={c}>{c}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="rare-label">稀有度</InputLabel>
                            <Select
                                labelId="rare-label"
                                id="rare-select"
                                value={rare}
                                label="rare"
                                onChange={(e)=>setRare(e.target.value)}
                            >
                                {rares.map((c) => (<MenuItem value={c}>{c}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="craft-label">職業</InputLabel>
                            <Select
                                labelId="craft-labell"
                                id="craft-select"
                                value={craft}
                                label="craft"
                                onChange={(e)=>setCraft(e.target.value)}
                            >
                                {crafts.map((c) => (<MenuItem value={c}>{c}</MenuItem>))}
                            </Select>
                        </FormControl>
                        
                    </Stack>
                  </Grid>
                    {cards.map
                    (
                        (c) => 
                        (
                            <Grid item xs={2} sm={4} md={2} key={c._id}>
                                <Item>
                                    
                                        <Box
                                        onClick = {() => handleOpen(c._id)}
                                        component="img"
                                        sx={{
                                        height: '100%',
                                        width: '100%',
                                        cursor: 'pointer',
                                        }}
                                        src= {c.Image[0]}
                                        />
                                    
                                    
                                </Item>
                            </Grid>
                        )
                    )}
                    <Grid item xs={4} sm={8} md={12} height ={0.06} display="flex" alignContent = "start" justifyContent = "center" >
                      <Stack spacing={2} display="flex" alignItems="center" alignContent = "center" height="100%">

                          <Pagination count={maxPage} page ={page} onChange = {handleChange}/>
                      </Stack>
                    </Grid>
                </Grid>
            </Box>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction="row" spacing={2}>
                        <Box
                            component="img"
                            sx={{
                            height: '50%',
                            width: '50%',
                            cursor: 'pointer',
                            }}
                            src= {card.Image}
                        />
                        <Item>
                            <Stack  spacing={2}>
                                <h3>{card.Card_name}</h3>
                                <p>{"職業: "+ card.Craft}</p>
                                {"類型: "+card.Card_type.map((c)=>{
                                    return(c)
                                })}
                                <p>{"卡包: "+ card.Card_pack}</p>
                            </Stack>
                        </Item>
                    </Stack>
                    
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {card.Effect[0]}
                    </Typography>
                    {card.Effect.length == 2 ?
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {"進化後: "+card.Effect[1]}
                    </Typography>
                    :null}
                </Box>
            </Modal>
        </>

  	);
}

  
export default CardLibrary;
