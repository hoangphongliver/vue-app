import authAPI from "../../../service/auth.api";
import types from "./types";

const Auth = {
  namespaced: true,
  state: () => ({
    isShowLoginModal: false,
    isShowSignUp: false,
    isShowSignIn: true,
  }),
  actions: {
    onLogin({ commit }, payload) {
      commit(types.LOGIN);

      authAPI
        .login(payload.email, payload.password)
        .then((res) => {
          console.log(res);
          commit(types.LOGIN_SUCCESS, res);
        })
        .catch((err) => {
          console.log(err);
          commit(types.LOGIN_FAIL, err);
        });
    },
  },
  mutations: {
    [types.LOGIN](state) {},
    [types.LOGIN_SUCCESS](state) {},
    [types.LOGIN_FAIL](state) {},
  },
};

export default Auth;
