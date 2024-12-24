import {useState,useEffect} from 'react'
import {View,Text} from 'react-native'
import styles from './date.styles'

const DateComponent = () => {
   const [currentDateTime, setCurrentDateTime] = useState('');

  const getFormattedDateTime = () => {
    const date = new Date();
    const day = date.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const time = date.toLocaleTimeString();

    // Add ordinal suffix to the day
    const suffix =
      day % 10 === 1 && day !== 11
        ? 'st'
        : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
        ? 'rd'
        : 'th';

    return `${day}${suffix} ${month}, ${year} ${time}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
     <View style={styles.cont}>
         <Text style={styles.dates}>{currentDateTime}</Text>
   </View>
  )
}

export default DateComponent