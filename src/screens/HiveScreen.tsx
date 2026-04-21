import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';
import { MOCK_MEMBERS, BRANCHES, Member } from '../data/mockData';
import { MapPin, ChevronDown, ChevronRight } from 'lucide-react-native';

const MemberCard = ({ member }: { member: Member }) => {
  return (
    <View className="flex-row items-center p-3 mb-2 bg-white rounded-2xl shadow-sm border border-honey-100 ml-4">
      <Image 
        source={{ uri: member.avatar }} 
        className="w-12 h-12 rounded-full mr-4 bg-honey-100"
      />
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="font-bold text-base text-gray-800">{member.name}</Text>
          <View className="bg-honey-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-honey-900 font-medium">{member.relation}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center mt-1">
          <MapPin size={12} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 ml-1">{member.city}</Text>
          <Text className="text-xs text-gray-400 mx-2">•</Text>
          <Text className="text-xs text-gray-500">{member.profession}</Text>
        </View>
      </View>
    </View>
  );
};

const BranchSection = ({ branchName }: { branchName: string }) => {
  const [expanded, setExpanded] = useState(false);
  const heightValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  const members = MOCK_MEMBERS.filter(m => m.branch === branchName);

  const toggleExpand = () => {
    setExpanded(!expanded);
    heightValue.value = withTiming(!expanded ? members.length * 80 + 20 : 0, { duration: 300 });
    opacityValue.value = withTiming(!expanded ? 1 : 0, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: expanded ? 'auto' : 0,
      opacity: opacityValue.value,
      overflow: 'hidden',
    };
  });

  return (
    <View className="mb-4">
      <TouchableOpacity 
        onPress={toggleExpand}
        className="flex-row items-center justify-between p-4 bg-honey-500 rounded-2xl shadow-sm"
      >
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-3">
            <Text className="text-white font-bold text-lg">{branchName[0]}</Text>
          </View>
          <View>
            <Text className="font-bold text-lg text-white">{branchName} Side</Text>
            <Text className="text-honey-100 text-sm">{members.length} Members</Text>
          </View>
        </View>
        {expanded ? <ChevronDown color="white" /> : <ChevronRight color="white" />}
      </TouchableOpacity>

      <Animated.View style={animatedStyle}>
        <View className="pt-3">
          {members.map(member => (
            <MemberCard key={member.id} member={member} />
          ))}
        </View>
      </Animated.View>
    </View>
  );
};

export default function HiveScreen() {
  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="pt-16 pb-6 px-6 bg-white shadow-sm border-b border-gray-100 z-10">
        <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">The Hive</Text>
        <Text className="text-gray-500 mt-1">Explore your family clusters</Text>
      </View>
      
      <FlatList
        data={BRANCHES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <BranchSection branchName={item} />}
        contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
