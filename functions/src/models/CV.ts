import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
@modelOptions({ schemaOptions: { id: false } })

class CVClass {
  @prop({ required: true })
  public link!: string;
}

const CVModel = getModelForClass(CVClass);

export const CV = { CVModel, CVClass };
export { CVModel, CVClass }
