/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Login from './component/login';
import BillScreen from './component/Billscreen';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ImageUplaod from './component/imageupload';
import CompletedBills from './component/CompletedBill';
import HoldBills from './component/HoldBills';
import AddBuilding from './component/addBuilding';
import UpdateBillsofuser from './component/updaetBill';
import AllBuildings from './component/AllBuildings';
import HomeScreen from './component/HomeScreen';
import AuthenticateAdharCard from './component/AuthenticateAddharcard';
import Addtenate from './component/Addtenate';
import ListOfTenate from './component/listofTenate';
import VacantRooms from './component/allVacanatRooms';
import Allbills from './component/AllBills';
import PendingBills from './component/PendingBills';
import UpdateBuildings from './component/updateBuildings';
import UpdateTenate from './component/updateTenate';
import CenteredButton from './component/generateExcel';
import AddharForm from './component/addharCard';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={Addtenate} />
        <Stack.Screen name="MonthlyCharge" component={BillScreen} />
        <Stack.Screen name="CompletedBills" component={CompletedBills} />
        <Stack.Screen name="HoldBills" component={HoldBills} />
        <Stack.Screen name="addbuilding" component={AddBuilding} />
        <Stack.Screen name="UpdateBillsofuser" component={UpdateBillsofuser} />
        <Stack.Screen name="AllBuildings" component={AllBuildings} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Homeone" component={HomeScreen} />
        <Stack.Screen
          name="AadharCardCheck"
          component={AuthenticateAdharCard}
        />
        <Stack.Screen name="Addtenate" component={Addtenate} />
        <Stack.Screen name="listoftenate" component={ListOfTenate} />
        <Stack.Screen name="Allbills" component={Allbills} />
        <Stack.Screen name="AllVacantRooms" component={VacantRooms} />
        <Stack.Screen name="PendingBills" component={PendingBills} />
        <Stack.Screen
          name="SingleBuildingDetails"
          component={UpdateBuildings}
        />
        <Stack.Screen name="Profile" component={ListOfTenate} />
        <Stack.Screen name="UpdateTenate" component={UpdateTenate} />
        <Stack.Screen name="download" component={CenteredButton} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
