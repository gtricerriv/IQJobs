import {
  prop,
  getModelForClass,
  Ref,
  modelOptions,
} from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { ProfileModel, Profile } from './Profile';

@modelOptions({ schemaOptions: { id: false } })
class User extends TimeStamps {
  /**
   * ID de autenticación de Auth0 del usuario.
   *
   * @type {string}
   * @memberof User
   */
  @prop({ required: true })
  public auth0_id!: string;

  /**
   * Perfil asociado al usuario.
   *
   * @type {typeof Profile}
   * @memberof User
   */
  @prop({ ref: () => Profile })
  // @ts-ignore
  profile: Ref<Profile>[];
}

const UserModel = getModelForClass(User);

export const Users = { UserModel, User };

export { UserModel, User };
