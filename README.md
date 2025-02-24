# Personal Blog - React

This is a personal blog project developed with React. The goal is to create a web application where users can register, log in, create, edit, view, and delete posts and themes. This project uses a back-end API for data persistence, which can be found here: [API Repository]([https://github.com/seu-usuario/repositorio-da-api](https://github.com/iyumw/blog-pessoal)).

---

## 🌟 Features

### 👤 Users
- User registration (name, photo, email, and password).
- User login via email and password.
- Authentication for protected routes.

### 📰 Posts
- Create, edit, delete, and view posts.
- Display posts in a list and detailed view.

### 🌈 Themes
- Create, edit, delete, and view themes to categorize posts.

---

## ⚙️ Technologies Used

- **React**: JavaScript library for user interfaces.
- **React Router**: Routing management in the application.
- **Axios**: HTTP requests for the API.
- **Tailwind CSS**: Component styling.

---

## 🔧 Installation & Setup

### ✅ **Prerequisites**
Make sure you have installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### ⭐ **Steps to set up the project locally**

1. **Clone the repository**
   ```bash
   git clone https://github.com/iyumw/blogpessoal-react.git
   cd blogpessoal-react
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file at the root of the project and add:
   ```bash
   REACT_APP_API_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   The project will be available at: [http://localhost:3000](http://localhost:3000)

---

## 🌐 Project Structure

```
blogpessoal-react/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # Reusable components
│   ├── pages/           # Application pages
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── App.js           # Main component
│   ├── index.js         # Entry point
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```

---

## 📚 Contributing

Contributions are welcome! To contribute:

1. **Fork the project.**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/new-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Adding new feature'
   ```
4. **Push to the remote repository:**
   ```bash
   git push origin feature/new-feature
   ```
5. **Open a Pull Request.**

---

## 📧 Contact

If you have any questions or suggestions, feel free to reach out:

- **Author**: [Isis Okamoto](https://github.com/iyumw)
- **Email**: isis.yume2508@gmail.com

