import styled, { createGlobalStyle } from 'styled-components';

interface ColorObj {
  bg: string;
  color: string;
}

interface Colors {
  danger: ColorObj;
  warning: ColorObj;
  primary: ColorObj;
  white: ColorObj;
  black: ColorObj;
  orange: ColorObj;
}

interface BreakPoint {
  sm: number;
}

const colors: Colors = {
  danger: {
    bg: '#ff5353',
    color: '#000',
  },
  warning: {
    bg: '#f9894e',
    color: '#000',
  },
  orange: {
    bg: '#ffa22e',
    color: '#000',
  },
  primary: {
    bg: '#4e7bf9',
    color: '#fff',
  },
  white: {
    bg: '#fff',
    color: '#000',
  },
  black: {
    bg: '#000',
    color: '#fff',
  },
};

const breakpoints: BreakPoint = {
  sm: 550,
};

const mediaQueries = (key: keyof typeof breakpoints) => {
  return (style: TemplateStringsArray | String) => `@media (max-width: ${breakpoints[key]}px) { ${style} }`;
};

// Global Style
export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
    font-family: system-ui;
  }
`;

export const MainContainer = styled.div`
  width: 90%;
  margin: 2rem auto;
  position: relative;
  min-height: 40rem;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #ddd;
`;

export const MainHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 2rem;
  color: #52595d;
`;

export const UserDetails = styled.div`
  display: flex;
  align-items: center;
`;

export const UserId = styled.div<{ variant: string }>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  right: 0;
  bottom: -2px;
  z-index: 99;
  font-size: 10px;
  background: ${({ variant }) => colors[variant as keyof Colors].bg};
  color: ${({ variant }) => colors[variant as keyof Colors].color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UserBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserName = styled.div`
  font-weight: bold;
  margin-left: 1.5rem;
  color: #3e3e3e;
`;

export const UserScore = styled.div`
  color: ${colors.danger.bg};
  font-size: 1.5rem;
  font-weight: bold;
`;

export const ScoreBox = styled.div<{ score: number }>`
  &:before {
    content: ${({ score }) => `'${score}'`};
    color: #3e3e3e;
  }

  &:after {
    content: 'points';
    color: #aaaaaa;
    font-size: 14px;
    margin-left: 0.2rem;
    font-weight: normal;

    ${mediaQueries('sm')` 
      content: "";
  `}
  }
`;

export const User = styled.div<{ top: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 1rem;
  position: absolute;
  transition: 0.8s;
  width: 100%;
  top: ${({ top }) => `${top * 4}rem`};
  background-color: ${({ top }) => (top % 2 === 0 ? `#f0f3fc` : `#fff`)};
  border-bottom: ${({ top }) => `${top === 9 ? 0 : 1}px solid #ddd`};

  &:hover {
    cursor: pointer;
    background: #4a69dd !important;
  }

  &:hover ${UserName} {
    color: white;
  }

  &:hover ${ScoreBox} {
    &:before {
      color: white;
    }
  }
`;
