import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Plan } from './Plan';
import { View } from './View';

const { PlanModel } = Plan;
const { ViewModel } = View;
@modelOptions({ schemaOptions: { id: false } })

class RoleClass extends TimeStamps {
    @prop({ ref: () => PlanModel })
    //@ts-ignore
    public plan!: Ref<PlanClass>;

    @prop({ ref: () => ViewModel })
    //@ts-ignore
    public views!: Ref<ViewClass>;
  }

const RoleModel = getModelForClass(RoleClass);

export const Role = { RoleModel, RoleClass };
export { RoleModel, RoleClass };
