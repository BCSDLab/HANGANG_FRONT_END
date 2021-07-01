import styled from "styled-components";
import { Link } from "react-router-dom";
import { BorderColor, ConceptColor, InnerContentWidth } from "static/Shared/commonStyles";

export const NavigationWrapper = styled.nav`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 80px;
  border-bottom: 1px solid ${BorderColor};
`;

export const InnerContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: ${InnerContentWidth};
  height: 100%;
`;

export const Logo = styled.img.attrs({
  src:
    "https://hangang-storage.s3.ap-northeast-2.amazonaws.com/assets/img/indexpage/navigation_logo.png",
  alt: "로고",
})`
  width: 80px;
  margin-right: 40px;
  cursor: pointer;
`;

export const StyledLinkWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
`;

export const StyledLink = styled(Link)`
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 107px;
  font-size: 17px;
  color: ${ConceptColor};
  cursor: pointer;
`;

/**
 * A function to convert path to number.
 * resourcePathRegex is a regex expression to handle dynamic route of ~/resource/{id}
 * It prevent not allowed url such as "~/resource" or "~/resource/"
 * @param {string} current A string of current url
 * @returns A numbers to handle navigation underline.
 */
const currentConverter = (current) => {
  let resourcePathRegex = /(\/resource\/)[0-9]+/g;
  let lecturePathRegex = /(\/lecture\/)[0-9]+/g;

  if (current.includes("/lectures") || current.match(lecturePathRegex)) return 1;
  else if (current.includes("/resources") || current.match(resourcePathRegex)) return 2;
  else if (current.includes("/timetable")) return 3;
  else if (current.includes("/my")) return -1;
  else if (current.includes("/")) return 0;
  else return -1;
};

export const NavigationUnderline = styled.div`
  display: ${({ current }) => (currentConverter(current) === -1 ? "none" : "block")};
  position: absolute;
  bottom: -1px;
  width: 107px;
  height: 2px;
  background-color: ${ConceptColor};
  transition: transform 0.3s ease;
  transform: translateX(${({ current }) => currentConverter(current) * 107}px);
`;

export const AuthBox = styled.div`
  position: absolute;
  top: calc(50% - 10px);
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 20px;
`;

export const Item = styled(Link)`
  all: unset;
  height: 100%;
  color: ${ConceptColor};
  font-size: 15px;
  line-height: 20px;
  cursor: pointer;
`;

export const LogoutButton = styled(Item)``;

export const MiddleLine = styled.div`
  width: 1px;
  height: 15px;
  margin: 0px 24px;
  background-color: #dadada;
`;
