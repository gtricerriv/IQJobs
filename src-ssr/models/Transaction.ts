import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Plan } from './Plan';

class TransactionClass extends TimeStamps {
  @prop({ required: true })
  public amount!: number;

  @prop({ required: true })
  public subscription_stripe_id!: string;

  // @ts-ignore
  @prop({ ref: Plan })
  // @ts-ignore
  public plan?: Ref<Plan>;
}

const TransactionModel = getModelForClass(TransactionClass);

export const Transaction = { TransactionModel, TransactionClass };

