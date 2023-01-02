import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ContentSchema = Schema({
    _id: { type: Number, required: false  },
    Card_name: { type: String, required: true },
    Effect: [{ type: String}],
    Rare: {type: String, require: true},
    Image: [{type: String}],
    Craft: {type: String, require: true}, 
    Related_cards: [{type: String}], 
    Card_pack: {type: String, require: true},
    Card_type: [{type: String}], 
    Cost: {type: Number, require: true}
}, {
    collection: 'Card_content',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Model = mongoose.model('Card_content', ContentSchema)

export default Model