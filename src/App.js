import React, { useState, useEffect, useCallback } from "react";
import { useEventListener } from "./hooks/useEventListener";
// import "./App.css";

const App = () => {
    // let [counter, setCounter] = useState(0);
    // let [inputValue, setInputValue] = useState("Pedro");

    // Computes a new value between min/max inclusive
    const generateValue = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let [value, setValue] = useState(generateValue(1, 100));
    let [grades, setGrades] = useState([]);

    const validateFactory = (predicate) => {
        return () => {
            if (predicate()) {
                setGrades([...grades, "P"]);
            } else {
                setGrades([...grades, "F"]);
            }
        };
    };

    const validateFizz = validateFactory(
        () => value % 3 === 0 && value % 5 !== 0
    );
    const validateBuzz = validateFactory(
        () => value % 3 !== 0 && value % 5 === 0
    );
    const validateFizzBuzz = validateFactory(
        () => value % 3 === 0 && value % 5 === 0
    );
    const validateValue = validateFactory(
        () => value % 3 !== 0 && value % 5 !== 0
    );

    const handleFizz = () => {
        validateFizz();
        setValue(generateValue(1, 100));
    };

    const handleValue = () => {
        validateValue();
        setValue(generateValue(1, 100));
    };

    const handleFizzBuzz = () => {
        validateFizzBuzz();
        setValue(generateValue(1, 100));
    };

    const handleBuzz = () => {
        validateBuzz();
        setValue(generateValue(1, 100));
    };

    const handleKeyDown = (e) => {
        console.log("Handling key press...");
        switch (e.key) {
            case "ArrowUp":
                handleFizz();
                break;
            case "ArrowLeft":
                handleValue();
                break;
            case "ArrowRight":
                handleFizzBuzz();
                break;
            case "ArrowDown":
                handleBuzz();
                break;
            default:
                return;
        }
    };

    useEventListener("keydown", handleKeyDown);

    return (
        <div className="bg-neutral-800 h-full min-h-screen flex flex-col justify-center items-center">
            <div
                className="block bg-neutral-700 p-5 rounded-md text-white"
                onKeyDown={handleKeyDown}
            >
                {/* Display a random value from 1 to 100*/}
                <div className="mb-4 text-3xl text-center text-yellow-500">
                    Fizz = 3, Buzz = 5
                </div>
                <div className="relative">
                    <button
                        className="w-40 text-xl block m-auto bg-neutral-800 p-2 rounded-md hover:-translate-y-0.5 hover:drop-shadow-xl"
                        onClick={() => handleFizz()}
                    >
                        {"⬆ Fizz"}
                    </button>
                    <div className="flex justify-center items-center">
                        <button
                            className="w-40 text-xl m-4 bg-neutral-800 p-2 rounded-md hover:-translate-y-0.5 hover:drop-shadow-xl"
                            onClick={() => handleValue()}
                        >
                            {`⬅ ${value}`}
                        </button>
                        <div className="w-40 text-xl text-center">{value}</div>
                        <button
                            className="w-40 text-xl m-4 bg-neutral-800 p-2 rounded-md hover:-translate-y-0.5 hover:drop-shadow-xl"
                            onClick={() => handleFizzBuzz()}
                        >
                            {"FizzBuzz ➡"}
                        </button>
                    </div>
                    <button
                        className="w-40 text-xl block m-auto bg-neutral-800 p-2 rounded-md hover:-translate-y-0.5 hover:drop-shadow-xl"
                        onClick={() => handleBuzz()}
                    >
                        {"Buzz ⬇"}
                    </button>
                </div>
            </div>
            <div className="grades w-96 mt-4 mx-auto break-words">
                {grades.map((grade) => (grade === "P" ? "🟢" : "🔴")).join(" ")}
            </div>
        </div>
    );
};

export default App;
