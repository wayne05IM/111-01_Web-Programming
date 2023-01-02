import HeadNav from "../components/HeadNav";
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));





function Foot() {

	return (
    	<footer>
            <Box
            sx = {{
                backgroundColor: '#F5F5F5',
                display: "flex",
                justifyContent: 'center',
                alignItems: "center",
                width: '100%',
                height: '15vh',
                marginTop: 0,
            }}
            >
                <Box
                sx = {{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                }}
                >
                    <p> ©SV-ToolBox. All Rights Reserved! · version: v0.87</p>
                </Box>
                
            </Box>
        </footer>

  	);
}

export default Foot;