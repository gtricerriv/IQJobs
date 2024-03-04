import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import {Role} from './Role';
import {Transaction} from './Transaction'

//const { RoleModel } = Role;
const { TransactionModel } = Transaction;
@modelOptions({ schemaOptions: { id: false } })

class PlanClass extends TimeStamps {
  //  @prop({ required: true })
  //  public role!: Ref<typeof RoleModel>;

    @prop({ ref: () => TransactionModel, type: () => [TransactionModel] })
    public transactions!: Ref<typeof TransactionModel>[];
  }

const PlanModel = getModelForClass(PlanClass);

export const Plan = {PlanModel, PlanClass};
