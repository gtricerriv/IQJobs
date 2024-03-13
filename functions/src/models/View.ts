import { prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

class View extends TimeStamps {
  @prop({ required: true })
  public route!: string[];
}

const ViewModel = getModelForClass(View);

export const Views = { ViewModel, View };
export { ViewModel, View };
