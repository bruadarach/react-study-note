import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const ModalContainer = styled.div`
// TODO : Modal을 구현하는데 전체적으로 필요한 CSS를 구현합니다.
background-color: lightpink;
display:flex;
justify-content: center;
align-items: center;
`;

export const ModalBtn = styled.button`
  background-color: #4000c7;
  text-decoration: none;
  border: none;
  padding: 20px;
  color: white;
  border-radius: 30px;
  cursor: grab;
`;

export const ModalBackdrop = styled.div`
 // TODO : Modal이 떴을 때의 배경을 깔아주는 CSS를 구현합니다.
 background-color: lightblue;
 /* position: fixed;
 left: 0;
 top:0;
 right:0;
 bottom:0; */
 // 높이를 지정해주면 높이를 우선순위로 가져가므로 높이 지정하지 말 것

`;

export const ModalView = styled.div.attrs(props => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog'
}))`
// Modal창 CSS를 구현합니다.
width: 300px;
height: 100px;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: #fff;
border-radius: 5px;
`;

export const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ModalContainer onClick={openModalHandler}>
        <ModalBtn  
        onClick={openModalHandler}
        >

        {isOpen? "Opend!" : "Open Mondal"}

        </ModalBtn>
        {/* {isOpen? 
        <ModalBackdrop/>
        && 
        <ModalView 
        /> : null} */}

        {isOpen? 
        <ModalBackdrop onClick={openModalHandler}>
          <ModalView onClick={ (event) => event.stopPropagation()}>
            <button onClick={openModalHandler}>X</button>
            <div>HELLO CODESTATES!</div>
          </ModalView>
        </ModalBackdrop> : null}
         
      </ModalContainer>
    </>
  );
};