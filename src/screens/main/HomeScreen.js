// Premium Home Screen - Life Changing Journey
import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  FlatList,
  RefreshControl
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuth } from '../../context/AuthContext'
import ServiceCard from '../../components/cards/ServiceCard'
import TestimonialCard from '../../components/cards/TestimonialCard'
import ResourceCard from '../../components/cards/ResourceCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { Colors } from '../../styles/colors'
import { Typography } from '../../styles/typography'
import { staticData } from '../../utils/staticData'

const { width } = Dimensions.get('window')

const HomeScreen = ({ navigation }) => {
  const { user, getUserProfile } = useAuth()
  const [userProfile, setUserProfile] = useState(staticData.userProfile)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(staticData.inspirationalQuotes[0])

  useEffect(() => {
    loadUserProfile()
    rotateQuote()
  }, [])

  const loadUserProfile = async () => {
    try {
      setLoading(true)
      const { data } = await getUserProfile()
      if (data) {
        setUserProfile(data)
      }
    } catch (error) {
      console.log('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const rotateQuote = () => {
    const quotes = staticData.inspirationalQuotes
    const randomIndex = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomIndex])
  }

  const onRefresh = async () => {
    setRefreshing(true)
    await loadUserProfile()
    rotateQuote()
    setRefreshing(false)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const QuickActionButton = ({ action }) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
        minWidth: 80,
        shadowColor: Colors.shadow.light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: action.color + '20',
      }}
      onPress={() => navigation.navigate(action.route)}
      activeOpacity={0.9}
    >
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: action.color + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <Ionicons name={action.icon} size={20} color={action.color} />
      </View>
      <Text style={{
        ...Typography.textStyles.captionBold,
        color: Colors.textPrimary,
        textAlign: 'center',
      }}>
        {action.title}
      </Text>
    </TouchableOpacity>
  )

  const AppointmentCard = ({ appointment }) => (
    <TouchableOpacity
      style={{
        backgroundColor: Colors.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 12,
        shadowColor: Colors.shadow.light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        borderLeftWidth: 4,
        borderLeftColor: Colors.primary,
      }}
      onPress={() => navigation.navigate('Booking')}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <View style={{ flex: 1 }}>
          <Text style={{
            ...Typography.textStyles.h6,
            color: Colors.textPrimary,
            marginBottom: 4,
          }}>
            {appointment.services.name}
          </Text>
          <Text style={{
            ...Typography.textStyles.bodySmall,
            color: Colors.textSecondary,
            marginBottom: 8,
          }}>
            {new Date(appointment.appointment_date).toLocaleDateString('en-ZA', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="time-outline" size={14} color={Colors.textLight} />
            <Text style={{
              ...Typography.textStyles.caption,
              color: Colors.textLight,
              marginLeft: 4,
            }}>
              {new Date(appointment.appointment_date).toLocaleTimeString('en-ZA', {
                hour: '2-digit',
                minute: '2-digit'
              })} • {appointment.services.duration} min
            </Text>
          </View>
        </View>
        
        <View style={{
          backgroundColor: appointment.status === 'confirmed' ? Colors.success + '20' : Colors.warning + '20',
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 8,
        }}>
          <Text style={{
            ...Typography.textStyles.caption,
            color: appointment.status === 'confirmed' ? Colors.successDark : Colors.warningDark,
            fontWeight: Typography.fontWeight.semiBold,
          }}>
            {appointment.status.toUpperCase()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading && !userProfile) {
    return <LoadingSpinner variant="gradient" text="Loading your journey..." />
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      
      {/* Header with gradient */}
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.white,
              opacity: 0.9,
              marginBottom: 4,
            }}>
              {getGreeting()},
            </Text>
            <Text style={{
              ...Typography.textStyles.h3,
              color: Colors.white,
              marginBottom: 8,
            }}>
              {userProfile?.full_name || user?.email?.split('@')[0] || 'Welcome'}
            </Text>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.white,
              opacity: 0.8,
            }}>
              Continue your wellness journey
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons name="person-outline" size={22} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Quick Actions */}
        <View style={{ paddingVertical: 20 }}>
          <FlatList
            data={staticData.quickActions}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }) => <QuickActionButton action={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* Upcoming Appointments */}
        {staticData.upcomingAppointments.length > 0 && (
          <View style={{ marginBottom: 24 }}>
            <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
              <Text style={{
                ...Typography.textStyles.h4,
                color: Colors.textPrimary,
                marginBottom: 4,
              }}>
                Upcoming Sessions
              </Text>
              <Text style={{
                ...Typography.textStyles.bodySmall,
                color: Colors.textSecondary,
              }}>
                Your scheduled appointments
              </Text>
            </View>
            
            {staticData.upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </View>
        )}

        {/* Inspirational Quote */}
        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            marginBottom: 24,
            backgroundColor: Colors.surface,
            borderRadius: 20,
            padding: 20,
            shadowColor: Colors.shadow.medium,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 5,
          }}
          onPress={rotateQuote}
          activeOpacity={0.95}
        >
          <LinearGradient
            colors={[Colors.secondaryAlpha, Colors.surface]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 20,
            }}
          />
          
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: Colors.secondary + '30',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,
            }}>
              <Ionicons name="bulb-outline" size={20} color={Colors.secondary} />
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                ...Typography.textStyles.captionBold,
                color: Colors.secondary,
                marginBottom: 8,
              }}>
                DAILY INSPIRATION
              </Text>
              <Text style={{
                ...Typography.textStyles.quote,
                color: Colors.textPrimary,
                marginBottom: 8,
                lineHeight: 24,
              }}>
                "{currentQuote.text}"
              </Text>
              <Text style={{
                ...Typography.textStyles.caption,
                color: Colors.textLight,
              }}>
                — {currentQuote.author}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Featured Services */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <Text style={{
              ...Typography.textStyles.h4,
              color: Colors.textPrimary,
              marginBottom: 4,
            }}>
              Our Services
            </Text>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.textSecondary,
            }}>
              Holistic wellness for mind, body & soul
            </Text>
          </View>
          
          <FlatList
            data={staticData.services.slice(0, 2)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <ServiceCard 
                service={item}
                variant="small"
                onPress={() => navigation.navigate('ServiceDetail', { service: item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* Testimonials */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
            <Text style={{
              ...Typography.textStyles.h4,
              color: Colors.textPrimary,
              marginBottom: 4,
            }}>
              Success Stories
            </Text>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.textSecondary,
            }}>
              Hear from our community
            </Text>
          </View>
          
          <FlatList
            data={staticData.testimonials.slice(0, 3)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            renderItem={({ item }) => (
              <TestimonialCard 
                testimonial={item}
                onPress={() => {}}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* Featured Resources */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ 
            paddingHorizontal: 16, 
            marginBottom: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <View>
              <Text style={{
                ...Typography.textStyles.h4,
                color: Colors.textPrimary,
                marginBottom: 4,
              }}>
                Featured Content
              </Text>
              <Text style={{
                ...Typography.textStyles.bodySmall,
                color: Colors.textSecondary,
              }}>
                Wellness resources for you
              </Text>
            </View>
            
            <TouchableOpacity onPress={() => navigation.navigate('Resources')}>
              <Text style={{
                ...Typography.textStyles.bodySmall,
                color: Colors.primary,
                fontWeight: Typography.fontWeight.semiBold,
              }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={staticData.resources.filter(r => r.is_featured).slice(0, 3)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <ResourceCard 
                resource={item}
                variant="default"
                onPress={() => navigation.navigate('Resources')}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>

        {/* Call to Action */}
        <View style={{
          marginHorizontal: 16,
          backgroundColor: Colors.surface,
          borderRadius: 20,
          overflow: 'hidden',
          shadowColor: Colors.shadow.medium,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 24, alignItems: 'center' }}
          >
            <Ionicons name="heart" size={40} color={Colors.white} style={{ marginBottom: 12 }} />
            <Text style={{
              ...Typography.textStyles.h5,
              color: Colors.white,
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Support Our Mission
            </Text>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.white,
              opacity: 0.9,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              Help us provide mental health resources to underserved communities
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 24,
              }}
              onPress={() => navigation.navigate('Donate')}
            >
              <Text style={{
                ...Typography.textStyles.button,
                color: Colors.primary,
              }}>
                Donate Now
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
