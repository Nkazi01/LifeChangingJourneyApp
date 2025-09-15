// Service Detail Screen - Directory Gateway
import React from 'react'
import { View, Text, ScrollView, Linking, Alert } from 'react-native'
import { GlobalStyles } from '../../styles/globalStyles'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../styles/colors'
import { Typography } from '../../styles/typography'
import CustomButton from '../../components/common/CustomButton'

const ServiceDetailScreen = ({ route }) => {
  const { service } = route.params

  const handleWebsitePress = (url) =>
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open website. Please check your internet connection.')
    })

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() => {
      Alert.alert('Error', 'Unable to make call. Please check your device settings.')
    })
  }

  return (
    <ScrollView style={GlobalStyles.container}>
      <View style={[GlobalStyles.centerContainer, { padding: 20 }]}>
        <Text style={[GlobalStyles.h1, { color: Colors.primary, marginBottom: 10 }]}>
          {service.title}
        </Text>
        <Text style={[GlobalStyles.bodyText, { textAlign: 'center', marginBottom: 30 }]}>
          {service.description}
        </Text>

        {/* Practitioner Info */}
        <View style={{ width: '100%', marginBottom: 20 }}>
          <Text style={[GlobalStyles.h3, { marginBottom: 15 }]}>
            {service.practitioner}
          </Text>
          <Text style={[GlobalStyles.bodyText, { marginBottom: 15, fontStyle: 'italic' }]}>
            {service.practitionerTitle}
          </Text>
        </View>

        {/* Features */}
        {service.features && (
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text style={[GlobalStyles.h3, { marginBottom: 15 }]}>Services Include:</Text>
            {service.features.map((feature, index) => (
              <View key={index} style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 8,
              }}>
                <View style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: Colors.primary,
                  marginRight: 12,
                }} />
                <Text style={[GlobalStyles.bodyText, { flex: 1 }]}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Contact Actions */}
        <View style={{ width: '100%', marginBottom: 20 }}>
          {service.website && (
            <CustomButton
              title={`Visit`}
              onPress={() => handleWebsitePress(service.website)}
              icon={<Ionicons name="paper-plane-outline" size={16} color={Colors.white} />}
              style={{ marginBottom: 10 }}
            />
          )}
          
          {service.phone && (
            <CustomButton
              title={`Call: ${service.phone}`}
              onPress={() => handleCallPress(service.phone)}
              variant="outline"
              style={{ marginBottom: 10 }}
            />
          )}

          {service.office && service.office !== service.phone && (
            <CustomButton
              title={`Office: ${service.office}`}
              onPress={() => handleCallPress(service.office)}
              variant="outline"
            />
          )}
        </View>
      </View>
    </ScrollView>
  )
}

export default ServiceDetailScreen
