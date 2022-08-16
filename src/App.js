import React, { useState } from "react";
import "./App.css";

const App = () => {
    let [counter, setCounter] = useState(0);

    return (
        <div>
            <div className="counter">
                {counter}
                <button
                    className="counter__button"
                    onClick={() => setCounter(counter + 1)}
                >
                    Increment
                </button>
            </div>
            <div className="form">
                <input placeholder="Enter something..."></input>
            </div>
        </div>
    );
};

export default App;
