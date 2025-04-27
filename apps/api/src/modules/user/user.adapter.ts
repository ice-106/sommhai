import { UserEntity } from './types';

export const UserAdapter = {
  toUserInfo: (user: UserEntity) => {
    return {
      uid: user.uid,
      username: user.username,
      phone: user.phone,
      email: user.email,
      payment_method: user.payment_method,
      subscription_plan: user.subscription_plan,
      picture: user.picture,
    };
  },
};
