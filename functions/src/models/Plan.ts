import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Transactions } from './Transaction';

const { TransactionModel, Transaction } = Transactions;

@modelOptions({ schemaOptions: { id: false } })
class Plan extends TimeStamps {
  @prop({ ref: () => Transaction })
  //@ts-ignore
  public transactions!: Ref<Transaction>[];
}

const PlanModel = getModelForClass(Plan);

export const Plans = { PlanModel, Plan };
export { PlanModel, Plan };
