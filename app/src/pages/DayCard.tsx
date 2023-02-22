const data =
[{
    "time": "5:15 PM"
  }, {
    "time": "11:10 PM"
  }, {
    "time": "11:14 AM"
  }, {
    "time": "4:43 AM"
  }, {
    "time": "12:53 AM"
}]

const DayCard: React.FC = () => {
    let time = new Date('February 21, 2023 11:20:09 PM')

    console.log(time)

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>This is header</h1>
        </div>
    );
}

export default DayCard;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        border: '5px solid red'
    } as React.CSSProperties,
    header: {
        height: 'fit-content',
        margin: 0,
        padding: 0,
        border: '5px solid blue',
    } as React.CSSProperties
}