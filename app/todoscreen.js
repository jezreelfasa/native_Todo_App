import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, SafeAreaView, StatusBar, Image, ScrollView, FlatList } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { COLORS, icons, SHADOWS, SIZES } from '../constants/';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style/Styles';
import ProfileScreen from '../components/user/Profile';
import { logOut } from '../services/services';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TodoScreen = () => {
  const router = useRouter();
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [userName, setUserName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  
  const handleClose = () => {
    setIsClicked(false);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      Alert.alert(`Signed out successfully`);
      router.push(`/login`)
    } catch (error) {
      Alert.alert('Something went wrong', error.message);
    }
  };

  const user = () => {
    if (!userName) {
      return <Text>Hello Stranger! Welcome to Todo-App</Text>;
    } else {
      return <Text>Hello {userName}! You are awesome 🥰</Text>;
    }
  };

  const addTask = () => {
    if (task.trim().length < 3) {
      Alert.alert(`Sorry ${userName}`, 'Task cannot be less than 3 characters!');
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text: task,
        completed: false,
      },
    ]);
    setTask('');
  };

  const toggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id == id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTask = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim().length < 3) {
      Alert.alert('Error', 'Task cannot be less than 3 characters!');
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    setEditingId(null);
    setEditText('');
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
      <StatusBar backgroundColor={COLORS.lightWhite} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header Section */}
      <View
        style={{
          marginTop:20,
          backgroundColor: 'whitesmoke',
          padding: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          ...SHADOWS.medium,
          zIndex: 2,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={() => (router.canGoBack() ? router.back() : router.push('/home'))}
        >
          <Image source={icons.left} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <Text style={styles.profile}>
          <ProfileScreen />
        </Text>

        <View>
          <TouchableOpacity
            onPress={handleClick}
            style={{
              position: 'absolute',
              right: 15,
              top: -15,
             
            }}
          >
            <MaterialIcons name="more-vert" size={30} color="black" />
          </TouchableOpacity>
          {isClicked && (
            <View
              style={{
                position: 'absolute',
                top: 30,
                right: 0,
                backgroundColor: COLORS.white,
                borderRadius: 10,
                padding: 10,
                ...SHADOWS.medium,
                width: 180,
                zIndex: 2,
                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={handleClose}>
                <MaterialIcons name="close" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`https://github.com/jezreelfasa?tab=repositories`)}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
              >
                <MaterialCommunityIcons name="github" size={30} color="black" />
                <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>GitHub</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push(`https://www.linkedin.com/in/emmanuel-odubu-799351168/`)}
                style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
              >
                <MaterialCommunityIcons name="linkedin" size={30} color="#3b5998" />
                <Text style={{ marginLeft: 10, color: '#3b5998', fontWeight: 'bold' }}>LinkedIn</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: COLORS.tertiary,
                  borderRadius: 50,
                  padding: 7,
                  alignItems: 'center',
                }}
                onPress={handleSignOut}
              >
                <Text style={{ color: 'white', fontWeight: '900', fontSize: 12 }}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* User Name and Input Section */}
      <View style={{ zIndex: 1 }}>
        <Text style={styles.mix}>{user()}</Text>

        <TextInput
          placeholder="Enter a username"
          value={userName}
          onChangeText={(text) => setUserName(text)}
          style={styles.holder}
        />
      </View>

      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 1,
        }}
      >
        <TextInput
          placeholder="Add a new task"
          value={task}
          onChangeText={(text) => setTask(text)}
          style={{
            borderWidth: 2,
            borderColor: COLORS.primary,
            padding: 10,
            borderRadius: 5,
            width: '80%',
            zIndex: 1,
          }}
        />
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={addTask}>
          <Ionicons name="add" size={30} color="green" style={styles.icons} />
        </TouchableOpacity>
      </View>

      {/* Scrollable List of Todos */}
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                ...SHADOWS.large,
                backgroundColor: COLORS.white,
                marginBottom: 10,
                borderRadius: SIZES.medium,
              }}
            >
              {editingId === item.id ? (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                  }}
                >
                  <TextInput
                    value={editText}
                    onChangeText={setEditText}
                    style={{
                      borderWidth: 0.5,
                      borderColor: COLORS.gray,
                      padding: 10,
                      borderRadius: 15,
                      width: '80%',
                    }}
                  />
                  <TouchableOpacity onPress={saveEdit}>
                    <Ionicons name="checkmark-circle" size={30} color="green" />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <Text
                    style={{
                      textDecorationLine: item.completed ? 'line-through' : 'none',
                      fontSize: 15,
                      width: '50%',
                    }}
                  >
                    {item.text}
                  </Text>

                    
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => toggleCompletion(item.id)}>
                      <Ionicons name="checkmark-circle" size={25} color="green" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => editTask(item.id, item.text)}>
                      <MaterialIcons name="edit" size={19} color="rgba(119, 133, 12, 0.67)" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTask(item.id)}>
                      <MaterialIcons name="delete-forever" size={25} color="#c51429" />
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TodoScreen;
