// Premium Resources Screen - Life Changing Journey
import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import ResourceCard from '../../components/cards/ResourceCard'
import { Colors } from '../../styles/colors'
import { Typography } from '../../styles/typography'
import { staticData } from '../../utils/staticData'

const ResourcesScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', title: 'All', icon: 'grid-outline' },
    { id: 'video', title: 'Videos', icon: 'play-circle-outline' },
    { id: 'audio', title: 'Audio', icon: 'headset-outline' },
    { id: 'article', title: 'Articles', icon: 'document-text-outline' },
    { id: 'pdf', title: 'Guides', icon: 'download-outline' },
  ]

  const filteredResources = staticData.resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.type === selectedCategory
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const CategoryButton = ({ category, isSelected }) => (
    <TouchableOpacity
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: isSelected ? Colors.primary : Colors.surface,
        marginRight: 8,
        shadowColor: Colors.shadow.light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        borderWidth: 1,
        borderColor: isSelected ? Colors.primary : Colors.lightGray,
      }}
      onPress={() => setSelectedCategory(category.id)}
      activeOpacity={0.9}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons 
          name={category.icon} 
          size={16} 
          color={isSelected ? Colors.white : Colors.textSecondary} 
          style={{ marginRight: 6 }}
        />
        <Text style={{
          ...Typography.textStyles.captionBold,
          color: isSelected ? Colors.white : Colors.textSecondary,
        }}>
          {category.title}
        </Text>
      </View>
    </TouchableOpacity>
  )

  const FeaturedSection = () => {
    const featuredResources = staticData.resources.filter(r => r.featured).slice(0, 3)
    
    return (
      <View style={{ marginBottom: 24 }}>
        <Text style={{
          ...Typography.textStyles.h5,
          color: Colors.textPrimary,
          marginBottom: 16,
        }}>
          Featured Resources
        </Text>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 4 }}
        >
          {featuredResources.map((resource) => (
            <View key={resource.id} style={{ width: 280, marginRight: 16 }}>
              <ResourceCard 
                resource={resource}
                variant="featured"
                onPress={() => {
                  // Handle resource access
                  console.log('Accessing resource:', resource.title)
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    )
  }

  const StatsCard = ({ icon, count, label, color }) => (
    <View style={{
      backgroundColor: Colors.surface,
      borderRadius: 16,
      padding: 16,
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 4,
      shadowColor: Colors.shadow.light,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color + '20',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      }}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={{
        ...Typography.textStyles.h4,
        color: Colors.textPrimary,
        marginBottom: 4,
      }}>
        {count}
      </Text>
      <Text style={{
        ...Typography.textStyles.caption,
        color: Colors.textSecondary,
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </View>
  )

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar style="light" />
      
      {/* Header */}
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
          Resource Library
        </Text>
        <Text style={{
          ...Typography.textStyles.bodySmall,
          color: Colors.white,
          opacity: 0.9,
          marginBottom: 16,
        }}>
          Educational content to support your wellness journey
        </Text>
        
        {/* Search Bar */}
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 12,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 12,
        }}>
          <Ionicons name="search" size={20} color={Colors.white} style={{ marginRight: 12 }} />
          <TextInput
            style={{
              flex: 1,
              color: Colors.white,
              ...Typography.textStyles.bodySmall,
            }}
            placeholder="Search resources..."
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>

      {/* Stats */}
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}>
        <StatsCard 
          icon="play-circle" 
          count="45" 
          label="Videos" 
          color={Colors.mentalWellness.primary} 
        />
        <StatsCard 
          icon="headset" 
          count="32" 
          label="Audio" 
          color={Colors.spiritualGrowth.primary} 
        />
        <StatsCard 
          icon="document-text" 
          count="78" 
          label="Articles" 
          color={Colors.financialGuidance.primary} 
        />
        <StatsCard 
          icon="download" 
          count="24" 
          label="Guides" 
          color={Colors.hypnotherapy.primary} 
        />
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Resources */}
        <View style={{ paddingHorizontal: 16 }}>
          <FeaturedSection />
        </View>

        {/* Category Filter */}
        <View style={{ paddingVertical: 16 }}>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <CategoryButton 
                category={item} 
                isSelected={selectedCategory === item.id}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Resources Grid */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text style={{
            ...Typography.textStyles.h5,
            color: Colors.textPrimary,
            marginBottom: 16,
          }}>
            {selectedCategory === 'all' ? 'All Resources' : categories.find(c => c.id === selectedCategory)?.title}
            {searchQuery && ` for "${searchQuery}"`}
          </Text>

          {filteredResources.length === 0 ? (
            <View style={{
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 24,
              alignItems: 'center',
              marginTop: 32,
            }}>
              <Ionicons name="search" size={48} color={Colors.textSecondary} style={{ marginBottom: 16 }} />
              <Text style={{
                ...Typography.textStyles.h6,
                color: Colors.textPrimary,
                marginBottom: 8,
                textAlign: 'center',
              }}>
                No resources found
              </Text>
              <Text style={{
                ...Typography.textStyles.bodySmall,
                color: Colors.textSecondary,
                textAlign: 'center',
              }}>
                Try adjusting your search or category filter
              </Text>
            </View>
          ) : (
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
              {filteredResources.map((resource) => (
                <View key={resource.id} style={{ width: '48%', marginBottom: 16 }}>
                  <ResourceCard 
                    resource={resource}
                    variant="compact"
                    onPress={() => {
                      // Handle resource access
                      console.log('Accessing resource:', resource.title)
                    }}
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Premium Content Upgrade */}
        <View style={{
          backgroundColor: Colors.surface,
          borderRadius: 20,
          overflow: 'hidden',
          marginHorizontal: 16,
          marginTop: 32,
          shadowColor: Colors.shadow.medium,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 5,
        }}>
          <LinearGradient
            colors={[Colors.secondary, Colors.secondaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 24, alignItems: 'center' }}
          >
            <Ionicons name="star" size={40} color={Colors.white} style={{ marginBottom: 12 }} />
            <Text style={{
              ...Typography.textStyles.h5,
              color: Colors.white,
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Unlock Premium Content
            </Text>
            <Text style={{
              ...Typography.textStyles.bodySmall,
              color: Colors.white,
              opacity: 0.9,
              textAlign: 'center',
              marginBottom: 16,
            }}>
              Access exclusive workshops, masterclasses, and personalized content
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.white,
                paddingHorizontal: 32,
                paddingVertical: 14,
                borderRadius: 24,
              }}
              onPress={() => navigation.navigate('Premium')}
            >
              <Text style={{
                ...Typography.textStyles.button,
                color: Colors.secondary,
              }}>
                Upgrade Now
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Quick Actions */}
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingTop: 16,
          gap: 12,
        }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.lightGray,
            }}
            onPress={() => navigation.navigate('Bookmarks')}
            activeOpacity={0.95}
          >
            <Ionicons name="bookmark-outline" size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={{
              ...Typography.textStyles.captionBold,
              color: Colors.textPrimary,
            }}>
              Bookmarks
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: Colors.surface,
              borderRadius: 16,
              padding: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: Colors.lightGray,
            }}
            onPress={() => navigation.navigate('Downloads')}
            activeOpacity={0.95}
          >
            <Ionicons name="download-outline" size={24} color={Colors.primary} style={{ marginBottom: 8 }} />
            <Text style={{
              ...Typography.textStyles.captionBold,
              color: Colors.textPrimary,
            }}>
              Downloads
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default ResourcesScreen
