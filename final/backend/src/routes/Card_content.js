import Card_content from '../models/Card_content.js'

// Get only _id, cardname and image for all cards
exports.InitCard = async(req, res) => {
    const page = req.query.page
    
    let cost = req.query.cost
    let craft = req.query.craft
    let rare = req.query.rare
    if(cost == "all")
        cost = [0,1,2,3,4,5,6,7,8,9,10]
    else
        cost = [cost]
    if(craft == "all")
        craft = ["中立","精靈","皇家護衛","巫師","龍族","死靈法師","吸血鬼","主教","復仇者"]
    else
        craft = [craft]
    if(rare == "all")
        rare = ["青銅","白銀","黃金","傳說"]
    else
        rare = [rare]
    try{
        let count = await Card_content.find({})
        .where('Cost').in(cost)
        .where('Craft').in(craft)
        .where('Rare').in(rare).count()
        count = Math.ceil(count/48)
        const target = await Card_content.find({})
        .where('Cost').in(cost)
        .where('Craft').in(craft)
        .where('Rare').in(rare)
        .skip(48 * (page-1)).limit(48).select('Card_name Image');
        console.log(target)
        res.status(200).send({ message: count, contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
        console.log("err")
    }
}

// Get only match same query _id, cardname and image
exports.FindCard = async(req, res) => {
    const cost = req.query.cost
    const craft = req.query.craft
    const rare = req.query.rare
    try{
        const target = await Card_content.find({Cost: cost, Craft: craft, Rare:rare}).select('Card_name Image');
        console.log(target)
        res.status(200).send({ message: 'success', contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}

// Get card content by _id
exports.GetCard = async(req, res) => {
    const id = req.query._id
    try{
        const target = await Card_content.findOne({_id: id});
        console.log(target)
        res.status(200).send({ message: 'success', contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}

// Get card in six set that satisfies craft
exports.GetCardFromSixSet = async(req, res) => {
    const craft = req.query.craft
    const page = req.query.page
    let crafts = ["中立"]
    crafts.push(craft)
    const pack = ["基本卡", "十禍鬥爭", "天象樂土", "極天龍鳴", "示天龍劍", "超越災禍"]
    try{
        const target = await Card_content.find({ $or: [{Card_pack: {$in: pack}, Craft: {$in: crafts}}] }).sort({"Cost": 1}).skip(20 * (page-1)).limit(20).select('Card_name Cost');
        let p = await Card_content.find({ $or: [{Card_pack: {$in: pack}, Craft: {$in: crafts}}] }).count()
        //console.log(p)
        p = Math.ceil(p/20)
        //console.log(target)
        res.status(200).send({ message: p, contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}