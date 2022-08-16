import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
    // let [counter, setCounter] = useState(0);
    // let [inputValue, setInputValue] = useState("Pedro");

    // Computes a new value between min/max inclusive
    const generateValue = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    };

    let [value, setValue] = useState(generateValue(1, 100));
    let [grades, setGrades] = useState([]);

    useEffect(() => {
        document.addEventListener("keydown", detectKeyDown, true);
    }, []);

    const detectKeyDown = (e) => {
        console.log("Clicked Key: ", e.key);
    };

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

    return (
        <div className="content">
            {/* Display a random value from 1 to 100*/}
            <div className="rules">Fizz = 3, Buzz = 5</div>
            <div>
                <button
                    className="button button-fizz"
                    onClick={() => {
                        validateFizz();
                        setValue(generateValue(1, 100));
                    }}
                >
                    {"⬆\nFizz"}
                </button>
                <div className="center-row">
                    <button
                        className="button button-value"
                        onClick={() => {
                            validateValue();
                            setValue(generateValue(1, 100));
                        }}
                    >
                        {`⬅ ${value}`}
                    </button>
                    <div className="value">{value}</div>
                    <button
                        className="button button-fizzbuzz"
                        onClick={() => {
                            validateFizzBuzz();
                            setValue(generateValue(1, 100));
                        }}
                    >
                        {"FizzBuzz ➡"}
                    </button>
                </div>
                <button
                    className="button button-buzz"
                    onClick={() => {
                        validateBuzz();
                        setValue(generateValue(1, 100));
                    }}
                >
                    {"Buzz\n⬇"}
                </button>
                <div className="grade">
                    {grades
                        .map((grade) => (grade === "P" ? "🟢" : "🔴"))
                        .join(" ")}
                </div>
            </div>
        </div>
    );
};

export default App;
