import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Plan } from './Plan';
import { View } from './View';

const { PlanModel } = Plan;
const { ViewModel } = View;
@modelOptions({ schemaOptions: { id: false } })

class RoleClass extends TimeStamps {
    @prop({ ref: () => PlanModel })
    public plan!: Ref<typeof PlanModel>;

    @prop({ ref: () => ViewModel })
    public views!: Ref<typeof ViewModel>;
  }

const RoleModel = getModelForClass(RoleClass);

export const Role = { RoleModel, RoleClass };
