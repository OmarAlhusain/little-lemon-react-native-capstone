# Little Lemon React Native Capstone

A complete Expo/React Native implementation for the Little Lemon food-ordering capstone.

## Included requirements

- First-launch onboarding with required first name and email
- Next button disabled until details are valid
- Persistent onboarding state using AsyncStorage
- Home screen with header, hero, search, menu breakdown, and food list
- Profile button in the Home header
- Profile screen pre-populated from onboarding data
- Persistent profile changes after app restart
- Back navigation from Profile to Home
- Logout clears the stored profile and onboarding state
- Menu data loaded from the Meta Little Lemon API
- Local SQLite menu cache
- Search by dish name
- Multi-select category filtering
- Name, description, price, and image for every menu item
- Little Lemon color palette and Karla / Markazi Text typography
- Wireframe image in `design/wireframe.jpg`

## Run

1. Install Node.js 22 or later.
2. Install dependencies:

```bash
npm install
```

3. Start Expo:

```bash
npx expo start
```

4. Open the QR code with Expo Go, or press `a` for Android emulator / `i` for iOS simulator.

## Test checklist

1. On a clean install, verify that Onboarding opens first.
2. Enter a first name and valid email. Verify Next becomes enabled.
3. Complete onboarding. Verify Home opens.
4. Close and reopen the app. Verify Home opens directly.
5. Open Profile from the Home header. Verify onboarding information is filled in.
6. Enter a phone number and tap Save changes.
7. Restart the app and confirm the phone number is still there.
8. Use Back to return to Home.
9. Search for `salad`; only Greek Salad should match.
10. Clear the search, select Mains and Desserts; Grilled Fish, Pasta, and Lemon Dessert should be shown.
11. Tap Log out. Verify onboarding appears again and old profile fields are cleared.
