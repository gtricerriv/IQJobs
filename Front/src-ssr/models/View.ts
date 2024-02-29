import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Role } from './Role';
import { Plan } from './Plan';

const { PlanModel } = Plan;
const { RoleModel } = Role;


class ViewClass extends TimeStamps {
    @prop({ ref: () => PlanModel })
    public plan!: Ref<typeof PlanModel>;

    @prop({ ref: () => RoleModel })
    public views!: Ref<typeof RoleModel>;
  }
  
const ViewModel = getModelForClass(ViewClass);

export const View = {ViewModel, ViewClass};