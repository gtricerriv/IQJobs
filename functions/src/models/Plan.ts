import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Transaction } from './Transaction';

const { TransactionModel, TransactionClass } = Transaction;

@modelOptions({ schemaOptions: { id: false } })
class PlanClass extends TimeStamps {
    @prop({ ref: () => TransactionClass })
    //@ts-ignore
    public transactions!: Ref<TransactionClass>[];
}

const PlanModel = getModelForClass(PlanClass);

export const Plan = { PlanModel, PlanClass };
export { PlanModel, PlanClass }
