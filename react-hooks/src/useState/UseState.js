/*

    state: 컴포넌트가 갖을 수 있는 상태값

    const [state, setState] = userState('초기값');
          [상태변화감지변수, 상태변화값업데이트]

    - useState Hook은 state와 setState를 배열 형태로 리턴해 준다. 
    - state에는 현재 상태값이 들어있고, setState()함수로 state를 변경할 수 있다. 
    - setState를 사용해서 state를 변경할 때 마다 컴포넌트는 다시 렌더링이 된다.  

    - state를 변경할 때, 새로 변경 될 state값이, 이전 state값과 연관이 되어있다면, 
      setState 인자로 새로운 state를 리턴하는 콜백함수를 넣어주는 게 좋다.  

      setState((prevState)=>{
        return newState;
      })

    - useState를 사용해서 초기값을 받아올 때, 어떤 무거운 작업을 해야한다면,
      useState의 인자로 콜백함수를 넣어주면, 맨 처음 렌더링이 될 때만 실행되게 할 수 있다. 

      useState(()=>{
        return heavyWork();
      })

*/

import { useState } from 'react';

const heavyWork = () => {
  console.log('엄청 무거운 작업!')
  return(['수지','민지','자르비스'])
}

function UseState() {
    const [time, setTime] = useState(1);

    const handleClick = () => {
        setTime(time+1);
    }

    //const [names, setNames] = useState(['지럭키','지덕화']) // print changeable values in an array via map() // map으로 HTML에 배열값 넣어 출력
    // 문제: useState(['지럭키','지덕화']) 초기값을 넣는 것의 단점? state가 없데이트 될때마다, 초기값+업데이트값이 계속 렌더링된다.
    
    //const [names, setNames] = useState(heavyWork());
    // 해결: 1) 무거운 작업을 하는 함수를 만들어 초기값에 넣어준다
    // 문제: 여전히 함수가 계속 렌더링 될 때 마다  불리게 됨

    const [names, setNames] = useState(() => { 
      return heavyWork()
    });
    // 해결: 2) 무거운 작업을 하는 함수를 콜백함수 리턴값으로 넣어 준다. => 가장 처음에 렌더링이 될 때만 함수를 불러준다.
    // 결론: 초기값에 가져올 때, 무거운 작업을 가져와야한다면, useState()안에 바로값을 넣어주는게 아니라, 
    //      우리가 원하는 값을 리턴해주는 콜백형태로 넣어주면 맨 처음에 렌더링 될때만 그 함수가 불러지게 된다.

    const [input, setInput] = useState(''); // changeable value listener // input => input상태 트랙킹, setInput=> input 업데이트

    const handleInputChange = (e) => {
      setInput(e.target.value);
    }

    const handleUpload = () => {
      setNames((prevState) => { // prevState = ['지럭키','지덕화']
        console.log('이전 state:', prevState) 
        // state를 변경할 때, 새로 변겨될 state값이, 이전 state값과 연관이 되어 있다면, 
        // setState의 인자로, 새로운 state를 return하는 callback함수를 리턴해주느 것이 좋다. 

        return [input, ...prevState] // ['새로운input값','지럭키','지덕화']
      })
    }

    //console.log(input);
    return (
      <main>
        <div>
            <span>현재 시각: {time}시</span>
            <button onClick={handleClick}>Update</button>
        </div>
        <div>
          <input type="text" 
            value={input}
            onChange={handleInputChange}
          />
          <button onClick={handleUpload}>Upload</button>
          {names.map((ele, idx) => {
            return <p key={idx}>{ele}</p>
            })}
        </div>
      </main>
    )
} 

export default UseState;