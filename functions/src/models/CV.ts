import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
@modelOptions({ schemaOptions: { id: false } })
class CV {
  @prop({ required: true })
  public link!: string;
}

const CVModel = getModelForClass(CV);

export const CVs = { CVModel, CV };
export { CVModel, CV };
