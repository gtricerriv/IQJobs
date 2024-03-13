import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CVs } from './CV';

const { CVModel, CV } = CVs;
@modelOptions({ schemaOptions: { id: false } })
class Profile extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public first_name!: string;

  @prop({ required: true })
  public last_name!: string;
  @prop({ required: true })
  public cover_letter!: string;

  @prop({ required: true })
  public skills!: string;

  @prop({ required: true })
  public area!: string;

  @prop({ required: true })
  public education!: string;

  @prop({ required: true })
  public experience!: string;

  @prop({ required: true })
  public projects!: string;

  @prop({ required: true })
  public contact!: string;

  @prop({ default: false })
  public isRecruiter!: boolean;

  @prop({ ref: () => CVModel })
  // @ts-ignore
  public cv!: Ref<CVClass>;
}

const ProfileModel = getModelForClass(Profile);

export const Profiles = { ProfileModel, Profile };

export { ProfileModel, Profile };
