import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: 'String', required: true },
  avatarImage: { type: String, },
  email: { type: String, unique: true, lowercase: true, required: true},
  password: { type: 'String', required: true },
  active: { type: 'Boolean', default: false},
  createdDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
