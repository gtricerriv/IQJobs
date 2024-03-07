import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { CV } from './CV';
import { User } from './User';

/*const { CVModel } = CV;
const { UserModel } = User;*/
@modelOptions({ schemaOptions: { id: false } })

class ProfileClass extends TimeStamps{
    @prop({ required: true })
    public title!: String;

   // @prop({ ref: () => UserModel })
   // public user!: Ref<typeof UserModel>;

    @prop({ required: true })
    public first_name!: String;

    @prop({ required: true })
    public last_name!: String;
    @prop({ required: true })
    public cover_letter!: String;

    @prop({ required: true })
    public skills!: String;

    @prop({ required: true })
    public area!: String;

    @prop({ required: true })
    public education!: String;

    @prop({ required: true })
    public experience!: String;

    @prop({ required: true })
    public projects!: String;

    @prop({ required: true })
    public contact!: String;

    //@prop({ ref: () => CVModel })
   // public cv!: Ref<typeof CVModel>;
}

const ProfileModel = getModelForClass(ProfileClass);

export const Profile = { ProfileModel, ProfileClass };

export default { ProfileModel, ProfileClass };
