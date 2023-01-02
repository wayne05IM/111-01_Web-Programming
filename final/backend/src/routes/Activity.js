import Activity from '../models/Activity'

// Init Activity
exports.InitActivity = async(req, res) => {
    try{
        const target = await Activity.find({});
        console.log(target)
        //console.log(target)
        res.status(200).send({ message: 'success', contents: target });
    }catch(err){
        res.status(403).send({ message: 'error', contents: []})
    }
}