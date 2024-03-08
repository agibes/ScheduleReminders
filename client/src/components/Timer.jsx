import React, {useEffect} from 'react';
import {dragElement} from '../utils';

const timer = () => {

  useEffect(() => {
    try {
      const widgets = document.getElementsByClassName("widget");
      for (var i = 0; i < widgets.length; i++) {
        dragElement(widgets.item(i));
     }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const startTimer = () => {
    let minutes = document.getElementById('minutes');
    let seconds = document.getElementById('seconds');

    let totalTime = parseInt(minutes.innerHTML) * 60 + parseInt(seconds.innerHTML);

    function updateTime() {
      totalTime--;
      let minutesRemaining = Math.floor(totalTime/60);
      let secondsRemaining = Math.floor(totalTime%60);
      if (secondsRemaining < 10)  {
        seconds.innerHTML = `0${secondsRemaining}`;
      } else {
        seconds.innerHTML = secondsRemaining;
      }
      minutes.innerHTML = minutesRemaining;

      if (minutesRemaining == 0 && secondsRemaining == 0) {
        clearInterval(interval);
      }
    }

    let interval = setInterval(updateTime, 1000);
  }

  return (
  <>
    <div id="timerHeader" className="widgetHeader"></div>
    <div id="timerComponent" className="component">
      <div id="time">
        <span id="minutes">25</span>
        <span id="colon">:</span>
        <span id="seconds">00</span>
      </div>
      <button onClick={()=>startTimer()}>Start</button>
    </div>
  </>
  );
};


export default timer;