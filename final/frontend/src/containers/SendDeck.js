import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button, Divider } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import DeckBuild from "../components/DeckBuild";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width:"100%",
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));

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
const imglink = "https://store.ymgal.games/archive/main/d5/d5fc5153d78c42d28f29c8bd2132b21d.webp"
function SendDeck() {
    //const [amount,setAmount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        // Just run the first time
        if(!localStorage.getItem("uid"))
        {
            
            navigate('/notfound')
        }
      }, [])
	return (
    	<>  
        <ThemeProvider theme={theme}>
            <Box
            sx = {{
                backgroundColor: '#F5F5F5',
                display: "flex",
                justifyContent: 'center',
                alignContent: "center",
                width: '100%',
                height: '116vh',
                margin: 0,

            }}
            >
                <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "100%",

                    marginBottom: 10,
                    backgroundColor: 'secondary',
                    justifyContent: 'center',
                }}
                >
                    <Grid sx={{ width: '100%', height :'100%',alignContent: "start",alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid sx={{ width: '70%', height :'77%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 11 }}>
                            <Item>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <DeckBuild />
                                    <Box></Box>
                                </Stack> 
                            
                            </Item>
                            
                        </Grid>
        
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
        </>

  	);
}

export default SendDeck;