import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    @font-face {
        font-family: "NotoSansCJKKR";
        src: url("https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/fonts/NotoSansCJKkr-Regular.otf") format("otf");
        font-style:italic;
        font-weight:normal;
    }
    *{
        box-sizing:border-box;
    }
    html, body, #root{
        font-family:NotoSansCJKKR;
        height:100%;
    }
`;

export default GlobalStyle;
