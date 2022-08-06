const mongoose = require('mongoose')

type intervalType="DAILY" | "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "QUARTERLY" | "HALFYEARLY" | "YEARLY";


const planSchema = mongoose.Schema({
        planId:{
            type:String,
            trim:true,
            unique:true,
            required : [true,'planId required']
        },
        interval:{
            type: String,
            required : true,
        },
        isTrialAvailable:{
            type:Boolean,
            required : true,
        },
        productId:{
            type:String,
            trim:true
        },
        isActive:{
            type:Boolean,
            required : true,
        },
        cancelAt : {
            type: Number,
        },
        createdBy:{
            type: String,
        },
        lastUpdatedBy:{
            type: String,
        }
    },
    {
        timestamps:true
    })

    planSchema.methods.createPlan = async function(){
   
}

export const Plans = mongoose.model('Plans',planSchema)