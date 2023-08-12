import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArrayBars from '../components/ArrayBars';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Visualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(100);
  const [visualizationSpeed, setVisualizationSpeed] = useState(500);
  const MAX_VISUALIZATION_SPEED = 1000;
  const MIN_VISUALIZATION_SPEED = 1;

  useEffect(() => {
    generateRandomArray();
  }, [arraySize]);

  const generateRandomArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(randomIntFromInterval(5, 500));
    }
    setArray(newArray);
  };

  const bubbleSort = async () => {
    const newArray = [...array];
    const n = newArray.length;
    let swapped;

    do {
      swapped = false;

      for (let i = 0; i < n - 1; i++) {
        if (newArray[i] > newArray[i + 1]) {
          [newArray[i], newArray[i + 1]] = [newArray[i + 1], newArray[i]];
          swapped = true;
          setArray([...newArray]);
          await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED)); // Introduce the delay
        }
      }
    } while (swapped);
  };


  const selectionSort = async () => {
    const newArray = [...array];
    const n = newArray.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      for (let j = i + 1; j < n; j++) {
        if (newArray[j] < newArray[minIndex]) {
          minIndex = j;
        }
      }

      [newArray[i], newArray[minIndex]] = [newArray[minIndex], newArray[i]];
      setArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED)); // Introduce the delay
    }
  };

  const insertionSort = async () => {
    const newArray = [...array];
    const n = newArray.length;

    for (let i = 1; i < n; i++) {
      let key = newArray[i];
      let j = i - 1;

      while (j >= 0 && newArray[j] > key) {
        newArray[j + 1] = newArray[j];
        j = j - 1;
      }

      newArray[j + 1] = key;
      setArray([...newArray]);
      await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED));
    }
  };

  const mergeSort = async () => {
    const newArray = [...array];
    await mergeSortHelper(newArray, 0, newArray.length - 1);
  };

  const mergeSortHelper = async (arr, left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);
      await merge(arr, left, mid, right);
      await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED));
    }
  };

  const merge = async (arr, left, mid, right) => {
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArray = new Array(n1);
    const rightArray = new Array(n2);

    for (let i = 0; i < n1; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;

      const dynamicDelay = mapSpeedToDelay(visualizationSpeed);
      await new Promise((resolve) => setTimeout(resolve, dynamicDelay));
      setArray([...arr]);
    }

    while (i < n1) {
      arr[k] = leftArray[i];
      i++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, visualizationSpeed));
      setArray([...arr]);
    }

    while (j < n2) {
      arr[k] = rightArray[j];
      j++;
      k++;
      await new Promise((resolve) => setTimeout(resolve, visualizationSpeed));
      setArray([...arr]);
    }
  };

  const mapSpeedToDelay = (speed) => {
    const MAX_DELAY = 1000;
    const MIN_DELAY = 1;
    return MAX_DELAY - speed + MIN_DELAY;
  };


  return (
    <div>
      <NavBar
        generateRandomArray={generateRandomArray}
        startBubbleSort={bubbleSort}
        startSelectionSort={selectionSort}
        startInsertionSort={insertionSort}
        startMergeSort={mergeSort}
        arraySize={arraySize}
        setArraySize={setArraySize}
        visualizationSpeed={visualizationSpeed}
        setVisualizationSpeed={setVisualizationSpeed}
      />
      <div className="array-container">
        <ArrayBars array={array} />
      </div>
    </div>
  );
};

export default Visualizer;
