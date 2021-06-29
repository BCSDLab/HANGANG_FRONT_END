import React, { useState } from "react";
import { getValueOnLocalStorage, setValueOnLocalStorage } from "utils/localStorageUtils";

import {
  Setting,
  Label,
  Row,
  NotifyLabel,
  ToggleButton,
  Circle,
  VersionNotify,
} from "./styles/EnvironmentSettingSection.style";

const SettingBox = () => {
  const [isAutoLogin, setIsAutoLogin] = useState(
    getValueOnLocalStorage("didHangangAutoLogin")
  );
  return (
    <Setting>
      <Label>설정</Label>
      <Row style={{ marginTop: "16px" }}>
        <NotifyLabel>자동로그인</NotifyLabel>
        <ToggleButton
          onClick={() => {
            setValueOnLocalStorage("didHangangAutoLogin", !isAutoLogin);
            setIsAutoLogin((prev) => !prev);
          }}
          status={isAutoLogin}
        >
          <Circle status={isAutoLogin} />
        </ToggleButton>
      </Row>
      <Row style={{ marginTop: "24px" }}>
        <NotifyLabel>버전 정보</NotifyLabel>
        <VersionNotify>최신 버전입니다.</VersionNotify>
      </Row>
    </Setting>
  );
};

export default SettingBox;
