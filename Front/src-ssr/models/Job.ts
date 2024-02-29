import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Users, CVs } from './Index';
const { UserModel } = Users;
@modelOptions({ schemaOptions: { id: false } })

class JobClass extends TimeStamps{
    @prop({ required: true })
    public title!: string;

    @prop({ required: true })
    public description!: string;

    @prop({ ref: () => UserModel })
    public user!: Ref<typeof UserModel>;

    @prop({ required: true })
    public companies!: string[];

    @prop({ ref: () => UserModel })
    public user_applicants!: Ref<typeof UserModel>;

    @prop({ ref: () => UserModel })
    public recruiter!: Ref<typeof UserModel>;
}

const JobModel = getModelForClass(JobClass);

export const Job = {JobModel, JobClass};
