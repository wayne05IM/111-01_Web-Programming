import Deck from '../models/Deck.js'
import UserDeck from '../models/UserDeck.js'

exports.InitDeck = async(req, res) => {
    const page = req.query.page
    try{
        const target = await UserDeck.find({}).sort({"created_at": -1}).skip(15 * (page-1)).limit(15).select('Deck_ID User_ID User_Name info name craft created_at');
        let p = await UserDeck.find({}).count()
        p = Math.ceil(p/15)
        console.log(target)
        res.status(200).send({ message: p, contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}
exports.DeckDetail = async(req, res) => {
    let id = req.query.Deck_ID
    try{
        const target = await UserDeck.find({Deck_ID: id});
        console.log("target:", target)
        const target2 = await Deck.find({Deck_ID: id})
        console.log("target 2:",target2)
        const deck = {deckinfo: target, deckCard: target2}
        console.log(deck)
        res.status(200).send({ message: 'success', contents: deck });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}