import { prop, getModelForClass, Ref, modelOptions } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Profile } from './Profile';

const { ProfileModel, ProfileClass } = Profile;

@modelOptions({ schemaOptions: { id: false } })
class UserClass extends TimeStamps {
  /**
   * ID de autenticación de Auth0 del usuario.
   *
   * @type {string}
   * @memberof UserClass
   */
  @prop({ required: true })
  public auth0_id!: string;

  /**
   * Perfil asociado al usuario.
   *
   * @type {typeof ProfileClass}
   * @memberof UserClass
   */
  @prop({ ref: () => ProfileModel })
  public profile!: typeof ProfileClass;
}

const UserModel = getModelForClass(UserClass);


export const User = {UserModel, UserClass};
