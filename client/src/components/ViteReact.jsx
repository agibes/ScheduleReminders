import {useState} from "react";
import reactLogo from '../assets/react.svg';

const viteReact = () => {
    return (
        <>
            <div>
            <a href="https://vitejs.dev" target="_blank">
                <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
            </div>
            <h1>Vite + React</h1>
        </>
    );
};

export default viteReact;