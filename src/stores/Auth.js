import { createStateLink } from '@hookstate/core';

export const AuthStore = createStateLink({ token: undefined });

export const updateToken = (token) => {
  const authStore = AuthStore.get();
  authStore.token = token;
  AuthStore.set(authStore);
};
