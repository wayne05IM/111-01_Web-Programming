import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const title = " 帥氣血鬼"
const content = "牌組簡介牌組簡介牌組簡介牌組簡介牌組簡介"
const inf = "xxx 分享 xx/xx/xx"

export default function DeckCard({name ,info ,user ,time ,craft}) {
  return (
    <Card sx={{ maxWidth: 345 ,height:"15vh" ,cursor:"pointer"}}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="div">
          {name +" 職業: " +craft}
        </Typography>
        <Divider/>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
        <Divider/>
        <Typography variant="body3" color="text.secondary">
          {user+" 分享於 "+time}
        </Typography>
      </CardContent>
    </Card>
  );
}