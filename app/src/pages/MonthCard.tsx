import data from './data.json';
import DayCard from "./DayCard";

const MonthCard: React.FC = () => {
  
    return (
        <div style={styles.layout}>
            <div style={styles.sundayHeader}>Sunday</div>
            <div style={styles.mondayHeader}>Monday</div>
            <div style={styles.tuesdayHeader}>Tuesday</div>
            <div style={styles.wednesdayHeader}>Wednesday</div>
            <div style={styles.thursdayHeader}>Thursday</div>
            <div style={styles.fridayHeader}>Friday</div>
            <div style={styles.saturdayHeader}>Saturday</div>
            {data.map((singleDayData, key) => {
                return (
                    <DayCard key={key} date={singleDayData.date} noteData={singleDayData.noteData} />
                );
            })}
        </div>
    );
}
  
export default MonthCard;
  
const styles = {
    layout: {
        display: 'grid',
        grid:
          `"saturdayHeader mondayHeader tuesdayHeader wednesdayHeader thursdayHeader fridayHeader sundayHeader" 0.25fr
          "day1 day2 day3 day4 day5 day6 day7"                                                                  1fr
          "day8 day9 day10 day11 day12 day13 day14"                                                             1fr
          "day15 day16 day17 day18 day19 day20 day21"                                                           1fr
          "day22 day23 day24 day25 day26 day27 day28"                                                           1fr
          "day29 day30 day31 day32 day33 day34 day35"                                                           1fr
          / 1fr 1fr 1fr 1fr 1fr 1fr 1fr`,
        width: '750px'
    } as React.CSSProperties,
    sundayHeader:       { gridArea: 'sundayHeader', textAlign: 'center' } as React.CSSProperties,
    mondayHeader:       { gridArea: 'mondayHeader', textAlign: 'center' } as React.CSSProperties,
    tuesdayHeader:      { gridArea: 'tuesdayHeader', textAlign: 'center' } as React.CSSProperties,
    wednesdayHeader:    { gridArea: 'wednesdayHeader', textAlign: 'center' } as React.CSSProperties,
    thursdayHeader:     { gridArea: 'thursdayHeader', textAlign: 'center' } as React.CSSProperties,
    fridayHeader:       { gridArea: 'fridayHeader', textAlign: 'center' } as React.CSSProperties,
    saturdayHeader:     { gridArea: 'saturdayHeader', textAlign: 'center' } as React.CSSProperties,
    day1:   { gridArea: 'day1' } as React.CSSProperties,
    day2:   { gridArea: 'day2' } as React.CSSProperties,
    day3:   { gridArea: 'day3' } as React.CSSProperties,
    day4:   { gridArea: 'day4' } as React.CSSProperties,
    day5:   { gridArea: 'day5' } as React.CSSProperties,
    day6:   { gridArea: 'day6' } as React.CSSProperties,
    day7:   { gridArea: 'day7' } as React.CSSProperties,
    day8:   { gridArea: 'day8' } as React.CSSProperties,
    day9:   { gridArea: 'day9' } as React.CSSProperties,
    day10:  { gridArea: 'day10' } as React.CSSProperties,
    day11:  { gridArea: 'day11' } as React.CSSProperties,
    day12:  { gridArea: 'day12' } as React.CSSProperties,
    day13:  { gridArea: 'day13' } as React.CSSProperties,
    day14:  { gridArea: 'day14' } as React.CSSProperties,
    day15:  { gridArea: 'day15' } as React.CSSProperties,
    day16:  { gridArea: 'day16' } as React.CSSProperties,
    day17:  { gridArea: 'day17' } as React.CSSProperties,
    day18:  { gridArea: 'day18' } as React.CSSProperties,
    day19:  { gridArea: 'day19' } as React.CSSProperties,
    day20:  { gridArea: 'day20' } as React.CSSProperties,
    day21:  { gridArea: 'day21' } as React.CSSProperties,
    day22:  { gridArea: 'day22' } as React.CSSProperties,
    day23:  { gridArea: 'day23' } as React.CSSProperties,
    day24:  { gridArea: 'day24' } as React.CSSProperties,
    day25:  { gridArea: 'day25' } as React.CSSProperties,
    day26:  { gridArea: 'day26' } as React.CSSProperties,
    day27:  { gridArea: 'day27' } as React.CSSProperties,
    day28:  { gridArea: 'day28' } as React.CSSProperties,
    day29:  { gridArea: 'day29' } as React.CSSProperties,
    day30:  { gridArea: 'day30' } as React.CSSProperties,
    day31:  { gridArea: 'day31' } as React.CSSProperties,
    day32:  { gridArea: 'day32' } as React.CSSProperties,
    day33:  { gridArea: 'day33' } as React.CSSProperties,
    day34:  { gridArea: 'day34' } as React.CSSProperties,
    day35:  { gridArea: 'day35' }
}