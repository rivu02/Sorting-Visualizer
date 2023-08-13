import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ArrayBars from '../components/ArrayBars';

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Visualizer = () => {
  const [sortingInProgress, setSortingInProgress] = useState(false);
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(100);
  const [visualizationSpeed, setVisualizationSpeed] = useState(500);
  const MAX_VISUALIZATION_SPEED = 1000;
  const MIN_VISUALIZATION_SPEED = 1;

  const handleStartVisualization = async (algorithm) => {
    setSortingInProgress(true);

    if (algorithm === 'bubbleSort') {
      await bubbleSort();
    } else if (algorithm === 'selectionSort') {
      await selectionSort();
    } else if (algorithm === 'insertionSort') {
      await quickSort([...array], 0, array.length - 1);
    } else if (algorithm === 'mergeSort') {
      await mergeSort([...array], 0, array.length - 1);
    } else if (algorithm === 'quickSort') {
      await quickSort([...array], 0, array.length - 1);
    } else if (algorithm === 'radixSort') {
      await radixSort([...array]);
    }

    setSortingInProgress(false);
  };


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

  const quickSort = async () => {
    const newArray = [...array];
    await quickSortHelper(newArray, 0, newArray.length - 1);
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low < high) {
      const pivotIndex = await partition(arr, low, high);
      await quickSortHelper(arr, low, pivotIndex - 1);
      await quickSortHelper(arr, pivotIndex + 1, high);
      await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED));
    }
  };

  const partition = async (arr, low, high) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Adjusted delay for faster animation
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Adjusted delay for faster animation
    return i + 1;
  };

  // const bucketSort = async () => {
  //   const newArray = [...array];
  //   const n = newArray.length;

  //   let minValue = newArray[0].value;
  //   let maxValue = newArray[0].value;

  //   for (let i = 1; i < n; i++) {
  //     if (newArray[i].value < minValue) {
  //       minValue = newArray[i].value;
  //     }
  //     if (newArray[i].value > maxValue) {
  //       maxValue = newArray[i].value;
  //     }
  //   }

  //   const numBuckets = Math.floor(Math.sqrt(n));
  //   const bucketSize = (maxValue - minValue) / numBuckets + 1;
  //   const buckets = Array.from({ length: numBuckets }, () => []); // Initialize buckets as empty arrays

  //   for (let i = 0; i < n; i++) {
  //     const bucketIndex = Math.floor((newArray[i].value - minValue) / bucketSize);
  //     //console.log(newArray[i]);
  //     buckets[bucketIndex].push(newArray[i]);
  //   }

  //   let sortedArray = [];
  //   for (let i = 0; i < numBuckets; i++) {
  //     buckets[i].sort((a, b) => a.value - b.value);
  //     sortedArray = sortedArray.concat(buckets[i]);
  //     setArray(sortedArray);
  //     await new Promise((resolve) => setTimeout(resolve, mapSpeedToDelay(visualizationSpeed, "bucketSort")));
  //   }
  // };

  const radixSort = async () => {
    const newArray = [...array];
    const maxNum = Math.max(...newArray);
    const maxDigits = Math.floor(Math.log10(maxNum) + 1);

    for (let i = 0; i < maxDigits; i++) {
      await countingSort(newArray, i);
    }
  };

  const countingSort = async (arr, digitPlace) => {
    const countArray = new Array(10).fill(0);
    const outputArray = new Array(arr.length);

    // Counting phase
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], digitPlace);
      countArray[digit]++;
    }

    // Adjust count array
    for (let i = 1; i < countArray.length; i++) {
      countArray[i] += countArray[i - 1];
    }

    // Sorting phase
    for (let i = arr.length - 1; i >= 0; i--) {
      const digit = getDigit(arr[i], digitPlace);
      outputArray[countArray[digit] - 1] = arr[i];
      countArray[digit]--;
      setArray([...outputArray]);
      await new Promise((resolve) => setTimeout(resolve, MAX_VISUALIZATION_SPEED - visualizationSpeed + MIN_VISUALIZATION_SPEED));
    }
  };

  const getDigit = (num, digitPlace) => {
    return Math.floor(Math.abs(num) / Math.pow(10, digitPlace)) % 10;
  };

  return (
    <div>
      <NavBar
        generateRandomArray={generateRandomArray}
        startBubbleSort={bubbleSort}
        startSelectionSort={selectionSort}
        startInsertionSort={insertionSort}
        startMergeSort={mergeSort}
        startQuickSort={quickSort}
        startRadixSort={radixSort}
        arraySize={arraySize}
        setArraySize={setArraySize}
        visualizationSpeed={visualizationSpeed}
        setVisualizationSpeed={setVisualizationSpeed}
        sortingInProgress={sortingInProgress}
        handleStartVisualization={handleStartVisualization}
      />
      <div className="array-container">
        <ArrayBars array={array} />
      </div>
    </div>
  );
};

export default Visualizer;
