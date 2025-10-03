// Contact Screen - Email contact form (designed UI)
import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  Alert,
  Linking,
  Clipboard 
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '../../styles/colors'
import { Typography } from '../../styles/typography'
import CustomInput from '../../components/common/CustomInput'
import CustomButton from '../../components/common/CustomButton'
import { GlobalStyles } from '../../styles/globalStyles'

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    setLoading(true)
    try {
      const mailto = `mailto:lifechangingjourney84@gmail.com?subject=${encodeURIComponent(formData.subject || 'Inquiry from Life Changing Journey App')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || '-'}\n\nMessage:\n${formData.message}`
      )}`
      const canOpen = await Linking.canOpenURL(mailto)
      if (canOpen) {
        await Linking.openURL(mailto)
        Alert.alert('Message Ready', 'Your email has been opened in your mail app. Please send it to complete.', [
          { text: 'OK', onPress: () => {} }
        ])
      } else {
        throw new Error('Cannot open mail app')
      }
    } catch (e) {
      Alert.alert(
        'Email App Not Available', 
        'Your device doesn\'t have an email app configured. You can copy our email address and send your message manually.',
        [
          { text: 'Copy Email Address', onPress: copyEmailToClipboard },
          { text: 'Cancel', style: 'cancel' }
        ]
      )
    } finally {
      setLoading(false)
    }
  }

  const copyEmailToClipboard = async () => {
    try {
      await Clipboard.setString('lifechangingjourney84@gmail.com')
      Alert.alert('Copied!', 'Email address copied to clipboard. You can now paste it in any email app.')
    } catch (error) {
      Alert.alert('Error', 'Could not copy email address to clipboard.')
    }
  }

  const contactMethods = [
    {
      id: 'email',
      title: 'Email Us',
      subtitle: 'lifechangingjourney84@gmail.com',
      icon: 'mail-outline',
      color: Colors.primary,
      action: () => Linking.openURL('mailto:lifechangingjourney84@gmail.com?subject=Inquiry from Life Changing Journey App')
    },
    {
      id: 'website',
      title: 'Visit Website',
      subtitle: 'lifechangingjourney.co.za',
      icon: 'globe-outline',
      color: Colors.info,
      action: () => Linking.openURL('https://lifechangingjourney.co.za')
    }
  ]

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={Colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 50,
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        <Text style={{
          ...Typography.textStyles.h2,
          color: Colors.white,
          marginBottom: 8,
        }}>
          Contact Us
        </Text>
        <Text style={{
          ...Typography.textStyles.bodySmall,
          color: Colors.white,
          opacity: 0.9,
        }}>
          Get in touch with our team for support, bookings, or inquiries
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ paddingHorizontal: 16, paddingVertical: 20 }}>
            <Text style={{
              ...Typography.textStyles.h5,
              color: Colors.textPrimary,
              marginBottom: 16,
            }}>
              Quick Contact
            </Text>

            <View style={{
              backgroundColor: Colors.surface,
              borderRadius: 12,
              padding: 12,
              borderWidth: 1,
              borderColor: Colors.lightGray,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <View style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: Colors.primary + '10',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 10,
              }}>
                <Ionicons name="time-outline" size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ ...Typography.textStyles.captionBold, color: Colors.textPrimary, marginBottom: 2 }}>
                  Typical response time
                </Text>
                <Text style={{ ...Typography.textStyles.caption, color: Colors.textSecondary }}>
                  We usually reply within 24–48 hours on weekdays
                </Text>
              </View>
            </View>

            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}>
              {contactMethods.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={{
                    width: '48%',
                    backgroundColor: Colors.surface,
                    borderRadius: 16,
                    padding: 16,
                    alignItems: 'center',
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: Colors.lightGray,
                    shadowColor: Colors.shadow.light,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                  }}
                  onPress={method.action}
                  activeOpacity={0.9}
                >
                  <View style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: method.color + '20',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                    <Ionicons name={method.icon} size={20} color={method.color} />
                  </View>
                  <Text style={{
                    ...Typography.textStyles.captionBold,
                    color: Colors.textPrimary,
                    marginBottom: 2,
                    textAlign: 'center',
                  }}>
                    {method.title}
                  </Text>
                  <Text style={{
                    ...Typography.textStyles.caption,
                    color: Colors.textSecondary,
                    textAlign: 'center',
                    fontSize: 11,
                  }}>
                    {method.subtitle}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            <Text style={{
              ...Typography.textStyles.h5,
              color: Colors.textPrimary,
              marginBottom: 16,
            }}>
              Send us a Message
            </Text>
            
            <View style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: Colors.lightGray,
              shadowColor: Colors.shadow.light,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="information-circle-outline" size={16} color={Colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={{ ...Typography.textStyles.caption, color: Colors.textSecondary }}>
                  Please provide as much detail as possible so we can assist you faster.
                </Text>
              </View>

              <CustomInput
                label="Full Name *"
                value={formData.name}
                onChangeText={(value) => updateFormData('name', value)}
                placeholder="Enter your full name"
                error={errors.name}
                autoCapitalize="words"
              />

              <CustomInput
                label="Email Address *"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <CustomInput
                label="Phone Number (Optional)"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={errors.phone}
              />

              <CustomInput
                label="Subject (Optional)"
                value={formData.subject}
                onChangeText={(value) => updateFormData('subject', value)}
                placeholder="What is this about?"
                error={errors.subject}
              />

              <CustomInput
                label="Message *"
                value={formData.message}
                onChangeText={(value) => updateFormData('message', value)}
                placeholder="Tell us how we can help you..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                error={errors.message}
              />

              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 4 }}>
                <Text style={{ ...Typography.textStyles.caption, color: Colors.textSecondary }}>
                  {(formData.message || '').length}/1000
                </Text>
              </View>

              <CustomButton
                title={loading ? 'Sending...' : 'Send Message'}
                onPress={handleSubmit}
                loading={loading}
                style={{ marginTop: 16 }}
              />

              {/* Hint text */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                <Ionicons name="information-circle-outline" size={14} color={Colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={{ ...Typography.textStyles.caption, color: Colors.textSecondary, flex: 1 }}>
                  This opens your email app to send your message.
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                <Ionicons name="shield-checkmark-outline" size={14} color={Colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={{ ...Typography.textStyles.caption, color: Colors.textSecondary, flex: 1 }}>
                  Your details are kept confidential and used only to respond to your inquiry.
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            <Text style={{
              ...Typography.textStyles.h5,
              color: Colors.textPrimary,
              marginBottom: 16,
            }}>
              Office Hours
            </Text>
            
            <View style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: Colors.lightGray,
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} style={{ marginRight: 12 }} />
                <Text style={{ ...Typography.textStyles.bodySmall, color: Colors.textPrimary, flex: 1 }}>
                  Monday - Friday: 9:00 AM - 5:00 PM
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} style={{ marginRight: 12 }} />
                <Text style={{ ...Typography.textStyles.bodySmall, color: Colors.textPrimary, flex: 1 }}>
                  Saturday: 9:00 AM - 1:00 PM
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name="time-outline" size={20} color={Colors.primary} style={{ marginRight: 12 }} />
                <Text style={{ ...Typography.textStyles.bodySmall, color: Colors.textPrimary, flex: 1 }}>
                  Sunday: Closed
                </Text>
              </View>
              <Text style={{
                ...Typography.textStyles.caption,
                color: Colors.textSecondary,
                marginTop: 12,
                fontStyle: 'italic',
              }}>
                Emergency consultations available by appointment
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ContactScreen
