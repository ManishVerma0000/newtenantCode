import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import api from '../api/api';

const BillScreen = () => {
  const [pendingBill, setPendingBillcharge] = useState('');
  const [completedTotal, setcompletedTotal] = useState('');

  useEffect(() => {
    api
      .get('/caluclatedrent')
      .then(res => {
        console.log(res.data.pendingTotal);
        setPendingBillcharge(res.data.pendingTotal);
        setcompletedTotal(res.data.completedTotal);
      })
      .catch(Err => {
        console.log(Err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Completed Bill</Text>
        <Text style={styles.amount}>{completedTotal}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Pending Bill</Text>
        <Text style={styles.amount}>{pendingBill}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    marginVertical: 10,
    padding: 20,
    backgroundColor: '#d1ebe5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  amount: {
    fontSize: 16,
    color: 'black',
  },
});

export default BillScreen;
