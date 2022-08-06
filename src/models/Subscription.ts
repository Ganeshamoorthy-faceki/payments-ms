const mongoose = require('mongoose')

type intervalType="DAILY" | "WEEKLY" | "MONTHLY" | "BIMONTHLY" | "QUARTERLY" | "HALFYEARLY" | "YEARLY";

export interface SubscriptionModel {
    subscription_id: string;
    amountPeopleSaved: number;
    createdAt: Date;
    modifiedAt: Date;
  }
const subscriptionSchema = mongoose.Schema({
        subscriptionId:{
            type:String,
            trim:true,
            unique:true,
            required : [true,'subcriptionId required']
        },
        subscriptionPlanId:{
            type: String,
            required : true,
        },
        paymentGateway:{
            type:String,
            trim:true
        },
        clientId:{
            type:String,
            trim:true
        },
        status:{
            type:String,
            trim:true
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
//Custom method on client variable instance
subscriptionSchema.methods.createSubscription = async function(){
   
}

export const Subscriptions = mongoose.model('Subscriptions',subscriptionSchema)