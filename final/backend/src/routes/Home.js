import Article from "../models/Article.js";
import UserDeck from "../models/UserDeck.js";
import Activity from "../models/Activity.js";

// Get init Home
exports.initHome = async(req, res) => {
    try{
        const article = await Article.find({}).sort({"created_at": -1}).limit(8);
        console.log("article:", article)
        const deck = await UserDeck.find({}).sort({"created_at": -1}).limit(5);
        console.log("deck:",deck)
        const activity = await Activity.find({}).sort({"created_at": 1});
        console.log("activity:",activity)
        const home = {article: article, deck: deck, activity: activity}
        console.log(home)
        res.status(200).send({ message: 'success', contents: home });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}