import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons'

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

import styles from './styles';

interface Teacher {
  class_id: string;
  user_id: string;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  avatar: string;
  whatsapp: string;
}

function TeacherList() {

  const [ifFiltersVisible, setIsFiltersVisible] = useState(false);

  const [teachers, setTeachers] = useState([]);

  const [favorites, setFavorites] = useState<string[]>([]);

  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!ifFiltersVisible);
  }

  function handleFiltersSubmit() {
    api.get('classes', {
      params: { subject, week_day, time },
    })
    .then((response) => {
      setTeachers(response.data);
      handleToggleFiltersVisible();
    });
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather
              name="filter"
              size={20}
              color='#FFF'
            />
          </BorderlessButton>
        )}
      >

        { ifFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>
              Disciplina
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a disciplina?"
              placeholderTextColor="#C1BCCC"
              value={subject}
              onChangeText={text => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Dia da semana
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#C1BCCC"
                  value={week_day}
                  onChangeText={text => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>
                  Horário
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  placeholderTextColor="#C1BCCC"
                  value={time}
                  onChangeText={text => setTime(text)}
                />
              </View>
            </View>
            <RectButton 
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>
                Filtrar
              </Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 5,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.class_id}
              teacher={teacher}
              favorited={favorites.includes(teacher.class_id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;