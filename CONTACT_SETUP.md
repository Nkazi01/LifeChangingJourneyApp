# Contact Form Setup Guide - Life Changing Journey

## 🚀 Professional Email Integration with Supabase + Resend

This guide will help you set up the professional contact form with email integration using Supabase Edge Functions and Resend.

## 📋 Prerequisites

1. **Supabase Project** (already set up)
2. **Resend Account** (free at resend.com)
3. **Domain Email** (for sending emails)

## 🔧 Step 1: Set up Resend Account

### 1.1 Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 1.2 Get API Key
1. Go to **API Keys** in your Resend dashboard
2. Click **Create API Key**
3. Name it "Life Changing Journey Contact Form"
4. The API key (starts with `re_hLqaMhn3_CUyPR3TSW3jqp487BWSRu7QJ')

### 1.3 Add Domain (Optional but Recommended)
1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Add your domain: `lifechangingjourney.co.za`
4. Follow DNS setup instructions
5. Verify domain ownership

## 🔧 Step 2: Deploy Supabase Edge Function

### 2.1 Install Supabase CLI
```bash
npm install -g supabase
```

### 2.2 Login to Supabase
```bash
supabase login
```

### 2.3 Link to your project
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### 2.4 Set Environment Variables
```bash
supabase secrets set RESEND_API_KEY=re_your_api_key_here
```

### 2.5 Deploy the Edge Function
```bash
supabase functions deploy send-contact-email
```

## 🔧 Step 3: Update Environment Variables

### 3.1 Create .env file
Create a `.env` file in your project root:

```env
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_ENABLE_AUTH=true

# Optional: Enable debug mode
EXPO_PUBLIC_DEBUG_MODE=false
```

### 3.2 Get Supabase Credentials
1. Go to your Supabase project dashboard
2. Go to **Settings** > **API**
3. Copy:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public** key → `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## 🔧 Step 4: Test the Contact Form

### 4.1 Start the App
```bash
npm start
```

### 4.2 Test Contact Form
1. Navigate to Contact screen
2. Fill out the form
3. Submit the form
4. Check your email for the contact message

## 📧 Email Configuration

### Email Template Features
- ✅ **Professional HTML design** with Life Changing Journey branding
- ✅ **Contact details** (name, email, phone, subject)
- ✅ **Service interest** selection
- ✅ **Formatted message** with proper line breaks
- ✅ **Timestamp** in South African timezone
- ✅ **Reply-to** set to customer's email

### Email Recipients
- **Primary**: `info@lifechangingjourney.co.za`
- **Reply-to**: Customer's email address
- **Subject**: `Contact Form: [Customer's Subject]`

## 🛠️ Troubleshooting

### Common Issues

#### 1. "RESEND_API_KEY not found"
**Solution**: Make sure you set the secret in Supabase:
```bash
supabase secrets set RESEND_API_KEY=re_your_key_here
```

#### 2. "Failed to send email"
**Solution**: Check your Resend API key and domain setup

#### 3. "CORS error"
**Solution**: The Edge Function includes CORS headers, but make sure your Supabase URL is correct

#### 4. "Invalid email format"
**Solution**: The function validates email format - make sure customers enter valid emails

### Debug Mode
Enable debug logging by setting:
```bash
supabase secrets set DEBUG_MODE=true
```

## 📊 Monitoring

### Resend Dashboard
- Monitor email delivery in Resend dashboard
- Check bounce rates and delivery statistics
- View email logs and errors

### Supabase Dashboard
- Monitor Edge Function logs
- Check database for stored contact messages
- View function execution metrics

## 🔒 Security Features

### Input Validation
- ✅ **Email format validation**
- ✅ **Required field validation**
- ✅ **Message length validation**
- ✅ **XSS protection** (HTML escaping)

### Rate Limiting
- ✅ **Supabase Edge Function limits** (automatic)
- ✅ **Resend rate limits** (3,000 emails/month free)

### Data Protection
- ✅ **API keys stored server-side**
- ✅ **No sensitive data in client code**
- ✅ **CORS protection**
- ✅ **Input sanitization**

## 📈 Scaling Options

### Free Tier Limits
- **Resend**: 3,000 emails/month
- **Supabase**: 500,000 function invocations/month

### Upgrade Path
1. **Resend Pro**: $20/month for 50,000 emails
2. **Supabase Pro**: $25/month for higher limits
3. **Custom domain**: Professional email sending

## 🎯 Next Steps

### Immediate
1. ✅ Deploy Edge Function
2. ✅ Set up Resend account
3. ✅ Test contact form
4. ✅ Configure email templates

### Future Enhancements
1. **Auto-responder**: Send confirmation email to customer
2. **Email templates**: Customize email design
3. **CRM integration**: Connect to customer management system
4. **Analytics**: Track form submissions and conversions
5. **Multi-language**: Support for Zulu and Afrikaans

## 📞 Support

If you need help with the setup:
1. Check the troubleshooting section above
2. Review Supabase and Resend documentation
3. Test with simple email first
4. Monitor logs for error messages

## 🎉 Success!

Once set up, your contact form will:
- ✅ Send professional emails to your team
- ✅ Store contact messages in database
- ✅ Provide excellent user experience
- ✅ Handle errors gracefully
- ✅ Scale with your business

The contact form is now ready for production use! 🚀
