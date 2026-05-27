# Kaching!
## Expense Tracker System

Kaching! is a mobile-based Expense Tracker System designed to help students, families, and small businesses manage their finances easily. The application promotes financial literacy by allowing users to track income, expenses, savings, and budgeting habits in a simple and user-friendly way.


---

# Overview

The Expense Tracker System provides users with tools to:

- Track daily income and expenses
- Monitor spending habits
- Set monthly budgets
- Visualize expenses through charts

The system is developed as part of a Technopreneurship and Mobile Programming project, combining practical software development with entrepreneurial concepts.

---

# Features

## Base Features

Available to all users:

- Add expenses manually
- Categorize expenses
  - Food
  - Transportation
  - Bills
  - School Expenses
  - Others
- Simple expense pie chart visualization
- Monthly budget setting
- Dashboard summary of spending

---

# Purpose of the System

Kaching! aims to:

- Help students avoid overspending
- Improve budgeting habits
- Encourage financial literacy
- Assist families in managing expenses
- Support small businesses in monitoring sales and costs

---

# Target Users

## Primary Users
- College students
- High school students

## Secondary Users
- Families
- Parents managing household expenses

## Tertiary Users
- Small businesses
- Microentrepreneurs
- Sari-sari store owners

---

# Technopreneurship Edge

The project integrates entrepreneurship concepts through the following business strategies:

## Freemium Subscription Model
- Free basic version
- Premium subscription simulation
- Estimated pricing:
  - ₱49–₱99/month

## Ads & Sponsorships
Potential advertising opportunities for:
- Local bookstores
- School canteens
- Cooperatives

## Institutional Adoption
Possible use by:
- Schools
- Barangays
- Community organizations

## Future Expansion
Possible future integrations:
- E-wallets
- Banking systems
- Automatic expense tracking

---

# Application Screens / UI Flow

## Splash Screen & Onboarding
- App logo
- Introductory slides
- Financial tips and app introduction

---

## Login / Sign Up
- Email and password authentication
- Google sign-in integration (future implementation)

---

## Dashboard
Displays:
- Remaining monthly balance
- Total expenses
- Total income
- Today's spending
- Quick Add Expense button

---

## Add Expense / Income
Input fields include:
- Amount
- Category
- Notes
- Payment method
  - Cash
  - E-Wallet

---

## Reports

### Free Version
- Pie chart of expenses by category

### Premium Version
- Advanced analytics
- Bar charts
- Spending trends
- Monthly comparisons

---

## Bill Reminders
- Upcoming due dates
- Reminder notifications
- Add/Edit/Delete reminders

---

## Profile & Settings
- User information
- Dark/Light mode toggle
- Upgrade to Premium button

---

# Technical Implementation

## Premium Simulation

Premium access is controlled using a flag:

```javascript
isPremium = true || false;
```

Conditional rendering is used to:
- Show premium-only features
- Lock advanced analytics
- Simulate subscription upgrades

---

# Data Storage

Possible storage implementations:
- SQLite
- SharedPreferences
- Firebase

---

# Navigation Flow

Example navigation structure:

```text
Dashboard → Add Expense → Reports → Profile
```

---

# Technologies Used

Possible technologies for implementation:

- React Native / Expo
- Firebase
- SQLite
- Figma
- JavaScript
- Android Studio

---

# Figma Prototype

The application UI is first designed in Figma to demonstrate:
- User interface flow
- Mobile responsiveness
- User experience design
- Feature simulation

---

# Future Improvements

Planned future enhancements:
- Real cloud synchronization
- AI-based budgeting tips
- QR payment tracking
- E-wallet integration
- Receipt scanning
- Multi-user budgeting
- Financial goal tracking

---

# Conclusion

Kaching! is a practical and beginner-friendly financial management application that combines mobile programming concepts with technopreneurship ideas. The project demonstrates how technology can help users improve financial discipline while also presenting a scalable business opportunity through a freemium model.

---

# Developers

Developed as a student project for:
- Mobile Programming
- Technopreneurship
- Software Development Practice

---

# License

This project is for educational purposes only.
