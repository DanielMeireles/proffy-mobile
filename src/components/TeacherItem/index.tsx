import React from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';
import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

interface TeacherItemProps {
  title?: string;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View style={styles.profile} >
        <Image
          style={styles.avatar}
          source={{ uri: 'https://avatars3.githubusercontent.com/u/20533324?v=4'}}
        />
        <View style={styles.profileInfo} >
          <Text style={styles.name}>
            Daniel Meireles
          </Text>
          <Text style={styles.subject}>
            Matemática
          </Text>
        </View>
      </View>
      <Text style={styles.bio} >
        Teste teste test test teste teste teste teste teste teste teste {'\n'} Teste
      </Text>
      <View style={styles.footer} >
        <Text style={styles.price} >
          Preço/hora {'   '}
          <Text style={styles.priceValue} >
          r$ 20,00
          </Text>
        </Text>
        <View style={styles.buttonsContainer} >
          <RectButton style={[styles.favoriteButton, styles.favoritedButton]}>
            {/*<Image source={heartOutlineIcon} />*/}
            <Image source={unfavoriteIcon} />
          </RectButton>
          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>
              Entrar em contato
            </Text>
          </RectButton>
        </View>

      </View>
    </View>
  );
}

export default TeacherItem;