const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
    },

    password : {
        type: String,
        required : true
    },

    isTeacher : {
        type : Boolean,
        required : true,
        default : false
    },

    sid : {
      type : Number,
      required: true,
      default:0
    },

    Class : {
      type : Number,
      default : 0 
    },
},
  {
    timestamps : true
  }
)

userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified){
      next();
    }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
