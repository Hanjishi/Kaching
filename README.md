# Kaching - Smart Budget & Expense Tracker

A mobile application built with React Native and Expo that helps users manage their finances, track expenses, set budgets, and achieve savings goals. Kaching provides real-time financial insights with offline support and cloud synchronization.

## Project Overview

Kaching is a comprehensive personal finance management app designed to help users:
- Track daily expenses across multiple categories
- Set and monitor monthly budgets
- Build savings with goal tracking
- Get personalized financial tips
- Sync data across devices

**Target Users:** Students, professionals, and anyone wanting to take control of their finances.

## Key Features

### Expense Management
- **Add Expenses**: Categorize expenses by type (Food, Transport, Entertainment, etc.)
- **Edit Expenses**: Modify existing expense entries anytime
- **View Expense History**: Complete list of all recorded expenses
- **Date-based Tracking**: Track expenses by date for better analysis
- **Category Organization**: Organize spending by predefined categories

### Budget Planning
- **Set Monthly Budget**: Define your monthly spending limit
- **Budget Tracking**: Monitor how much you've spent vs. your budget
- **Budget Alerts**: Get notified when approaching budget limit
- **Dynamic Budget Updates**: Change budget anytime during the month

### Savings Management
- **Savings Tracker**: Track your current savings balance
- **Quick Add/Subtract**: Fast buttons to add or withdraw savings (₱1, ₱5, ₱10, ₱20, ₱50, ₱100, ₱1000)
- **Savings Goals**: Set specific savings goals with target amounts
- **Goal Progress**: Visual progress indicator toward savings goal
- **Goal Management**: Create, update, or remove savings goals

### Financial Insights
- **Dashboard Summary**: Overview of budget vs. spending
- **Visual Progress Bars**: See savings progress at a glance
- **Financial Tips**: Daily tips for better money management
- **Spending Patterns**: Analyze where your money is going

### User Profile
- **Custom Profile**: Set username and profile picture
- **Profile Management**: Edit personal information anytime
- **Email Verification**: Secure authentication with email

### Data Management
- **Cloud Sync**: Automatic data synchronization with Supabase
- **Offline Support**: Full app functionality without internet
- **Manual Backup**: Backup data anytime with one tap
- **Auto-Sync**: Automatic sync when internet connection restored

### Multi-Device Support
- **iOS & Android**: Native support for both platforms
- **Web Compatible**: Run on web browsers via Expo
- **Responsive Design**: Works on phones, tablets, and more

## Tech Stack

### Frontend
- **React Native 0.81.5** - Cross-platform mobile framework
- **Expo 54.0.25** - React Native framework for easy development
- **React Navigation** - Navigation between screens
- **React Native Paper** - Material Design UI components
- **Axios** - HTTP client for API requests

### Backend & Database
- **Supabase** - Firebase alternative for backend services
- **PostgreSQL** - Database for storing user data
- **Authentication** - Email/password-based auth with Supabase

### State Management & Storage
- **AsyncStorage** - Local data persistence
- **Context API** - State management across app

### Additional Libraries
- **React Native Chart Kit** - Data visualization
- **React Native DateTimePicker** - Date and time selection
- **React Native Vector Icons** - Icon library
- **React Native Image Picker** - Image selection

## Project Structure

