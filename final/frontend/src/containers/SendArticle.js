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
import { createTheme ,ThemeProvider} from '@mui/material/styles';
import instance from "../api";
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
function SendArticle() {

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();
    const insertArticle = async () => {
        //example


      
        await instance.post("/insertArticle", {
          Artical_name: title,
          Author_ID: localStorage.getItem("uid"),
          Content: content,
        });
      };
      const handleSend = async () =>{
        if(title.length>20)
        {
          alert("標題太長")
        }
        else if(title.length==0 || content.length==0)
        {
          alert("標題或內文不可為空")
        }
        await insertArticle()
        alert("分享成功")
        navigate('/articles')
    
      }
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
                height: '100vh',
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
                        <Grid sx={{ width: '70%', height :'77%',alignItems: "start",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 11 }}>
                            <Item>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <Box>文章標題</Box>
                                    <TextareaAutosize value = {title} minRows={1} placeholder="上限20字" onChange={(e) => {setTitle(e.currentTarget.value);}}/>
                                    <Box>文章內容</Box>
                                    <TextareaAutosize value = {content} minRows={50} onChange={(e) => {setContent(e.currentTarget.value);}}/>
                                    <Box></Box>
                                </Stack> 
                                <Grid sx={{ width: '100%', height :'10vh',alignItems: "center",justifyContent: 'end',display:'flex'}} columns={{ xs: 12, sm: 12, md: 12 }}>
                                    <Grid item xs={3} sm={3} md={10} alignItems="center" justifyContent = "start" height = {1}>
                                        
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2} alignItems="center" display = "flex"justifyContent = "end" height = {1}>
                                        <Button onClick={handleSend}  variant="outlined" color="primary" endIcon={<SendIcon />}>送出</Button>
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

export default SendArticle;