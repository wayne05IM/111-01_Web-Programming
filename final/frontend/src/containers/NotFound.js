import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Button, Divider } from "@mui/material";
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));


function NotFound() {
    const [info, setInfo] = useState("測試");
    const navigate = useNavigate();
    useEffect(() => {
        // Just run the first time
      }, [])
	return (
    	<>

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
                    margin: 0,
                    marginBottom: 10,
                    backgroundColor: 'secondary',
                    justifyContent: 'center',
                }}
                >
                    <Grid sx={{ width: '100%', height :'100%',alignContent: "center",alignItems: "center",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 12, sm: 12, md: 12 }}>
                        <Grid sx={{ width: '50%', height :'77%',alignItems: "center",justifyContent: 'center',display:'flex'}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 12, sm: 12, md: 11 }}>
                            <Grid item xs={3} sm={3} md={8} alignItems="center" justifyContent = "center" height = {1}>
                                <Stack spacing={2}>
                                    <Box></Box>
                                    <Box></Box>
                                    <Box></Box>
                                    <Box></Box>
                                    <Item>
                                        <Stack spacing={2}>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Typography variant="h1" textAlign="center" >404</Typography>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Typography variant="h3" textAlign="center">NOT FOUND</Typography>
                                            
                                            
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Box></Box>
                                            <Button onClick = {() => navigate('/')} size="large" color="error" variant="outlined">回到首頁</Button>
                                        </Stack>
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

export default NotFound;