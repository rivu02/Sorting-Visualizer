import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ generateRandomArray, startBubbleSort, startSelectionSort, startInsertionSort, startMergeSort, startQuickSort, startRadixSort, arraySize, setArraySize, visualizationSpeed, setVisualizationSpeed, sortingInProgress, isVisualizing }) => {
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
                        <li className="nav-item">
                            <a
                                className={`nav-link ${sortingInProgress ? 'disabled' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!sortingInProgress) {
                                        generateRandomArray();
                                    }
                                }}
                            >
                                Generate New Array
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={`nav-link ${sortingInProgress ? 'disabled' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!sortingInProgress) {
                                        startBubbleSort();
                                    }
                                }}
                            >
                                Bubble Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className={`nav-link ${sortingInProgress ? 'disabled' : ''}`}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!sortingInProgress) {
                                        startSelectionSort();
                                    }
                                }}
                            >
                                Selection Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isVisualizing) {
                                        startInsertionSort();
                                    }
                                }}
                            >
                                Insertion Sort
                            </a>
                        </li>


                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isVisualizing) {
                                        startMergeSort();
                                    }
                                }}
                            >
                                Merge Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isVisualizing) {
                                        startQuickSort();
                                    }
                                }}
                            >
                                Quick Sort
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (!isVisualizing) {
                                        startRadixSort();
                                    }
                                }}
                            >
                                Radix Sort
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
                                        disabled={isVisualizing} // Disable while visualization is in progress
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
                                        disabled={isVisualizing} // Disable while visualization is in progress
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
