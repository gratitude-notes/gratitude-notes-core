import React, { useRef } from 'react';
import { BsFillCalendarWeekFill } from 'react-icons/bs';
import { ComponentVisbilityProps } from '../../hooks/useComponentVisible';
import { useState, useEffect } from "react";
import { ViewState } from '../../pages/Dashboard';

type NotificationState = {
  updateViewState: (state: ViewState) => void
}

const Streaks: React.FC = () => {
  const [show, setShow] = useState(false);
  const today = new Date();


  return (
    <>
        <div className="content-center items-center text-center">
          <h2 className="content-center items-center text-center">Streaks</h2>
          <div className="content-center items-center text-center">
            <span role="img" aria-label="fire emoji" className='text-6xl content-center items-center text-center'>🔥</span>
            <p>5 days</p>
          </div>
        </div>
    </>
  );
};

export default Streaks;