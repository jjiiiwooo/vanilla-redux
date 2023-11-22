import { legacy_createStore as createStore } from "redux";

const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

//엑션 이름 지정 
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

//액션 생성 함수 
const toggleSwitch = () => ({type: TOGGLE_SWITCH});
const increase = difference => ({type: INCREASE, difference});
const decrease = () => ({type:DECREASE});

//초깃값 설정
const initialState = {
    toggle: false,
    counter: 0
};

//state가 undefined일 때는 initalState를 기본값으로 사용 
function reducer(state=initialState, action) {
    //action.type에 따라 다른 작업 처리
    switch(action.type) {
        case TOGGLE_SWITCH:
            return {
                ...state, //불변성 유지
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state, //불변성 유지
                counter: state.counter + action.difference
            };
        case DECREASE:
            return {
                ...state, //불변성 유지
                counter: state.counter -1
            };
        default:
            return state;
    }
}

//액션 발생시키기
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};

btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};

btnDecrease.onclick = () => {
    store.dispatch(decrease());
};


const store = createStore(reducer);

//상태가 업데이트될 때마다 호출
const render = () => {
    const state = store.getState(); //현재 상태를 불러옴

    console.log(state.toggle);
    //토글 처리
    if(state.toggle) {
        divToggle.classList.add("active");
    }else {
        divToggle.classList.remove("active");
    }
    console.log(state.counter);

    //카운터 처리
    counter.innerText = state.counter;
};

render();

store.subscribe(render);

