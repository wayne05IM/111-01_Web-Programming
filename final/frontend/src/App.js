import logo from './logo.svg';
//import './App.css';
import Home from './containers/Home';
import Articles from './containers/Articles';
import Battles from './containers/Battles';
import Decks from './containers/Decks';
import Cards from './containers/Cards';
import { Routes ,Route } from 'react-router-dom';
import { createTheme ,ThemeProvider, responsiveFontSizes} from '@mui/material/styles';
import User from './containers/User';
import SendArticle from './containers/SendArticle';
import SendDeck from './containers/SendDeck';
import Article from './containers/Article';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
let theme = createTheme({

    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#fff',
        light: "#8ab4c0",
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#F5F5F5',
      },
    },
  });
theme = responsiveFontSizes(theme);
function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route  path='/' element={<Home/>} /> 
        <Route  path='/cards' element={<Cards/>} />
        <Route  path='/cards/:id' element={<Cards/>} />  
        <Route  path='/decks' element={<Decks/>} /> 
        <Route  path='/decks/send' element={<SendDeck/>} /> 
        <Route  path='/articles' element={<Articles/>} /> 
        <Route  path='/articles/send' element={<SendArticle/>} /> 
        <Route  path='/articles/:id' element={<Article/>} /> 
        <Route  path='/battles' element={<Battles/>} /> 
        <Route  path='/user/:id' element={<User/>} /> 
        <Route  path='/login' element={<Login/>} /> 
        <Route  path='/*' element={<NotFound/>} /> 
			</Routes>
		</ThemeProvider>

  	);
}

export default App;
