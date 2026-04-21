import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, TextInput, Modal, Alert } from 'react-native';
import { Radio, MapPin, Shield, Clock, Send, X } from 'lucide-react-native';
import { useStore } from '../store/useStore';
import { MOCK_MEMBERS } from '../data/mockData';

export default function SwarmScreen() {
  const { activeSignals, addSignal, privacyMode, togglePrivacyMode, currentUser } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [signalMessage, setSignalMessage] = useState('');
  const [signalCity, setSignalCity] = useState(currentUser.city);

  const handleTriggerSignal = () => {
    if (!signalMessage.trim()) {
      Alert.alert('Error', 'Please enter a message for your swarm signal.');
      return;
    }
    
    addSignal({
      memberId: currentUser.id,
      message: signalMessage,
      city: signalCity,
      active: true,
    });
    
    setSignalMessage('');
    setModalVisible(false);
  };

  const getMemberName = (id: string) => {
    return MOCK_MEMBERS.find(m => m.id === id)?.name || 'Unknown Member';
  };

  const renderSignal = ({ item }: { item: any }) => (
    <View className="bg-white p-5 rounded-3xl mb-4 shadow-sm border border-honey-100 ml-4 border-l-4 border-l-honey-500">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="font-bold text-gray-900 text-base">{getMemberName(item.memberId)}</Text>
        <View className="flex-row items-center">
          <Clock size={12} color="#9CA3AF" />
          <Text className="text-xs text-gray-400 ml-1">{item.timestamp}</Text>
        </View>
      </View>
      
      <Text className="text-gray-700 leading-5 mb-4">{item.message}</Text>
      
      <View className="flex-row justify-between items-center mt-2 pt-3 border-t border-gray-100">
        <View className="flex-row items-center">
          <MapPin size={14} color="#F59E0B" />
          <Text className="text-sm font-bold text-honey-600 ml-1">{item.city}</Text>
        </View>
        <TouchableOpacity className="bg-honey-100 px-4 py-1.5 rounded-full">
          <Text className="text-honey-900 font-bold text-sm">Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="pt-16 pb-6 px-6 bg-white shadow-sm border-b border-gray-100 z-10">
        <View className="flex-row justify-between items-end">
          <View>
            <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">Swarm Signals</Text>
            <Text className="text-gray-500 mt-1">Location-based alerts & travel</Text>
          </View>
          <View className="bg-honey-100 p-3 rounded-full">
            <Radio size={24} color="#D97706" />
          </View>
        </View>
      </View>

      <View className="p-6">
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          className="bg-honey-500 rounded-3xl p-6 shadow-md mb-6 items-center flex-row justify-center"
        >
          <Radio color="white" size={24} className="mr-3" />
          <Text className="text-white font-extrabold text-xl">Trigger Swarm Signal</Text>
        </TouchableOpacity>

        <View className="bg-white rounded-2xl p-4 flex-row justify-between items-center shadow-sm border border-gray-100 mb-6">
          <View className="flex-row items-center flex-1 pr-4">
            <View className="bg-gray-100 p-2 rounded-full mr-3">
              <Shield size={20} color={privacyMode ? "#10B981" : "#9CA3AF"} />
            </View>
            <View>
              <Text className="font-bold text-gray-900">Privacy Mode</Text>
              <Text className="text-gray-500 text-xs">Hide live location from extended family</Text>
            </View>
          </View>
          <Switch 
            value={privacyMode} 
            onValueChange={togglePrivacyMode}
            trackColor={{ false: '#E5E7EB', true: '#34D399' }}
            thumbColor={'#ffffff'}
          />
        </View>

        <Text className="font-bold text-lg text-gray-900 mb-4 ml-1">Active Signals</Text>
        <FlatList
          data={activeSignals}
          keyExtractor={item => item.id}
          renderItem={renderSignal}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 300 }}
        />
      </View>

      {/* Signal Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 shadow-lg">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold text-gray-900">New Swarm Signal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} className="bg-gray-100 p-2 rounded-full">
                <X size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>
            
            <View className="mb-4">
              <Text className="text-sm font-bold text-gray-700 mb-2">Location</Text>
              <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
                <MapPin size={20} color="#9CA3AF" />
                <TextInput 
                  className="flex-1 ml-2 text-base text-gray-800"
                  value={signalCity}
                  onChangeText={setSignalCity}
                  placeholder="e.g. Pune"
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-sm font-bold text-gray-700 mb-2">Message</Text>
              <View className="bg-gray-100 rounded-2xl px-4 py-3 h-32">
                <TextInput 
                  className="flex-1 text-base text-gray-800"
                  value={signalMessage}
                  onChangeText={setSignalMessage}
                  placeholder="e.g. I'm visiting for 3 days!"
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>

            <TouchableOpacity 
              onPress={handleTriggerSignal}
              className="bg-honey-500 flex-row items-center justify-center p-4 rounded-2xl"
            >
              <Send color="white" size={20} className="mr-2" />
              <Text className="text-white font-bold text-lg">Broadcast Signal</Text>
            </TouchableOpacity>
            <View className="h-10" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
