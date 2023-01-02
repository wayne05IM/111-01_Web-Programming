import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';
import Foot from "../components/Foot";
import CardLibrary from "../components/CardLibrary";
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


function Cards() {

    useEffect(() => {
        // Just run the first time
        //alert('render')
      }, [])
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
                height: '240vh',
                margin: 0,
            }}
            >
                <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    height: "100%",
                    margin: 0.4,
                    backgroundColor: 'white',
                    alignItems: "center",
                    justifyContent: 'center',
                }}
                >
                    <CardLibrary/>
                </Box>
            </Box>
            <Foot/>
        </>

  	);
}

export default Cards;