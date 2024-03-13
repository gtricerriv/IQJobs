import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { User, UserModel } from './User';
import { Profile, ProfileModel } from '../models/Profile';

@modelOptions({ schemaOptions: { id: false } })
class Job extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ ref: () => UserModel })
  //@ts-ignore
  public user!: Ref<User>;

  @prop({ required: true })
  public companies!: string[];

  @prop({ ref: () => ProfileModel })
  //@ts-ignore
  public user_applicants!: Ref<Profile>[];

  @prop({ ref: () => ProfileModel })
  //@ts-ignore
  public recruiter!: Ref<Profile>;
  @prop()
  public premium!: boolean;
}

const JobModel = getModelForClass(Job);

export const Jobs = { JobModel, Job };
export { JobModel, Job };
