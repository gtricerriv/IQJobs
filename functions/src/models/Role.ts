import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Plans } from './Plan';
import { Views } from './View';

const { PlanModel, Plan } = Plans;
const { ViewModel, View } = Views;
@modelOptions({ schemaOptions: { id: false } })
class Role extends TimeStamps {
  @prop({ ref: () => PlanModel })
  //@ts-ignore
  public plan!: Ref<Plan>;

  @prop({ ref: () => ViewModel })
  //@ts-ignore
  public views!: Ref<View>;
}

const RoleModel = getModelForClass(Role);

export const Roles = { RoleModel, Role };
export { RoleModel, Role };
