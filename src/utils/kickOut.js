import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { accessWithNotVerified, logout } from "store/modules/auth";

export const kickOut = (code = 0) => {
  const { addToast } = useToasts();
  const history = useHistory();
  const dispatch = useDispatch();

  switch (code) {
    case 1:
      // mypage : 로그인이 되어 있지 않은데 url로 접근할 경우
      history.push("/");
      dispatch(logout({ errorCode: 1 }));
      addToast("로그인 이후에 접근할 수 있습니다.", {
        appearance: "error",
        autoDismiss: true,
      });
      break;
    case 8:
      // mypage : 토큰 만료
      history.push("/");
      dispatch(logout({ errorCode: 8 }));
      addToast("토큰이 만료되었습니다. 다시 로그인 해주세요.", {
        appearance: "error",
        autoDismiss: true,
      });
      break;
    default:
      // URL 입력으로 findpw, signup 접근하려 할 시
      history.push("/login");
      dispatch(accessWithNotVerified());
      addToast("허용되지 않은 접근입니다.", {
        appearance: "error",
        autoDismiss: true,
      });
      break;
  }
};
