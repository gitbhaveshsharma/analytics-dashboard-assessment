# MapUp - Analytics Dashboard Assessment

![Site Preview](https://private-user-images.githubusercontent.com/73784964/402515267-b15669bb-7254-455b-a98e-b9a8d3f80480.jpg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzY3NjY1NDQsIm5iZiI6MTczNjc2NjI0NCwicGF0aCI6Ii83Mzc4NDk2NC80MDI1MTUyNjctYjE1NjY5YmItNzI1NC00NTViLWE5OGUtYjlhOGQzZjgwNDgwLmpwZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMTMlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTEzVDExMDQwNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWQzZTRmOTc1ZGQzOGYxNjc3MGZjOTJmNmQxYjBmMTM3ODNiNWYzN2Q2OGQzMDRjMTNlNjU0ODU5MTdiOTNhZTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.oo4GPcCKKapne1_q0CFF06RRC7RWQNYkChihXpKgcZA)
## Overview

This project is a comprehensive Electric Vehicle (EV) Analytics Dashboard for Washington State. It provides an interactive interface to visualize and analyze EV data, including vehicle distributions, geographical analysis, range analysis, and more.

# Analytics Dashboard

Visit the live site: [Analytics Dashboard](https://profound-belekoy-45abd2.netlify.app/)

This project is a Next.js TypeScript application for visualizing and analyzing data. It incorporates TailwindCSS for styling and leverages various components for building a responsive and dynamic dashboard.

https://profound-belekoy-45abd2.netlify.app/
---

## Features

1. *Data Upload*: Users can upload CSV files containing EV data.
2. *Preloaded Data*: Option to load a preloaded dataset for quick analysis.
3. *Sample Data*: Users can download a sample CSV file to understand the required data format.
4. *Interactive Filters*: Filter data by vehicle make and county.
5. *Summary Cards*: Display key metrics like total vehicles, average range, top make, and top model.
6. *Interactive Charts*:
   - Vehicle Type Distribution
   - Geographical Analysis (Top 10 Counties)
   - Electric Range Distribution
   - EV Adoption Trends
   - CAFV Eligibility Distribution
   - EV Distribution by Legislative District
   - EV Distribution by Utility Provider

## User Flow

1. *Initial Screen*: Upon opening the application, users are presented with the data upload screen. This screen includes:
   - An "Upload CSV" button to upload their own data file
   - A "Load Preloaded Data" button to use a pre-existing dataset
   - A "Download Sample" button to get a sample CSV file

2. *After Data Load*: Once data is loaded (either through upload or preloaded data):
   - The upload screen is replaced with the main dashboard
   - Users see summary cards with key metrics
   - Interactive charts are displayed
   - Filter options become available for further data exploration
  
## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

## Technologies Used

- *Next.js*: React framework for building the web application.
- *React*: JavaScript library for building user interfaces.
- *TypeScript*: Typed superset of JavaScript for improved developer experience.
- *Tailwind CSS*: Utility-first CSS framework for styling.
- *Chart.js*: JavaScript charting library for creating interactive charts.
- *Framer Motion*: Animation library for React.
- *Lucide React*: Icon set for React applications.
- *React-Toastify*: Library for adding toast notifications.

## Getting Started

1. Clone the repository:


## Package Installation

To install all necessary packages for this project, run the following command:
## Installation

To install the necessary dependencies, run the following command:

```sh
npm install
```
This command will install the following packages:

- next: The React framework for production
- react and react-dom: Core React libraries
- typescript: TypeScript language support
- @types/react and @types/node: TypeScript type definitions
- tailwindcss, postcss, autoprefixer: For Tailwind CSS styling
- chart.js and react-chartjs-2: For creating interactive charts
- framer-motion: For animations
- lucide-react: For icons
- react-toastify: For toast notifications
- @mui/material, @emotion/react, @emotion/styled: For Material-UI components (if used in the project)


After installing the packages, you may need to set up Tailwind CSS. Create a tailwind.config.js file in your project root if it doesn't exist:

```javascript
module.exports = {
  content: [
    "./app//*.{js,ts,jsx,tsx}",
    "./pages//*.{js,ts,jsx,tsx}",
    "./components//*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Also, make sure to include Tailwind directives in your CSS file (e.g., styles/globals.css):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Project Structure
```
analytics-dashboard/
├── .next/               # Next.js build output (auto-generated)
├── components/          # React components used across the application
├── data-to-visualize/   # Data files and utilities for data visualization
├── node_modules/        # Dependencies installed via npm
├── pages/               # Next.js pages (routes)
├── public/              # Static assets like images and icons
├── styles/              # Global and module-specific CSS files
├── types/               # TypeScript type definitions
├── utils/               # Utility functions for the app
├── .gitignore           # Git ignore rules
├── next-env.d.ts        # TypeScript environment declarations
├── next.config.ts       # Next.js configuration file
├── package-lock.json    # Dependency lock file
├── package.json         # Project metadata and dependencies
├── postcss.config.mjs   # PostCSS configuration
├── README.md            # Documentation for the project
├── tailwind.config.ts   # TailwindCSS configuration
```

## Overview

The objective of this assessment is to analyze the provided Electric Vehicle (EV) population data and create a frontend dashboard that visualizes key insights about the dataset. This repository contains the necessary data and instructions for you to demonstrate your analytical and dashboard creation skills. Feel free to use any tech stack you want to create the dashboard.

## Dataset

The Electric Vehicle Population dataset is available in the [Electric Vehicle Population Data (CSV)](./data-to-visualize/Electric_Vehicle_Population_Data.csv) within this repository, for more information about the dataset visit [kaggle dataset](https://www.kaggle.com/datasets/willianoliveiragibin/electric-vehicle-population).

**Note:** We've reduced the dataset in the repository to keep the data size small in the frontend bundle.

## Tasks

### Dashboard Creation:

- Create a frontend dashboard that presents key insights from the dataset.
- Design the dashboard to effectively communicate important metrics and visualizations.
- Include visual representations such as charts, graphs, or tables to showcase trends and relationships in the data.
- Ensure the dashboard is user-friendly and intuitive for exploring the dataset.

### Deployment:

- Deploy your frontend dashboard to a hosting platform of your choice.
- Make sure the dashboard is publicly accessible.

## Evaluation Criteria

Your submission will be evaluated based on:

- **Analytical Depth:** The depth of your analysis and insights derived from the dataset.
- **Dashboard Design:** Clarity, aesthetics, and usability of the frontend dashboard.
- **Insightfulness:** Effectiveness in conveying key insights about electric vehicles.

## Submission Guidelines

- Fork this repository to your GitHub account.
- Complete your analysis and create the frontend dashboard.
- Deploy the dashboard to a hosting platform.
- Update this [README.md](README.md) file with the URL to your live dashboard.
- **Repository Access:** Keep your repository private to avoid visibility by other candidates. Add the following email addresses as collaborators to the repository, these are our internal emails and will be evaluating your assessment:
  - vedantp@mapup.ai
  - ajayap@mapupa.ai
  - divyanshs@mapup.ai
- Finally, please fill out the google form that you received via email to submit the assessment for review.
