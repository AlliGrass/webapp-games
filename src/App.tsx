import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import DiceRoll from './pages/DiceRoll'
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dice' element={<DiceRoll/>} />
      </Routes>
    </Router>
  )
}

export default App


// type CounterAction = 
//   | { type: 'INCREMENT' }
//   | { type: 'DECREMENT' }
//   | { type: 'SET_COUNT'; payload: number }
//   | { type: 'SET_STEP'; payload: number };

// interface CounterState {
//   count: number;
//   step: number; // Custom increment/decrement value
// }

// const initialState: CounterState = {
//   count: 0,
//   step: 1, // Default step value
// };

// const reducer = (state: CounterState, action: CounterAction): CounterState => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return { ...state, count: state.count + state.step };
//     case 'DECREMENT':
//       return { ...state, count: state.count - state.step };
//     case 'SET_COUNT':
//       return { ...state, count: action.payload };
//     case 'SET_STEP':
//       return { ...state, step: action.payload };
//     default:
//       return state;
//   }
// };

// // Usage in component:
// const [state, dispatch] = useReducer(reducer, initialState);

// // To increment by current step value:
// dispatch({ type: 'INCREMENT' });

// // To change the step value:
// dispatch({ type: 'SET_STEP', payload: 5 });

// // To set specific count:
// dispatch({ type: 'SET_COUNT', payload: 100 });