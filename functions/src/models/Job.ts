import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { UserClass, UserModel } from './User';

@modelOptions({ schemaOptions: { id: false } })

class JobClass extends TimeStamps{
    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ ref: () => UserModel })
    //@ts-ignore
    public user!: Ref<UserClass>;

    @prop({ required: true })
    public companies!: string[];

    @prop({ ref: () => UserModel })
    //@ts-ignore
    public user_applicants!: Ref<UserClass>[];

    @prop({ ref: () => UserModel })
    //@ts-ignore
    public recruiter!: Ref<UserCLass>;
}

const JobModel = getModelForClass(JobClass);

export const Job = {JobModel, JobClass};
export { JobModel, JobClass }
