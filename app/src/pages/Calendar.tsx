import { useEffect, useState } from "react";
import styled from "styled-components";
import { data } from "./data";

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    height: 100%;
    border: 5px solid black;
    align-items: center;
    justify-content: center;
`

const CalendarHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: 5%;
    justify-content: space-between;
    border: 5px solid red;
`

const MonthCalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 95%;
    overflow-y: hidden;
    border: 5px solid blue;
`

const WeekCalendarContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border: 5px solid yellow;
`

const DayCalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border: 5px solid purple;
`

const DayCardHeaderContainer = styled.div`
    display: flex;
    width: 100%;
    height: 25%;
    border: 5px solid pink;
`

const DayCardHeaderText = styled.h1`
    margin: 0;
    margin-left: 5px;
    padding: 0;
    font-size: 12px;
`

const DayCardFlexGridContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    gap: 1px 1px;
    border: 5px solid green;
`

const DayCardFlexGridRowContainer = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    border: 1px solid black;
`

const DayCardFlexGridColContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 1px 1px;
`

const DayCardFlexGridItem = styled.div`
    flex: 1;
    width: 100%;
    height: 100%;
    border: 1px solid black;
`

const CalendarHeader = (props: any) => {
    return (
        <CalendarHeaderContainer>
            <span>Sunday</span>
            <span>Monday</span>
            <span>Tuesday</span>
            <span>Wednesday</span>
            <span>Thursday</span>
            <span>Friday</span>
            <span>Saturday</span>
        </CalendarHeaderContainer>
    );
}

const MonthCalendar = (props: any) => {

    return (
        <MonthCalendarContainer>
            {data.map((weekData, key) => {
                return (
                    <WeekCalendar key={key} weekData={weekData}/>
                );
            })}
        </MonthCalendarContainer>
    );
}

const WeekCalendar = (props: any) => {

    return (
        <WeekCalendarContainer>
            {props.weekData.map((dayData: any, key: any) => {
                return (
                    <DayCalendar key={key} dayData={dayData}/>
                );
            })}
        </WeekCalendarContainer>
    );
}

const DayCalendar = (props: any) => {
    return (
        <DayCalendarContainer>
            <DayCardHeader date={props.dayData.date}/>

            <DayCardGrid dayData={props.dayData}/>
        </DayCalendarContainer>
    );
}

const DayCardHeader = (props: any) => {
    const date = props.date.split("/");
    const day = date[1];

    return (
        <DayCardHeaderContainer>
            <DayCardHeaderText>{day}</DayCardHeaderText>
        </DayCardHeaderContainer>
    );
}

const DayCardGrid = (props: any) => {

    // const [time, setTime] = useState(props.dayData.time);
    // const [score, setScore] = useState(props.dayData.score);

    // You have 35 day cards of data here, even if there is no data on a given day
    let time = null
    let score = null
    let scoreColor = 'white'

    if (props.dayData.time != null && props.dayData.score != null) {
        const mTime = props.dayData.time.split("");
        if (mTime[0] === '0') {
            time = mTime[1];
        } else {
            time = mTime[0].concat(mTime[1]);
        }
        score = props.dayData.score;

        if (score >= -5 && score <= -3) {
            scoreColor = 'red'
        } else if (score >= -2 && score <= 2) {
            scoreColor = 'yellow'
        } else if (score >= 3 && score <= 5) {
            scoreColor = 'green'
        }
    }

    return (
        <DayCardFlexGridContainer>
            <DayCardFlexGridRow rowKey={5} time={time} score={score} scoreColor={scoreColor} />  {/* 5 score */}
            <DayCardFlexGridRow rowKey={4} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={3} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={2} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={1} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={0} time={time} score={score} scoreColor={scoreColor} />  {/* 0 score */}
            <DayCardFlexGridRow rowKey={-1} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={-2} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={-3} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={-4} time={time} score={score} scoreColor={scoreColor} />
            <DayCardFlexGridRow rowKey={-5} time={time} score={score} scoreColor={scoreColor} />  {/* -5 score */}
        </DayCardFlexGridContainer>
    );
}

const DayCardFlexGridRow = (props: any) => {

    // Right now we have 11 rows of data
    const rowKey = props.rowKey
    const time = props.time
    const score = props.score
    const scoreColor = props.scoreColor
    
    return (
        <DayCardFlexGridRowContainer>
            <DayCardFlexGridCol />
        </DayCardFlexGridRowContainer>
    );
}

const DayCardFlexGridCol = (props: any) => {
    const isActive = false

    return (
        <DayCardFlexGridColContainer>
            <DayCardFlexGridItem key={0} /> {/* 0000 */}
            <DayCardFlexGridItem key={1} />
            <DayCardFlexGridItem key={2} />
            <DayCardFlexGridItem key={3} />
            <DayCardFlexGridItem key={4} />
            <DayCardFlexGridItem key={5} /> {/* 0500 */}

            <DayCardFlexGridItem key={6} /> {/* 0600 */}
            <DayCardFlexGridItem key={7} />
            <DayCardFlexGridItem key={8} />
            <DayCardFlexGridItem key={9} />
            <DayCardFlexGridItem key={10} />
            <DayCardFlexGridItem key={11} /> {/* 1100 */}

            <DayCardFlexGridItem key={12} /> {/* 1200 */}
            <DayCardFlexGridItem key={13} />
            <DayCardFlexGridItem key={14} />
            <DayCardFlexGridItem key={15} />
            <DayCardFlexGridItem key={16} />
            <DayCardFlexGridItem key={17} /> {/* 1700 */}

            <DayCardFlexGridItem key={18} /> {/* 1800 */}
            <DayCardFlexGridItem key={19} />
            <DayCardFlexGridItem key={20} />
            <DayCardFlexGridItem key={21} />
            <DayCardFlexGridItem key={22} />
            <DayCardFlexGridItem key={23} /> {/* 2300 */}
        </DayCardFlexGridColContainer>
    );
}

const Calendar = () => {

    return (
        <CalendarContainer>
            <CalendarHeader />

            <MonthCalendar />
        </CalendarContainer>
    );
}

export default Calendar;