import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { test } from "store/modules/auth";

const App = () => {
  const {
    authReducer: { testValue },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(testValue);
  }, [testValue]);

  return (
    <div>
      <h1>테스트 3</h1>
      <button onClick={() => dispatch(test("테스트요"))}>테스트</button>
    </div>
  );
};

export default App;
