import "./App.css";
import React, {  useReducer } from "react";
import reducerFunc from "./Reducer/";
const initialState = {
  data: "",
  error: "",
  loading: false,
};

function App() {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { data, loading, error } = state;

  const fetchDog = () => {
    dispatch({ type: "FETCH_START" });

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((resp) => resp.json())
      .then((resp) => {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: resp.message,
        });
      })
      .catch(() => {
        dispatch({ type: "FETCH_ERROR", payload: "Fetch error" });
      });
  };
  return (
    <div className="App">
      <div>This is App</div>
      <button onClick={fetchDog} disabled={loading}>
        Get random cat
      </button>
      <br />
      {error && <p>{error}</p>}
      {data && <img src={data} alt="" />}
    </div>
  );
}

export default App;
