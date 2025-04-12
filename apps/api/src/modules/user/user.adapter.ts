import { UserEntity } from './types';

export const UserAdapter = {
  toUserInfo: (user: UserEntity) => {
    return {
      uid: user.uid,
      user: user.pref_name,
      phone: user.phone,
      email: user.email,
      dob: user.dob instanceof Date ? user.dob.toISOString() : user.dob,
      pref_name: user.pref_name,
      first_name: user.first_name,
      last_name: user.last_name,
      payment_method: user.payment_method || undefined,
      subscription_plan: user.subscription_plan,
    };
  },
};
