import React, { useState, useEffect } from "react";

const StopWatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [stopTimer, setStopTimer] = useState(false);

  const onResetClick = () => {
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  const onStopClick = () => {
    setStopTimer(!stopTimer);
  };

  const handleStopWatch = () => {
    if (stopTimer) return;

    setSeconds((prevSeconds) => {
      if (prevSeconds === 59) {
        setMinutes((prevMinutes) => {
          if (prevMinutes === 59) {
            setHours((prevHours) => prevHours + 1);
            return 0;
          } else {
            return prevMinutes + 1;
          }
        });
        return 0;
      } else {
        return prevSeconds + 1;
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(handleStopWatch, 1000);

    return () => clearInterval(intervalId);
  }, [stopTimer]);

  return (
    <>
      {/* StopWatch Buttons Area */}
      <div>
        <button onClick={onStopClick}>{stopTimer ? "Start" : "Stop"}</button>
        <button onClick={onResetClick}>Reset</button>
      </div>

      {/* Stopwatch Timer Area */}
      <div class="flex items-start justify-center w-full gap-4 count-down-main">
        <div class="timer w-16">
          <div class=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden">
            <h3 class="countdown-element hours font-Cormorant font-semibold text-2xl text-white text-center">
              {hours.toString().padStart(2, "0")}
            </h3>
          </div>
          <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
            hours
          </p>
        </div>
        <h3 class="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <div class="timer w-16">
          <div class=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden">
            <h3 class="countdown-element minutes font-Cormorant font-semibold text-2xl text-white text-center">
              {minutes.toString().padStart(2, "0")}
            </h3>
          </div>
          <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
            minutes
          </p>
        </div>
        <h3 class="font-manrope font-semibold text-2xl text-gray-900">:</h3>
        <div class="timer w-16">
          <div class=" bg-indigo-600 py-4 px-2 rounded-lg overflow-hidden ">
            <h3 class="countdown-element seconds font-Cormorant font-semibold text-2xl text-white text-center animate-countinsecond">
              {seconds.toString().padStart(2, "0")}
            </h3>
          </div>
          <p class="text-lg font-Cormorant font-normal text-gray-900 mt-1 text-center w-full">
            seconds
          </p>
        </div>
      </div>
    </>
  );
};

export default StopWatch;
