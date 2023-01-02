import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';

const imglink = "https://cdn.jsdelivr.net/gh/sky456757/imgHost@latest/img/random/05.png"
const title = "70%勝率GM，指定棄牌龍"
const content = "文章簡介文章簡介文章簡介文章簡介文章簡介..."
export default function ArticleCard({name,info,image,id}) {
  const navigate = useNavigate();
  return (
    <Card onClick={()=>(navigate('/articles/'+id))} sx={{height:"100%" ,width:"100%",cursor:"pointer",display:'flex',alignItems: "start",justifyContent: 'center' ,margin: 0 ,padding: 0}}>
      <Grid sx={{ width: '100%', height :'100%',alignItems: "center",justifyContent: 'start',display:'flex',margin: 0 ,padding: 0}}  columns={{ xs: 10, sm: 10, md: 12 }}>
            <Grid item xs={3} sm={3} md={2} alignItems="center" justifyContent = "start" height = {1}>
              <CardMedia
                component="img"
                height="100%"
                width = "100%"
                image= {image}
                alt="cover img"
              />
            </Grid>
            <Grid item xs={3} sm={3} md={10} alignContent="start" alignItems="start" justifyContent = "start" height = {1} margin = {0} padding = {0}>
              <Grid sx={{ width: '100%', height :'100%',alignItems: "start",justifyContent: 'start',display:'flex',margin: 0 ,padding: 0}} container spacing={{ xs: 1, md: 1 }} columns={{ xs: 10, sm: 10, md: 12 }}>
                <Grid item xs={3} sm={3} md={12} alignContent="flex-start" alignItems="flex-start" justifyContent = "start" height = {0.1} margin = {0} padding = {0} >

                </Grid>
                <Grid item xs={3} sm={3} md={12} alignContent="flex-start" alignItems="flex-start" justifyContent = "start" height = {0.4} margin = {0} padding = {0} >
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={12} alignContent="flex-start" alignItems="flex-start" justifyContent = "start" height = {0.6} margin = {0} padding = {0} >
                  <Typography gutterBottom variant="body2" component="div">
                    {info}
                  </Typography>
                </Grid>
                
              </Grid>
            </Grid>

      </Grid>
    </Card>
  );
}