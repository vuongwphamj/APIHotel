import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var model3dSchema =  new Schema({
    name: {type: String, required: true},
    description: {type: String},
    createDate: {type: Date, default:Date.now()},
    updateDate: {type: Date, default:Date.now()},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
}, {collection:'model3d'});

export default mongoose.model('Model3d', model3dSchema);
