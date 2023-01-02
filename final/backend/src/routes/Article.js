import Article from '../models/Article.js'

// Init card
exports.InitArticle = async(req, res) => {
    const page = req.query.page
    try{
        const target = await Article.find({}).sort({"created_at": -1}).skip(5 * (page-1)).limit(5).select('_id Artical_name Artical_ID Content image');
        let p = await Article.find({}).count()
        p = Math.ceil(p/5)
        console.log(target)
        //console.log(target)
        res.status(200).send({ message: p, contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}

// Get Article content by _id
exports.GetArticle = async(req, res) => {
    const id = req.query._id
    try{
        const target = await Article.findOne({Artical_ID: id});
        console.log(target)
        res.status(200).send({ message: 'success', contents: target });
    }catch(err){
        console.log(err)
        res.status(403).send({ message: 'error', contents: []})
    }
}