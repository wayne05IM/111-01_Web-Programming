import CardRoute from './Card_content.js'
import ActivityRoute from './Activity'
import ArticleRoute from './Article.js'
import DeckRoute from './Deck.js'
import UserRoute from './User.js'
import HomeRoute from './Home.js'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  // about cards
  app.get('/api/initCard', wrap(CardRoute.InitCard))
  app.get('/api/findCard', wrap(CardRoute.FindCard))
  app.get('/api/getCard', wrap(CardRoute.GetCard))
  app.get('/api/getCardFromSixSet', wrap(CardRoute.GetCardFromSixSet))
  // about activities
  app.get('/api/initActivity', wrap(ActivityRoute.InitActivity))
  // about articles
  app.get('/api/initArticle', wrap(ArticleRoute.InitArticle))
  app.get('/api/getArticle', wrap(ArticleRoute.GetArticle))
  // about deck
  app.get('/api/initDeck', wrap(DeckRoute.InitDeck))
  app.get('/api/deckDetail', wrap(DeckRoute.DeckDetail))
  // about user
    // insert user
  app.post('/api/insertUser', wrap(UserRoute.insertUser))
    // get user
  app.get('/api/getUser', wrap(UserRoute.GetUser))
  app.get('/api/getUserByID', wrap(UserRoute.GetUserByID))
  app.get('/api/updateUserByID', wrap(UserRoute.UpdateUserByID))
    // insert articles
  app.post('/api/insertArticle', wrap(UserRoute.insertArticle))
    // insert deck
  app.post('/api/insertDeck', wrap(UserRoute.insertDeck))
    // get user articles
  app.get('/api/getUserArticles', wrap(UserRoute.GetUserArticles))
    // get user card deck
  app.get('/api/getUserDecks', wrap(UserRoute.GetUserDecks))
  // about home
  app.get('/api/initHome', wrap(HomeRoute.initHome))
  
}

export default main