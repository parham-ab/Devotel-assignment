# Smart Insurance Application Portal

## Overview
Smart Insurance Application Portal is a React-based application that allows users to explore and apply for various types of insurance, including home, health, and car insurance. The application is built using Vite for fast development and utilizes modern libraries such as React Router, React Hook Form, and Tailwind CSS.

## Features
- User-friendly interface with Tailwind CSS.
- Multiple insurance options: Home, Health, and Car Insurance.
- Forms powered by `react-hook-form` and `yup` for validation.
- Toast notifications with `react-hot-toast`.
- Modular and reusable component structure.
- API fetching with custom hooks.

## Demo
Live demo: [Smart Insurance Application Portal](https://parham-ab-devotel-insurance-forms.netlify.app)

## Project Structure
```
Smart Insurance Application Portal
│── .env                 # Environment variables
│── .gitignore           # Git ignore file
│── eslint.config.js     # ESLint configuration
│── index.html           # Main HTML file
│── jsconfig.json        # JS Configuration file
│── LICENSE             # MIT License
│── package.json         # Project dependencies
│── package-lock.json    # Lock file for dependencies
│── README.md            # Documentation file
│── vite.config.js       # Vite configuration
│
├── public
│   ├── logo.svg         # Application logo
│
├── src
│   ├── components
│   │   ├── ErrorPage.jsx
│   │   ├── common
│   │   │   ├── CustomButton.jsx
│   │   │   ├── InsuranceBox.jsx
│   │   │   ├── PreLoader.jsx
│   │
│   ├── constants
│   │   ├── headerMenu.js
│
│   ├── hooks
│   │   ├── useFetch.jsx
│
│   ├── Layout
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── index.jsx
│
│   ├── pages
│   │   ├── HomePage
│   │   │   ├── index.jsx
│   │   │   ├── constants
│   │   │   │   ├── insuranceServices.js
│   │   ├── HomeInsurance
│   │   │   ├── index.jsx
│   │   │   ├── constants
│   │   │   │   ├── homeInsuranceOptions.js
│   │   │   ├── components
│   │   │   │   ├── HomeInsuranceForm.jsx
│   │   │   │   ├── HomeInsuranceLists.jsx
│   │   ├── HealthInsurance
│   │   │   ├── index.jsx
│   │   │   ├── constants
│   │   │   │   ├── healthInsuranceOptions.js
│   │   │   ├── components
│   │   │   │   ├── HealthInsuranceForm.jsx
│   │   │   │   ├── HealthInsuranceLists.jsx
│   │   ├── CarInsurance
│   │   │   ├── index.jsx
│   │   │   ├── constants
│   │   │   │   ├── carInsuranceOptions.js
│   │   │   ├── components
│   │   │   │   ├── CarInsuranceForm.jsx
│   │   │   │   ├── CarInsuranceLists.jsx
│
│   ├── routes
│   │   ├── index.jsx
```

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (latest stable version)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/parham-ab/Devotel-assignment.git
   ```
2. Navigate to the project folder:
   ```sh
   cd Smart-Insurance-Application-Portal
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and set the base URL:
   ```sh
   VITE_API_BASE_URL=your_api_base_url
   ```
5. Start the development server:
   ```sh
   npm run dev
   ```
6. Open `http://localhost:5173` in your browser.

## Scripts
- `npm run dev` - Start development server.
- `npm run build` - Build for production.
- `npm run preview` - Preview the production build.
- `npm run lint` - Run ESLint checks.

## Technologies Used
- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications

## License
This project is licensed under the MIT License.

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## Contact
For any inquiries, reach out to [Your Email] or open an issue in the repository.

