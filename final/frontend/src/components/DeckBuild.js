import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useNavigate ,useLocation,useParams} from "react-router-dom";
import Pagination from '@mui/material/Pagination'
import { Stack } from '@mui/system';
import instance from "../api";
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}
const crafts = ["精靈","皇家護衛","巫師","龍族","死靈法師","吸血鬼","主教","復仇者"]
export default function DeckBuild() {
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([{cardName:"0" , amount:1}, {cardName:"0" , amount:1}, {cardName:"0" , amount:1}, {cardName:"0" , amount:1}]);
  const [right, setRight] = React.useState([]);
  const [amount,setAmount] = React.useState(0);
  const [craft,setCraft] = React.useState("精靈");
  const [info,setInfo] = React.useState("");
  const [name,setName] = React.useState("");
  const [user,setUser] = React.useState("");
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [page, setPage] = React.useState(1);
  const [maxPage, setMaxPage] = React.useState(10);
  const handleChange = (event, value) => {
    setPage(value);
    //alert(value)
};
  const navigate = useNavigate();
  
  const insertDeck = async () => {
    //example

    const User_ID = localStorage.getItem("uid");

    const mode = "指定模式";

    //const card = right;
  
    await instance.post("/insertDeck", {
      User_ID: User_ID,
      User_Name: user,
      craft: craft,
      mode: mode,
      info: info,
      name: name,
      card: right,
    }).catch(function(error) {
      console.log(error);
    });;
  };
  const handleSend = async () =>{
    if(name.length>6 || info.length>20)
    {
      alert("卡組名或簡介太長")
    }
    else if(name.length==0 || info.length==0)
    {
      alert("卡組名或不可為空")
    }
    await insertDeck()
    alert("分享成功")
    navigate('/decks')

  }
  const getCardFromSixSet = async () => {
    // example
  
    const {
      data: { message, contents },
    } = await instance.get("/getCardFromSixSet", {
      params: { craft: craft ,page:page},
    });
    for(var i = 0;i< contents.length;i++)
    {
      contents[i]["amount"] = 1
      if(contents[i].Cost == 10)
        contents[i].Cost = "10+"
    }
      
    console.log(contents);
    //alert(message)
    setMaxPage(message)
    setLeft(contents)
    
  };
  React.useEffect(() => {
    // Just run the first time
    getCardFromSixSet()
    //alert('render')
  }, [page])
  React.useEffect(() => {
    // Just run the first time
    getCardFromSixSet()
    setRight([])
    //alert('render')
  }, [craft])
  const getUserbyUserID = async () => {
    // example
  
    const {
      data: { message, contents },
    } = await instance.get("/getUserByID", {
      params: { User_ID: localStorage.getItem("uid") },
    });
    


    setUser(contents.User_name)
    console.log(contents);
    return contents
  };
  React.useEffect(() => {
    // Just run the first time
    getUserbyUserID()
    //alert(craft)
  }, [])
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    let templeft = leftChecked
    let filterLeft = templeft.filter(l=>
    {
      let ch = 0
      for(var i = 0 ; i< right.length;i++)
      {
        //alert(1)
        //alert(Object.keys(right[i]))
        if(l._id == right[i]._id)
        {
          //alert(1)
          ch=1;
          break
        }
      }
      //alert(ch)
      return(ch == 0)
    })
    setRight(right.concat(filterLeft));
    setLeft(not(left, leftChecked));
    let a = 0;
    right.concat(filterLeft).forEach((e)=>{a+=e.amount})
    setAmount(a)
    //alert(a)
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    let a = 0;
    not(right, rightChecked).forEach((e)=>{a+=e.amount})
    setAmount(a)
    //alert(a)
    setChecked(not(checked, rightChecked));
  };
  const handleAmount = (items,value,fun,dir) =>
  {
    let newValue = value
    //alert(1)
    if(dir === 1 && newValue.amount < 3)
        if(amount < 40)
        {
          newValue.amount = newValue.amount+dir
          if(items == right)
          {
            setAmount(amount+1)
          }
        }
         
    if(dir === -1 && newValue.amount > 1)
    {
      newValue.amount = newValue.amount+dir
      if(items == right)
        {
            setAmount(amount-1)
        }
    }
        
    //alert(newValue.amount)
    items[items.indexOf(value)] = newValue
    //alert(items[0])
    fun(items)
    setChecked(not(checked, items));


  }
  const customList = (title, items,edit) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={
              numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: "26vw",
          height: "59vh",
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <Stack direction="row">
            <ListItem
              key={value}
              role="listitem"
              amount= {1}
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`費用${value.Cost} ${value.Card_name} x ${value.amount}`} />
            </ListItem>
            <Button size="small" onClick={() => handleAmount(items,value,edit,1)}>up</Button>
            <Button size="small" onClick={() => handleAmount(items,value,edit,-1)}>down</Button>
            </Stack>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Stack spacing={1}>
      {amount == 40 ? <Box component="h1" textAlign="center" color="green">{amount+"/40"}</Box> : <Box component="h1" textAlign="center">{amount+"/40"}</Box>}
      <FormControl fullWidth>
            <InputLabel id="cost-label">Craft</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={craft}
            label="craft"
            onChange={(e)=>setCraft(e.target.value)}
          	>	
            	{crafts.map((c) => (<MenuItem value={c}>{c}</MenuItem>))}
          	</Select>
      </FormControl>
      <Box>卡組名:(上限6個字)</Box>
      <TextareaAutosize value = {name} minRows={1} onChange={(e) => {setName(e.currentTarget.value);}}/>
      <Box>卡組簡介:(上限20個字)</Box>
      <TextareaAutosize value = {info} minRows={2} onChange={(e) => {setInfo(e.currentTarget.value);}}/>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        
        <Grid item>{customList('所有卡片', left,setLeft)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('已選卡片', right,setRight)}</Grid>
      </Grid>
      
      <Grid sx={{ width: '100%', height :'3vh',alignItems: "center",justifyContent: 'center',display:'flex'}} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={3} sm={3} md={6} alignItems="center" justifyContent = "center" height = {1}>
            
          </Grid>
          <Grid item xs={3} sm={3} md={6} alignItems="center" display = "flex"justifyContent = "start" height = {1}>
            <Pagination count={maxPage} page ={page} onChange = {handleChange}/> 
          </Grid>
      </Grid>
      <Grid sx={{ width: '100%', height :'7vh',alignItems: "center",justifyContent: 'end',display:'flex'}} columns={{ xs: 12, sm: 12, md: 12 }}>
          <Grid item xs={3} sm={3} md={10} alignItems="center" justifyContent = "center" height = {0.5}>
           
          </Grid>
          <Grid item xs={3} sm={3} md={2} alignItems="center" display = "flex"justifyContent = "end" height = {0.5}>
              {amount == 40 ? 
               <Button onClick={handleSend}  variant="outlined" color="primary" endIcon={<SendIcon />}>送出</Button>
               : 
               <Button disabled variant="outlined" color="primary" endIcon={<SendIcon />}>送出</Button>} 
             
          </Grid>
      </Grid>
    </Stack>
  );
}
