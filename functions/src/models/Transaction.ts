import { prop, getModelForClass, Ref,modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
//import { Plan } from './Plan';

//const { PlanModel } = Plan;
@modelOptions({ schemaOptions: { id: false } })

class TransactionClass extends TimeStamps {
    //@prop({ ref: () => PlanModel })
   // public plan!: Ref<typeof PlanModel>;

    @prop({ required: true })
    public amount!: number;

    @prop({ required: true })
    public subscription_stripe_id!: string;

  }

const TransactionModel = getModelForClass(TransactionClass);

export const Transaction = {TransactionModel, TransactionClass};

export  { TransactionClass, TransactionModel };
