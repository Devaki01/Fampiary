import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Camera, Edit2, Check, MapPin, Briefcase, Phone as PhoneIcon } from 'lucide-react-native';
import { useStore } from '../store/useStore';

const MOCK_ARCHIVE_IMAGES = [
  'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544427920-c49ccf18c8cb?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1505935428862-770b6f24f629?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=200&auto=format&fit=crop',
];

export default function ProfileScreen() {
  const { currentUser, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  
  const [city, setCity] = useState(currentUser.city);
  const [profession, setProfession] = useState(currentUser.profession);
  const [phone, setPhone] = useState('+91 98765 43210'); // Mock initial phone
  const [skillsStr, setSkillsStr] = useState(currentUser.skills.join(', '));

  const handleSave = () => {
    updateProfile({
      city,
      profession,
      skills: skillsStr.split(',').map(s => s.trim()).filter(s => s.length > 0)
    });
    setIsEditing(false);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#FAFAFA]"
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header & Avatar */}
        <View className="bg-honey-500 pt-16 pb-8 px-6 rounded-b-[40px] items-center relative shadow-md">
          <View className="absolute top-16 right-6">
            {isEditing ? (
              <TouchableOpacity onPress={handleSave} className="bg-white/30 p-2 rounded-full flex-row items-center">
                <Check color="white" size={18} />
                <Text className="text-white font-bold ml-1">Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setIsEditing(true)} className="bg-white/30 p-2 rounded-full flex-row items-center">
                <Edit2 color="white" size={18} />
                <Text className="text-white font-bold ml-1">Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="relative mb-4">
            <Image 
              source={{ uri: currentUser.avatar }} 
              className="w-28 h-28 rounded-full border-4 border-white bg-honey-100"
            />
            {isEditing && (
              <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-900 p-2 rounded-full border-2 border-white">
                <Camera size={16} color="white" />
              </TouchableOpacity>
            )}
          </View>

          <Text className="text-2xl font-extrabold text-white">{currentUser.name}</Text>
          <Text className="text-honey-100 font-medium">{currentUser.branch} Branch • Gen {currentUser.generation}</Text>
        </View>

        <View className="p-6">
          {/* Details Form */}
          <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6">
            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Personal Info</Text>
            
            <View className="mb-4">
              <View className="flex-row items-center mb-1">
                <MapPin size={14} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm ml-1 font-medium">Current City</Text>
              </View>
              {isEditing ? (
                <TextInput 
                  value={city} onChangeText={setCity} 
                  className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-900 font-medium"
                />
              ) : (
                <Text className="text-gray-900 font-bold text-base pl-5">{currentUser.city}</Text>
              )}
            </View>

            <View className="mb-4">
              <View className="flex-row items-center mb-1">
                <PhoneIcon size={14} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm ml-1 font-medium">Phone Number</Text>
              </View>
              {isEditing ? (
                <TextInput 
                  value={phone} onChangeText={setPhone} keyboardType="phone-pad"
                  className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-900 font-medium"
                />
              ) : (
                <Text className="text-gray-900 font-bold text-base pl-5">{phone}</Text>
              )}
            </View>

            <View className="mb-4">
              <View className="flex-row items-center mb-1">
                <Briefcase size={14} color="#9CA3AF" />
                <Text className="text-gray-500 text-sm ml-1 font-medium">Profession</Text>
              </View>
              {isEditing ? (
                <TextInput 
                  value={profession} onChangeText={setProfession} 
                  className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-900 font-medium"
                />
              ) : (
                <Text className="text-gray-900 font-bold text-base pl-5">{currentUser.profession}</Text>
              )}
            </View>

            <View>
              <View className="flex-row items-center mb-2">
                <Text className="text-gray-500 text-sm font-medium">Skills & Tags</Text>
              </View>
              {isEditing ? (
                <TextInput 
                  value={skillsStr} onChangeText={setSkillsStr} 
                  placeholder="Comma separated..."
                  className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-900 font-medium"
                />
              ) : (
                <View className="flex-row flex-wrap">
                  {currentUser.skills.map((skill, index) => (
                    <View key={index} className="bg-honey-50 px-3 py-1.5 rounded-full mr-2 mb-2 border border-honey-100">
                      <Text className="text-honey-900 font-medium text-sm">{skill}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Honeycomb Archive */}
          <Text className="text-xl font-bold text-gray-900 mb-4 ml-1">The Archive</Text>
          <View className="flex-row flex-wrap justify-between">
            {MOCK_ARCHIVE_IMAGES.map((uri, index) => (
              <TouchableOpacity key={index} className="w-[31%] aspect-square mb-3">
                <Image 
                  source={{ uri }} 
                  className="w-full h-full rounded-2xl bg-gray-200"
                />
              </TouchableOpacity>
            ))}
            <TouchableOpacity className="w-[31%] aspect-square mb-3 bg-honey-100 rounded-2xl items-center justify-center border-2 border-dashed border-honey-300">
              <Camera size={24} color="#D97706" />
              <Text className="text-honey-900 text-xs font-bold mt-1">Upload</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
