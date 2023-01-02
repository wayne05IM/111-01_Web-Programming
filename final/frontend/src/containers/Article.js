import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button, Divider } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { createTheme ,ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import axios from "axios";
import instance from "../api";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    width:"100%",
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));

let theme = createTheme({

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
theme = responsiveFontSizes(theme);

function Article() {

    const {id} = useParams()
    const [article,setArticle] = useState("");
    const navigate = useNavigate();
    const getArticlebyID = async () => {
        // example
       
      
  

        const {
          data: { message, contents },
        } = await instance.get("/getArticle", {
          params: { _id: id },
        });
        //alert(contents)
        if(!contents || message =="error")
        {
            //alert("article not found")
            navigate('/notfound')

        }
        setArticle(contents)
        console.log(contents);
      };
    useEffect(() => {
        // Just run the first time
        getArticlebyID()
        
        //alert(id)
      }, [])
	return (
    	<>  
        <ThemeProvider theme={theme}>
            <HeadNav color = "secondary"></HeadNav>
            <Box
            sx = {{
                backgroundColor: '#F5F5F5',
                display: "flex",
                justifyContent: 'center',
                alignContent: "center",
                width: '100%',
                height: '2vh',
     
            }}
            ></Box>
            <Box
            sx = {{
                backgroundColor: '#F5F5F5',
                display: "flex",
                justifyContent: 'center',
                alignContent: "center",
                width: '100%',
                height: '100vh',
     
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
                        <Grid sx={{ width: '70%', height :'77%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 11 }}>
                            <Item>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <Box></Box>
                                    <Typography gutterBottom textAlign="center" variant="h3" color="black" component="div">
                                        {article.Artical_name}
                                    </Typography>
                                    <Divider></Divider>
                                    <Typography gutterBottom  variant="body1" color="black" component="div">
                                        {article.Content}
                                    </Typography>

                                    <Box></Box>
                                </Stack> 
                                <Grid sx={{ width: '100%', height :'10vh',alignItems: "center",justifyContent: 'end',display:'flex'}} columns={{ xs: 12, sm: 12, md: 12 }}>
                                    <Grid item xs={3} sm={3} md={10} alignItems="center" justifyContent = "start" height = {1}>
                                        
                                    </Grid>
                                </Grid>
                            </Item>
                            
                        </Grid>
        
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
        </>

  	);
}

export default Article;