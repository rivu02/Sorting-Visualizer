import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ generateRandomArray, startBubbleSort, startSelectionSort, startInsertionSort, startMergeSort,startQuickSort,startBucketSort, arraySize, setArraySize, visualizationSpeed, setVisualizationSpeed }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark ">
                <button className="navbar-toggler" type="button" onClick={toggleNav}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="#">
                    Sorting Visualizer
                </a>
                {/* <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button> */}



                <div className={`collapse navbar-collapse${isNavOpen ? ' show' : ''}`} id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item-active">
                            <a className="nav-link" href="#" onClick={generateRandomArray}>
                                Generate New Array
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startBubbleSort}>
                                Bubble Sort
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startSelectionSort}>
                                Selection Sort
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startInsertionSort}>
                                Insertion Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startMergeSort}>
                                Merge Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startQuickSort}>
                                Quick Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#" onClick={startBucketSort}>
                                Bucket Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <div className="slider-container ml-auto">
                                <small className="slider-label ml-2">Array Size</small>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="range"
                                        min="5"
                                        max="200"
                                        value={arraySize}
                                        onChange={(e) => setArraySize(e.target.value)}
                                        className="slider-right"
                                    />

                                </div>
                                <small className="slider-label ml-2"> Speed</small>
                                <div className="d-flex align-items-center">
                                    <input
                                        type="range"
                                        min="1"
                                        max="1000"
                                        value={visualizationSpeed}
                                        onChange={(e) => setVisualizationSpeed(e.target.value)}
                                        className="slider-right"
                                    />
                                </div>
                            </div>
                        </li>
                        {/* Add other sorting algorithms here */}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
