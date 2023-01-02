import mongoose, { model } from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = Schema({
    User_ID: {type: String, require: true},
    User_name: {type: String, require: true},
    User_password: {type: String, require: true},
    User_rank: {type: String, require: true},
    User_info: {type: String}
}, {
    collection: 'User',
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

const Model = mongoose.model('User', UserSchema)

export default Model