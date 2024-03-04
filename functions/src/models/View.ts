import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';


class ViewClass extends TimeStamps {
  @prop({ required: true })
    public route!: string[];
  }
  
const ViewModel = getModelForClass(ViewClass);

export const View = {ViewModel, ViewClass};
export { ViewModel, ViewClass }