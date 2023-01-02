import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button, Divider } from "@mui/material";
import Stack from '@mui/material/Stack';
import ArticleCard from "../components/ArticleCard";
import UserTab from "../components/UserTab";
import Typography from '@mui/material/Typography';
import instance from "../api";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));


const imglink = "https://store.ymgal.games/archive/main/d5/d5fc5153d78c42d28f29c8bd2132b21d.webp"
function User() {
    const [info, setInfo] = useState("測試");
    const [rank, setRank] = useState("無");
    const [name, setName] = useState("無");
    const [uid, setUID] = useState("001");
    const [time, setTime] = useState("xx/xx/xx");
    const [articles, setArticles] = useState([]);
    const [decks, setDecks] = useState([]);
    const [trigger, setTrigger] = useState(false);
    let { id } = useParams();
    const navigate = useNavigate();
    const getUserbyUserID = async (id) => {
        // example
      
        const {
          data: { message, contents },
        } = await instance.get("/getUserByID", {
          params: { User_ID: id },
        });
        if(!contents)
        {
            navigate('/notfound')
            
    
        }
        setInfo(contents.User_info)
        setRank(contents.User_rank)
        setName(contents.User_name)
        setTime(contents.created_at)
        setUID(id)
        console.log(contents);
        return contents
      };
      const getUserArticles = async (id) => {
        // example
    
      
        const {
          data: { message, contents },
        } = await instance.get("/getUserArticles", {
          params: { User_ID: id },
        });
        setArticles(contents)
        console.log(contents);
      };
      
      // get user deck
      const getUserDecks = async (id) => {
        // example
        //const id = 1;
      
        const {
          data: { message, contents },
        } = await instance.get("/getUserDecks", {
          params: { User_ID: id },
        });
        setDecks(contents)
        console.log(contents);
      };
      
    useEffect( () => {
        // Just run the first time
        

        getUserbyUserID(id)
        getUserArticles(id)
        getUserDecks(id)
        
      }, [id])
      useEffect( () => {
        // Just run the first time
        setTrigger(true)
        


        
      }, [info])
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
                height: '93vh',
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
                    backgroundColor: 'secondary',
                    justifyContent: 'center',
                }}
                >
                    <Grid sx={{ width: '100%', height :'100%',alignContent: "start",alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid sx={{ width: '70%', height :'77%',alignItems: "center",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 11 }}>
                            <Grid item xs={3} sm={3} md={3} alignItems="center" justifyContent = "center" height = {1}>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <Item>
                                        <Stack spacing={1}>
                                            <Typography variant="h5" >{name}</Typography>
                                            <Typography variant="body1" >{"Rank: "+rank}</Typography>
                                            <Typography variant="body2" >{info}</Typography>
                                        </Stack>
                                        
                                    </Item>
                                    <Item>
                                        <Stack spacing={1}>
                                            <Typography variant="h6" >{"撰寫了 "+articles.length+" 篇文章"}</Typography>
                                            <Typography variant="h6" >{"分享了 " +decks.length+ " 個牌組"}</Typography>
                                        </Stack>
                                    </Item>
                                    <Item>
                                        <Stack spacing={1}>
                                            <Typography variant="body1" >{"UID: "+uid}</Typography>
                                            <Typography variant="body2" textAlign="end">{time.slice(0, 10)+" 加入"}</Typography>
                                        </Stack>
                                    </Item>
                                </Stack>
                            </Grid>
                            <Grid item xs={3} sm={3} md={8} alignItems="center" justifyContent = "center" height = {1}>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <Item>
                                        { trigger?
                                          <UserTab info={info} setInfo={setInfo} rank={rank} setRank={setRank} articles={articles} decks={decks} user={name} id={id}/>
                                        : null}
                                    </Item>
                                </Stack>
                            </Grid>
                        </Grid>
        
                    </Grid>
                </Box>
            </Box>
        </>

  	);
}

export default User;