```
Kaching/
├── screens/                # Screen components
│   ├── Home.js            # Dashboard
│   ├── Login.js           # Login screen
│   ├── Signup.js          # Registration screen
│   ├── AddExpense.js      # Add expense form
│   ├── EditExpense.js     # Edit expense form
│   ├── ExpenseList.js     # Expense history
│   ├── Savings.js         # Savings management
│   ├── Profile.js         # User profile
│   ├── Summary.js         # Financial summary
│   ├── Settings.js        # App settings
│   ├── About.js           # About app
│   └── Splash.js          # Splash screen
├── components/            # Reusable components
│   ├── ProfileHeader.js   # Header with profile
│   ├── BudgetInput.js     # Budget input component
│   ├── ExpenseForm.js     # Expense form
│   ├── FeatureCards.js    # Feature shortcuts
│   └── ...
├── navigation/            # Navigation configuration
│   └── AppNavigator.js    # Main navigation setup
├── services/              # API and external services
│   ├── supabase.js        # Supabase configuration
│   └── syncService.js     # Data sync service
├── styles/                # Stylesheets
├── models/                # Data models
├── auth/                  # Authentication logic
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── App.js                 # App entry point
└── index.js               # React Native entry point
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (for testing)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd "Kaching"
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file** (already exists, verify Supabase keys)
```
EXPO_PUBLIC_SUPABASE_URL=https://bantvgsumgkrjhdxvtrh.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_RiNbUHIMaGT5jhyXX35SHA_RtQoZhNJ
```

4. **Start the app**
```bash
npm start
```

5. **Run on your device**
- **Android**: Press `a` in terminal or scan QR code with Expo Go app
- **iOS**: Press `i` in terminal or scan QR code with iPhone camera
- **Web**: Press `w` in terminal to open in browser

## User Guide

### Getting Started

#### 1. Sign Up
1. Open Kaching app
2. Click "Create Account"
3. Enter your email and password
4. Click "Sign Up"
5. Complete your profile with name and profile picture

#### 2. Login
1. Enter your registered email
2. Enter your password
3. Click "Login"
4. You're now on the home dashboard

### Using the App

#### Setting Your Monthly Budget
1. Go to **Home** screen
2. Locate "Current Monthly Budget" section
3. Enter your desired monthly budget amount
4. Budget is automatically saved

#### Adding an Expense
1. Click **"+ Add Expense"** button (or navigate to Add Expense)
2. Fill in:
   - **Description**: What you spent on
   - **Amount**: How much you spent (₱)
   - **Category**: Choose category (Food, Transport, etc.)
   - **Date**: When you spent it
3. Click **"Save"**
4. Expense is added to your list

#### Viewing Expenses
1. Go to **Expense List** screen
2. See all your recorded expenses
3. Click on any expense to see details
4. Swipe to delete or click edit to modify

#### Editing an Expense
1. Go to **Expense List**
2. Click **"Edit"** on any expense
3. Modify the details
4. Click **"Update"**

#### Deleting an Expense
1. Go to **Expense List**
2. Click **"Delete"** or swipe left on expense
3. Confirm deletion

#### Managing Savings

**Add to Savings:**
1. Go to **Savings** screen
2. Click any quick amount button (₱1, ₱5, ₱10, etc.)
3. Amount added to saved balance instantly

**Withdraw from Savings:**
1. Go to **Savings** screen
2. Toggle to "Withdraw" mode
3. Click amount to withdraw
4. Balance is reduced

**Set Savings Goal:**
1. Go to **Savings** screen
2. Under "Savings Goal" section:
   - Enter goal name (e.g., "Vacation Fund")
   - Enter target amount
   - Click **"Save Goal"**
3. Progress bar shows you how close to goal

**Track Goal Progress:**
- Visual progress bar shows percentage toward goal
- Current balance displayed at top
- Goal details shown below balance

**Reset Balance:**
1. Go to **Savings** screen
2. Click **"Reset Balance"**
3. Confirm reset
4. Balance set back to ₱0

#### View Financial Summary
1. Go to **Summary** screen
2. See overview of:
   - Total spending this month
   - Budget remaining
   - Savings progress
   - Expense breakdown by category

#### Update Your Profile
1. Go to **Profile** screen
2. Click **"Edit Profile"**
3. Update:
   - Username
   - Profile picture
   - Other details
4. Click **"Save"**
5. Changes apply immediately

#### Backup Your Data
1. Go to **Home** screen
2. Click menu (☰) at top
3. Click **"Backup Now"**
4. Data syncs to cloud if internet available
5. See confirmation message

#### Getting Financial Tips
1. On **Home** screen
2. Scroll to "Daily Tip" section
3. Read financial advice
4. Click **"Get New Tip"** for another tip

#### Change Settings
1. Go to **Settings** screen
2. Options include:
   - Theme preference
   - Notifications
   - Currency
   - Privacy settings

#### View App Information
1. Go to **About** screen
2. See app version and features
3. Contact information

### Offline Usage

- App works fully offline
- All data stored locally on device
- Changes sync automatically when internet restored
- Manual backup option available

## Security & Privacy

- **Password Protected**: Your account secured with encrypted passwords
- **Secure Cloud**: Data stored securely with Supabase
- **Personal Data**: Your financial data never shared
- **Local Storage**: Sensitive data encrypted on device

## Troubleshooting

### Can't Login
- Check email and password are correct
- Verify internet connection
- Try resetting password

### Expenses Not Saving
- Check internet connection (for sync)
- Verify all fields are filled
- Try closing and reopening app
- Check app storage space

### Budget Not Updating
- Refresh home screen
- Check internet connection
- Verify amount entered is valid number

### Savings Goal Not Appearing
- Check goal name and amount are entered
- Ensure amount is greater than 0
- Try refreshing savings screen

### Data Not Syncing
- Check internet connection
- Try manual backup: Menu → Backup Now
- Close and reopen app
- Check Supabase is online

### Profile Picture Not Uploading
- Check image file size (should be under 5MB)
- Verify app has camera roll permissions
- Try different image
- Check storage space on device

## Features Breakdown

| Feature | Screen | Description |
|---------|--------|-------------|
| Expense Tracking | ExpenseList | View, edit, delete all expenses |
| Budget Setting | Home | Set and monitor monthly budget |
| Savings Tracker | Savings | Track savings with progress bar |
| Savings Goals | Savings | Create and monitor savings goals |
| Financial Tips | Home | Daily financial advice |
| User Profile | Profile | Manage personal information |
| Cloud Sync | All | Automatic data synchronization |
| Offline Mode | All | Full functionality without internet |
| Data Backup | Home | Manual backup to cloud |
| Category Tracking | ExpenseList | View expenses by category |

## Use Cases

### Student Budget Management
- Track daily spending as a student
- Set semester-based budget
- Monitor food and entertainment spending
- Save for books and supplies

### Emergency Fund Building
- Create "Emergency Fund" savings goal
- Use quick add buttons for regular deposits
- Track progress with visual indicators
- Reach 3-6 months expense coverage

### Debt Payoff
- Set savings goal for amount to pay
- Track monthly contributions
- Monitor progress toward debt freedom
- Adjust budget to increase payments

### Vacation Planning
- Create "Vacation Fund" goal
- Set target savings amount
- Track savings progress
- Adjust expenses to save faster

### Monthly Budget Tracking
- Set monthly budget at start of month
- Log expenses daily
- Monitor budget remaining
- Adjust spending as needed

## Supported Devices

- **iOS**: iPhone and iPad running iOS 13+
- **Android**: Devices running Android 8.0+
- **Web**: Any modern web browser (via Expo web)
- **Tablet**: Responsive design supports tablets

## Data Synchronization

Kaching uses Supabase for cloud synchronization:
- Automatic sync when app reopens with internet
- Manual backup option available
- Offline changes sync when connected
- No manual upload required
- Real-time updates across devices

## Data Storage

- **Local Storage**: AsyncStorage for offline functionality
- **Cloud Storage**: Supabase PostgreSQL database
- **Sync Status**: Indicator shows sync status
- **Auto-Backup**: Periodic automatic backups
- **Manual Backup**: Available from home menu

## Performance Tips

- Close unused apps to improve performance
- Clear app cache periodically
- Keep app updated to latest version
- Enable notifications for reminders
- Use quick amount buttons for faster input

## Support & Feedback

For issues or suggestions:
1. Check troubleshooting section above
2. Review app documentation
3. Contact development team

## Development Team

Built and developed by the Kaching! Development Team led by John Dalisay.

## License

Kaching is developed for educational purposes.

## Future Enhancements

- [ ] Bill payment integration
- [ ] Income tracking
- [ ] Budget recommendations
- [ ] Recurring expenses
- [ ] Multiple currency support
- [ ] Export reports to PDF
- [ ] Expense analytics dashboard
- [ ] Bill reminders and notifications
- [ ] Collaborative budgeting
- [ ] Dark mode
- [ ] App lockscreen protection
- [ ] Bank integration

---

**Version:** 1.1.0  
**Last Updated:** 2026  
**Status:** Active Development
