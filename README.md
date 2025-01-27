
# 🐶 Fetch Dog Shelter Test
🔴 [Live Link](https://ymmy1.github.io/fetch-dog-shelter-test)


---

## 🌟 Features

✅ **User Authentication**  
- Log in with your name and email to access the application.  
- Authentication is handled using cookies for secure session management.

✅ **Home Page**  
- Browse through a list of available dogs.  
- Filter dogs by breed (filters are stored in `localStorage` to persist between sessions).  
- Sort results alphabetically (ascending/descending) by breed.  
- Paginated results for smooth browsing.

✅ **Favorites Page**  
- Mark your favorite dogs using the ❤️ icon.  
- View and manage your favorite dogs in a dedicated page.  
- Favorites are stored in `localStorage` to remember selections between sessions.

✅ **Best Match**  
- Generate a **Best Match** from your favorite dogs.  
- Displayed in a special card with gold borders, a crown icon, and a larger design.

✅ **Mobile Responsiveness**  
- Fully responsive design for seamless use on mobile, tablet, and desktop devices.

---

## 📸 Screenshots

1. **Login Page**  
   ![Login Page Screenshot](https://i.imgur.com/cP35Qvf.png)

2. **Home Page**  
   ![Home Page Screenshot](https://i.imgur.com/TfIn4ZG.png)

3. **Favorites Page**  
   ![Favorites Page Screenshot](https://i.imgur.com/onsuHi8.png)

4. **Best Match Dog**  
   ![Best Match Dog Screenshot](https://i.imgur.com/TtWw7jn.png)

5. **Mobile Responsiveness**  
   <div style="display: flex; gap: 10px;">
     <img src="https://i.imgur.com/d7RWxIx.png" alt="Mobile Responsiveness Screenshot" width="200" />
     <img src="https://i.imgur.com/lOESTWJ.png" alt="Mobile Responsiveness Screenshot 2" width="300" />
   </div>

---

## 🛠️ Tech Stack

- **Framework**: React + TypeScript
- **Styling**: Emotion & MUI (Material-UI)
- **State Management**: Context API
- **API Integration**: Fetch API
- **Build Tool**: Vite
- **Hosting**: GitHub Pages

---

## 🚀 Installation & Setup

1. Clone the repository:  
   ```bash
   git clone https://github.com/ymmy1/fetch-dog-shelter-test.git
   ```

2. Navigate to the project directory:  
   ```bash
   cd fetch-dog-shelter-test
   ```

3. Install dependencies:  
   ```bash
   npm install
   ```

4. Start the development server:  
   ```bash
   npm run dev
   ```


---

## 🔧 Keys of Improvement

🔹 **Pagination for Favorites Page**  
   - Add pagination for the favorites list to improve usability when there are many favorite dogs.

🔹 **Image Resizing Optimization**  
   - Implement a better resizing tool to center and optimize all dog images for consistent display.

🔹 **Automatic Logout**  
   - Automatically log out users when the authentication cookie expires.

🔹 **Filter & Sorting for Favorites**  
   - Add the ability to filter and sort the favorites list for better management.

---

## 💡 Highlights

- **Dynamic Sorting & Filtering**  
  Users can sort and filter dog results with real-time updates. Filters are stored in `localStorage` to persist between sessions.

- **State Persistence**  
  Favorite dogs and filters are stored in `localStorage` for a seamless user experience.

- **Custom Components**  
  Reusable `DogCard` and `BestDogCard` for consistent UI.

- **Responsive Design**  
  Mobile-first approach for a polished experience across all devices.

---

## 📧 Contact

Made with care by [Oleg Nosyrev](https://github.com/ymmy1).  

