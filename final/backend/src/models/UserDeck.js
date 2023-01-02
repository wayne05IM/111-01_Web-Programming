import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema

const UserDeckSchema = Schema({
    Deck_ID: {type: Number, require: true},
    User_ID: {type: String, require: true},
    User_Name: {type: String, require: true},
    craft: {type: String, require: true},
    mode: {type: String, require: true},
    info: {type: String},
    name: {type: String, require: true},
}, {
    collection: 'Deck',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Model = mongoose.model('Deck', UserDeckSchema)

export default Model