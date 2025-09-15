// Static data for Life Changing Journey - Real services and content
export const staticData = {
  // Real services from Life Changing Journey website
  services: [
    {
      id: 1,
      title: 'Psychology Services',
      shortDescription: 'Professional psychological support & therapy',
      description: 'Comprehensive mental health support with qualified psychologists. Individual counseling, therapy sessions, and psychological assessments to support your mental wellness journey.',
      category: 'mental_wellness',
      icon: 'medical-outline',
      price: 800,
      duration: 60,
      features: [
        'Individual Therapy Sessions',
        'Psychological Assessments', 
        'Stress & Anxiety Management',
        'Depression Support',
        'Trauma Counseling',
        'Relationship Counseling'
      ],
      isActive: true,
      practitioner: 'Senior Psychologist',
      practitionerTitle: 'Registered Clinical Psychologist'
    },
    {
      id: 2,
      title: 'Spiritual Interventions',
      shortDescription: 'Traditional spiritual healing & guidance',
      description: 'Traditional African spiritual interventions (izinkinga zemimoya) including spiritual cleansing, guidance, and Ubuntu-based healing practices rooted in our cultural heritage.',
      category: 'spiritual_growth',
      icon: 'leaf-outline',
      price: 500,
      duration: 45,
      features: [
        'Ukugezwa Kwemimoya (Spiritual Cleansing)',
        'Traditional Healing Ceremonies',
        'Ancestral Communication',
        'Spiritual Guidance & Direction',
        'Ubuntu Philosophy Integration',
        'Cultural Heritage Healing'
      ],
      isActive: true,
      practitioner: 'Traditional Healer',
      practitionerTitle: 'Qualified Spiritual Practitioner'
    },
    {
      id: 3,
      title: 'Financial Services',
      shortDescription: 'Personal loans & financial planning',
      description: 'Comprehensive financial services including personal loans up to R10,000, financial planning, and money management guidance to secure your financial future.',
      category: 'financial_guidance',
      icon: 'card-outline',
      price: 350,
      duration: 90,
      features: [
        'Personal Loans up to R10,000',
        'Quick Application Process',
        'Financial Planning Consultation',
        'Debt Management Solutions',
        'Credit Assessment & Advice',
        'Money Management Training'
      ],
      isActive: true,
      practitioner: 'Tshabalala Finance',
      practitionerTitle: 'Licensed Credit Provider'
    },
    {
      id: 4,
      title: 'Hypnotherapy & Life Coaching',
      shortDescription: 'Transform your life through hypnosis',
      description: 'Professional hypnotherapy sessions and life coaching to overcome limiting beliefs, break bad habits, and unlock your full potential for personal transformation.',
      category: 'hypnotherapy',
      icon: 'eye-outline',
      price: 600,
      duration: 75,
      features: [
        'Clinical Hypnotherapy Sessions',
        'Life Coaching & Goal Setting',
        'Habit Change Programs',
        'Confidence Building',
        'Stress Reduction Techniques',
        'Personal Transformation Plans'
      ],
      isActive: true,
      practitioner: 'Certified Life Coach',
      practitionerTitle: 'Clinical Hypnotherapist'
    },
    {
      id: 5,
      title: 'Tshabalala Omkhulu Consulting',
      shortDescription: 'Traditional wisdom & modern consulting',
      description: 'Unique blend of traditional African wisdom and modern consulting approaches for personal development, business guidance, and life direction.',
      category: 'spiritual_growth',
      icon: 'library-outline',
      price: 750,
      duration: 60,
      features: [
        'Traditional Wisdom Consultation',
        'Business & Career Guidance',
        'Life Purpose Discovery',
        'Cultural Heritage Integration',
        'Personal Development Planning',
        'Leadership Development'
      ],
      isActive: true,
      practitioner: 'Tshabalala Omkhulu',
      practitionerTitle: 'Traditional Consultant & Advisor'
    }
  ],

  // Real testimonials reflecting Life Changing Journey's impact
  testimonials: [
    {
      id: 1,
      client_name: 'Simphiwe N.',
      content: 'Life Changing Journey has been instrumental in helping me achieve a state of balance and fulfillment. Their approach is truly transformative and has made a significant impact on my life.',
      rating: 5,
      service_category: 'psychology',
      is_featured: true,
      is_approved: true
    },
    {
      id: 2,
      client_name: 'Thabo M.',
      content: 'The spiritual interventions helped me reconnect with my ancestors and find peace. The traditional healing approach combined with modern understanding is exactly what I needed.',
      rating: 5,
      service_category: 'spiritual_growth',
      is_featured: true,
      is_approved: true
    },
    {
      id: 3,
      client_name: 'Nomsa K.',
      content: 'Thanks to their financial services, I was able to get the loan I needed quickly and start my business. The support and guidance have been invaluable.',
      rating: 5,
      service_category: 'financial_guidance',
      is_featured: true,
      is_approved: true
    },
    {
      id: 4,
      client_name: 'David L.',
      content: 'The hypnotherapy sessions completely changed my mindset. I overcame years of limiting beliefs and now feel empowered to pursue my dreams.',
      rating: 5,
      service_category: 'hypnotherapy',
      is_featured: true,
      is_approved: true
    },
    {
      id: 5,
      client_name: 'Zanele P.',
      content: 'Tshabalala Omkhulu\'s wisdom combined with practical guidance helped me make important life decisions. The cultural connection was deeply meaningful.',
      rating: 5,
      service_category: 'consulting',
      is_featured: true,
      is_approved: true
    }
  ],

  // Resources data
  resources: [
    {
      id: 1,
      title: '5-Minute Morning Meditation',
      content: 'Start your day with intention and calm through this guided morning meditation practice.',
      category: 'spiritual_growth',
      resource_type: 'audio',
      duration: 300,
      is_featured: true,
      is_public: true,
      created_at: '2024-01-15T08:00:00Z'
    },
    {
      id: 2,
      title: 'Understanding Anxiety: A Complete Guide',
      content: 'Learn about anxiety symptoms, triggers, and evidence-based coping strategies.',
      category: 'mental_wellness',
      resource_type: 'article',
      is_featured: true,
      is_public: true,
      created_at: '2024-01-10T10:30:00Z'
    },
    {
      id: 3,
      title: 'Building Your Emergency Fund',
      content: 'Step-by-step guide to creating financial security through emergency savings.',
      category: 'financial_guidance',
      resource_type: 'pdf',
      is_featured: false,
      is_public: true,
      created_at: '2024-01-08T14:15:00Z'
    },
    {
      id: 4,
      title: 'Deep Relaxation Hypnosis Session',
      content: 'Experience profound relaxation and stress relief through guided hypnosis.',
      category: 'hypnotherapy',
      resource_type: 'audio',
      duration: 1800,
      is_featured: true,
      is_public: true,
      created_at: '2024-01-05T16:45:00Z'
    },
    {
      id: 5,
      title: 'Finding Your Life Purpose',
      content: 'Discover practical exercises to uncover your true calling and life mission.',
      category: 'spiritual_growth',
      resource_type: 'video',
      duration: 720,
      is_featured: false,
      is_public: true,
      created_at: '2024-01-03T11:20:00Z'
    },
    {
      id: 6,
      title: 'Mindful Money Management',
      content: 'Learn how mindfulness practices can transform your relationship with money.',
      category: 'financial_guidance',
      resource_type: 'article',
      is_featured: false,
      is_public: true,
      created_at: '2024-01-01T09:00:00Z'
    }
  ],

  // User profile data (sample)
  userProfile: {
    id: 'user-123',
    full_name: 'Sipho Mthembu',
    email: 'sipho.mthembu@example.com',
    phone: '+27 82 123 4567',
    date_of_birth: '1985-06-15',
    avatar_url: null,
    preferences: {
      language: 'en',
      notifications: true,
      newsletter: true
    },
    created_at: '2023-12-01T10:00:00Z'
  },

  // Upcoming appointments (sample)
  upcomingAppointments: [
    {
      id: 'appt-1',
      service_id: 1,
      appointment_date: '2024-01-20T10:00:00Z',
      status: 'confirmed',
      notes: 'First session - intake assessment',
      services: {
        name: 'Mental Wellness Consultation',
        description: 'Individual counseling session',
        price: 500,
        duration: 60
      }
    },
    {
      id: 'appt-2',
      service_id: 2,
      appointment_date: '2024-01-22T14:30:00Z',
      status: 'pending',
      notes: 'Follow-up spiritual guidance session',
      services: {
        name: 'Spiritual Growth Session',
        description: 'Life purpose exploration',
        price: 350,
        duration: 45
      }
    }
  ],

  // Life Changing Journey inspirational quotes
  inspirationalQuotes: [
    {
      id: 1,
      text: "Transform your mind, transform your life. Every step you take towards wellness is a step towards a better you.",
      author: "Life Changing Journey"
    },
    {
      id: 2,
      text: "Ubuntu: I am because we are. Your healing contributes to the healing of our community.",
      author: "African Philosophy"
    },
    {
      id: 3,
      text: "In the midst of life's challenges, there is always a path to transformation and growth.",
      author: "Life Changing Journey"
    },
    {
      id: 4,
      text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
      author: "Life Changing Journey"
    },
    {
      id: 5,
      text: "Healing is not about becoming someone else; it's about becoming who you truly are meant to be.",
      author: "Life Changing Journey"
    }
  ],

  // Quick actions for Life Changing Journey services
  quickActions: [
    {
      id: 1,
      title: 'Book Session',
      icon: 'calendar-outline',
      color: '#1a365d',
      route: 'Booking'
    },
    {
      id: 2,
      title: 'Resources',
      icon: 'library-outline',
      color: '#f6ad55',
      route: 'Resources'
    },
    {
      id: 3,
      title: 'Apply for Loan',
      icon: 'card-outline',
      color: '#38b2ac',
      route: 'FinancialGuidance'
    },
    {
      id: 4,
      title: 'Contact Us',
      icon: 'call-outline',
      color: '#6b46c1',
      route: 'Contact'
    }
  ]
}
