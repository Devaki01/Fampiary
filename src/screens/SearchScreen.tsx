import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Search as SearchIcon, MapPin, Briefcase, Users, X, Phone, MessageCircle } from 'lucide-react-native';
import { MOCK_MEMBERS, CITIES, PROFESSIONS, BRANCHES, Member } from '../data/mockData';

const FilterChip = ({ label, selected, onPress }: { label: string, selected: boolean, onPress: () => void }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`px-4 py-2 rounded-full mr-2 border ${selected ? 'bg-honey-500 border-honey-500' : 'bg-white border-gray-200'}`}
  >
    <Text className={`font-medium ${selected ? 'text-white' : 'text-gray-600'}`}>{label}</Text>
  </TouchableOpacity>
);

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = useMemo(() => {
    return MOCK_MEMBERS.filter(member => {
      const matchesQuery = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           member.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCity = selectedCity ? member.city === selectedCity : true;
      const matchesProfession = selectedProfession ? member.profession === selectedProfession : true;
      const matchesBranch = selectedBranch ? member.branch === selectedBranch : true;
      
      return matchesQuery && matchesCity && matchesProfession && matchesBranch;
    });
  }, [searchQuery, selectedCity, selectedProfession, selectedBranch]);

  const renderMemberCard = ({ item }: { item: Member }) => (
    <TouchableOpacity 
      onPress={() => setSelectedMember(item)}
      className="flex-row items-center p-4 mb-3 bg-white rounded-2xl shadow-sm border border-gray-100"
    >
      <Image source={{ uri: item.avatar }} className="w-14 h-14 rounded-full bg-honey-100 mr-4" />
      <View className="flex-1">
        <Text className="font-bold text-lg text-gray-900">{item.name}</Text>
        <Text className="text-honey-600 font-medium text-sm mb-1">{item.profession}</Text>
        <View className="flex-row items-center">
          <MapPin size={12} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 ml-1 mr-3">{item.city}</Text>
          <Users size={12} color="#9CA3AF" />
          <Text className="text-xs text-gray-500 ml-1">{item.branch} Side</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <View className="pt-16 pb-4 px-6 bg-white shadow-sm border-b border-gray-100 z-10">
        <Text className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">Cross-Pollinate</Text>
        
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 mb-4">
          <SearchIcon size={20} color="#9CA3AF" />
          <TextInput 
            className="flex-1 ml-2 text-base text-gray-800"
            placeholder="Search by name, skills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-2">
            <FilterChip label="All Cities" selected={!selectedCity} onPress={() => setSelectedCity(null)} />
            {CITIES.map(city => (
              <FilterChip key={city} label={city} selected={selectedCity === city} onPress={() => setSelectedCity(city)} />
            ))}
          </ScrollView>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <FilterChip label="All Professions" selected={!selectedProfession} onPress={() => setSelectedProfession(null)} />
            {PROFESSIONS.map(prof => (
              <FilterChip key={prof} label={prof} selected={selectedProfession === prof} onPress={() => setSelectedProfession(prof)} />
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        data={filteredMembers}
        keyExtractor={item => item.id}
        renderItem={renderMemberCard}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <Text className="text-gray-400 text-lg">No members found.</Text>
          </View>
        }
      />

      {/* Detail Modal */}
      <Modal visible={!!selectedMember} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="bg-white rounded-t-3xl p-6 h-3/4 shadow-lg">
            <View className="flex-row justify-between items-start mb-6">
              <View className="w-10 h-1" /> {/* Spacer for centering */}
              <View className="w-16 h-1 bg-gray-300 rounded-full" />
              <TouchableOpacity onPress={() => setSelectedMember(null)} className="bg-gray-100 p-2 rounded-full">
                <X size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {selectedMember && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center mb-6">
                  <Image source={{ uri: selectedMember.avatar }} className="w-32 h-32 rounded-full bg-honey-100 mb-4 border-4 border-honey-50" />
                  <Text className="text-3xl font-bold text-gray-900">{selectedMember.name}</Text>
                  <Text className="text-honey-600 text-lg font-medium mt-1">{selectedMember.relation}</Text>
                </View>

                <View className="flex-row justify-center space-x-4 mb-8">
                  <TouchableOpacity className="bg-honey-500 flex-row items-center px-6 py-3 rounded-2xl mx-2">
                    <MessageCircle color="white" size={20} />
                    <Text className="text-white font-bold ml-2">WhatsApp</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-gray-100 flex-row items-center px-6 py-3 rounded-2xl mx-2">
                    <Phone color="#4B5563" size={20} />
                    <Text className="text-gray-700 font-bold ml-2">Call</Text>
                  </TouchableOpacity>
                </View>

                <View className="bg-gray-50 rounded-2xl p-5 mb-4">
                  <Text className="text-gray-500 text-xs font-bold uppercase mb-3">Location & Work</Text>
                  
                  <View className="flex-row items-center mb-4">
                    <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mr-3">
                      <MapPin size={20} color="#F59E0B" />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-bold text-base">{selectedMember.city}</Text>
                      <Text className="text-gray-500 text-sm">Current City</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm mr-3">
                      <Briefcase size={20} color="#F59E0B" />
                    </View>
                    <View>
                      <Text className="text-gray-900 font-bold text-base">{selectedMember.profession}</Text>
                      <Text className="text-gray-500 text-sm">Profession</Text>
                    </View>
                  </View>
                </View>

                <View className="bg-gray-50 rounded-2xl p-5 mb-10">
                  <Text className="text-gray-500 text-xs font-bold uppercase mb-3">Skills & Interests</Text>
                  <View className="flex-row flex-wrap">
                    {selectedMember.skills.map((skill, index) => (
                      <View key={index} className="bg-white border border-honey-100 px-3 py-1.5 rounded-full mr-2 mb-2 shadow-sm">
                        <Text className="text-honey-900 font-medium">{skill}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
