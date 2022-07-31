const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const subscriptionSchema = mongoose.Schema({
        client_id:{
            type:String,
            trim:true,
            unique:true,
            required : [true,'client_id required']
        },
        image_id:{
            type:String,
            trim:true
        },
        face_id:{
            type:String,
            trim:true
        },
        organization:{
            type:String,
            trim:true
        },
        email :{
            type: String,
            trim:true,
            lowercase:true,
            required : true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Invalid email.')
                }
            }
        },
        mobile_number : {
            type: Number,
            default:0,
            unique:true
        },
        active:{
            type: Number,
            default:1
        }
    },
    {
        timestamps:true
    })
//Custom method on client variable instance
subscriptionSchema.methods.genrateAuthToken = async function(){
    const client = this
    const token = jwt.sign(
        {_id: client.client_id.toString(),
            email:client.email
        }, 'facekey3317791336599909')
    client.tokens = client.tokens.concat({ token })
    await client.save()
    return token
}
subscriptionSchema.statics.findByFaceIdFromArray =  async (face_ids) =>{

    const user = await Client.findOne({"face_id": face_ids , "active":1})
    let data = {
        user:user
    }
    if(!user){
        data = {
            user : null
        }
    }
    return data
}
subscriptionSchema.statics.updateClientFaceId =  async (client_id,face_ids,image_id) =>{

    const user = await Client.update({"client_id":client_id},{"face_id": face_ids , "image_id":image_id})
    let data = {
        user:user
    }
    if(!user){
        data = {
            user : null
        }
    }
    return data
}
subscriptionSchema.statics.deleteClient =  async (client_id) =>{
    var client = await Client.findOne({
        "client_id":client_id
    })
    var msg = "";
    let data = {};
    if(client!=null  && client.active==0){
        msg = "Client Not Found"
        data = {
            message:msg
        }

        return data
    }

    const user = await Client.updateOne({
                                            "client_id":client_id
                                        },
                                        {
                                            "active":0
                                        })

    if(user!=null){
        msg = user.nModified==1?"Client deleted successfully":"User Not found"
    }
    data = {
        message:msg
    }

    return data
}

subscriptionSchema.statics.findClientByID =  async (client_id) =>{
    var result = await Client.findOne({"client_id":client_id})

    let data = {
        result:result
    }
    if(!result){
        data = {
            result : null
        }
    }
    return data
}
subscriptionSchema.statics.findClientByEmailID =  async (email) =>{
    var result = await Client.findOne({"email":email})

    let data = {
        result:result
    }
    if(!result){
        data = {
            result : null
        }
    }
    return data
}

export const Client = mongoose.model('Subscriptions',subscriptionSchema)