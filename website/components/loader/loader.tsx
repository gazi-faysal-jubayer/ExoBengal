'use client';

import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div>
        <div id="planetTrail1" />
        <div id="planetTrail2" />
        <div id="planetTrail3" />
        <div className="planets">
          <div id="planet" />
          <div id="star" />
          <div id="starShadow" />
          <div id="blackHoleDisk2" />
          <div id="blackHole" />
          <div id="blackHoleDisk1" />
        </div>
      </div>
    </StyledWrapper>
    
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, rgba(12, 12, 12, 0.2) 0%, rgba(26, 26, 46, 0.2) 50%, rgba(22, 33, 62, 0.2) 100%);
  overflow: hidden;
  position: relative;

  .planets {
    position: relative;
    height: 100px;
    width: 100px;
    display: flex;
  }

  #planetTrail1,
  #planetTrail2,
  #planetTrail3 {
    outline: solid rgb(101, 101, 101) 1px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    will-change: transform;
  }

  #planetTrail1::after,
  #planetTrail2::after,
  #planetTrail3::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    border-radius: 50%;
    top: -5px;
    left: 50%;
    transform: translateX(-50%);
    will-change: transform;
  }

  #planetTrail1::after {
    background-color: rgb(213, 213, 120);
  }

  #planetTrail2::after {
    background-color: rgb(115, 174, 231);
  }

  #planetTrail3::after {
    background-color: rgb(180, 73, 49);
  }

  #planetTrail1 {
    width: 120px;
    height: 120px;
    animation: trails1 4s infinite;
  }

  #planetTrail2 {
    width: 170px;
    height: 170px;
    animation: trails2 4s infinite;
  }

  #planetTrail3 {
    width: 220px;
    height: 220px;
    animation: trails3 4s infinite;
  }

  @keyframes trails1 {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    40% {
      transform: translate3d(-50%, -50%, 0) rotate(360deg);
      width: 120px;
      height: 120px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 120px;
      height: 120px;
    }
  }

  @keyframes trails2 {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    40% {
      transform: translate3d(-50%, -50%, 0) rotate(250deg);
      width: 170px;
      height: 170px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 170px;
      height: 170px;
    }
  }

  @keyframes trails3 {
    0% {
      transform: translate3d(-50%, -50%, 0) rotate(0deg);
    }
    40% {
      transform: translate3d(-50%, -50%, 0) rotate(170deg);
      width: 220px;
      height: 220px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 220px;
      height: 220px;
    }
  }

  #star {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgb(255, 170, 0);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bouncingStar 4s infinite;
    will-change: transform;
  }

  #starShadow {
    position: absolute;
    width: 50px;
    height: 20px;
    background-color: rgb(255, 170, 0);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 100%);
    filter: blur(5px);
    opacity: 0.3;
    animation: shadowAnimation 4s infinite;
    will-change: opacity;
  }

  @keyframes bouncingStar {
    0% {
      transform: translate3d(-50%, -50%, 0);
    }
    10% {
      transform: translate3d(-50%, -30%, 0);
    }
    20% {
      transform: translate3d(-50%, -50%, 0);
    }
    30% {
      transform: translate3d(-50%, -30%, 0);
    }
    40% {
      transform: translate3d(-50%, -50%, 0);
      width: 50px;
      height: 50px;
    }
    50% {
      width: 0px;
      height: 0px;
    }
    90% {
      width: 0px;
      height: 0px;
    }
    100% {
      width: 50px;
      height: 50px;
    }
  }

  @keyframes shadowAnimation {
    0% {
      opacity: 0.1;
    }
    10% {
      opacity: 0.4;
    }
    20% {
      opacity: 0.1;
    }
    30% {
      opacity: 0.4;
    }
    40% {
      opacity: 0.1;
    }
    50% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0.1;
    }
  }

  #blackHole {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgb(0, 0, 0);
    outline: orange solid 5px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: bouncingBlackHole 4s infinite;
    will-change: transform;
  }

  @keyframes bouncingBlackHole {
    0% {
      height: 0px;
      width: 0px;
    }
    40% {
      width: 0px;
      height: 0px;
    }
    50% {
      width: 50px;
      height: 50px;
    }
    90% {
      width: 50px;
      height: 50px;
    }
    100% {
      width: 0px;
      height: 0px;
    }
  }

  #blackHoleDisk1 {
    position: absolute;
    width: 68px;
    height: 68px;
    clip-path: inset(50% 0 0 0);
    border: black 10px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(70deg);
    animation: diskAn 4s infinite;
    will-change: transform;
  }

  #blackHoleDisk2 {
    position: absolute;
    width: 70px;
    height: 70px;
    clip-path: inset(0 0 50% 0);
    border: rgb(245, 174, 8) 10px solid;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotateX(55deg);
    animation: diskAn 4s infinite;
    will-change: transform;
  }

  @keyframes diskAn {
    0% {
      height: 0px;
      width: 0px;
      border: orange 0px solid;
    }
    40% {
      width: 0px;
      height: 0px;
      border: orange 0px solid;
    }
    50% {
      width: 88px;
      height: 88px;
      border: orange 18px solid;
    }
    90% {
      width: 88px;
      height: 88px;
      border: orange 18px solid;
    }
    100% {
      width: 0px;
      height: 0px;
      border: orange 0px solid;
    }
  }

  #planet {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    animation: planetAn 4s infinite;
    will-change: transform, opacity;
  }

  @keyframes planetAn {
    0% {
      opacity: 0;
      transform: translate3d(0px, 0px, 0);
      z-index: 1;
    }
    50% {
      opacity: 0;
      transform: translate3d(0px, 0px, 0);
      z-index: 1;
    }
    58% {
      opacity: 1;
    }
    70% {
      opacity: 1;
      transform: translate3d(100px, 40px, 0);
      z-index: 1;
    }
    71% {
      z-index: 0;
    }
    90% {
      z-index: 0;
      opacity: 1;
      transform: translate3d(-10px, 70px, 0);
    }
    100% {
      transform: translate3d(-10px, 70px, 0);
      opacity: 0;
    }
  }
`;

export default Loader;