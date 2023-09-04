import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

const MyActionSheetScreen = () => {
  const [selectedDay, setSelectedDay] = useState('');
  const [time, setTime] = useState('');

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const renderDayButtons = () => {
    return daysOfWeek.map((day, index) => (
      <TouchableOpacity
        key={index}
        style={styles.dayButton}
        onPress={() => setSelectedDay(day)}>
        <View style={styles.circle}>
          <Text style={styles.dayText}>{day.charAt(0)}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Select a day:</Text>
      <View style={styles.daysContainer}>{renderDayButtons()}</View>
      <Text>Enter a time:</Text>
      <TextInput
        style={styles.input}
        placeholder="HH:MM AM/PM"
        onChangeText={setTime}
        value={time}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
};

export default MyActionSheetScreen;
