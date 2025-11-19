# 🩸 Blood Donation Redirector 🚀

Welcome! This little app has a big mission: to get you to your local blood donation website, STAT! 🚑 Build this just have something to link to in my Discord Pofile. 

## 🤔 So, what does it do?

It's simple, really!

1.  It cleverly figures out what country you're in by checking your IP address. 
2.  It looks up the right blood donation website for your location from a handy list.
3.  It shows you a friendly "Get ready to redirect!" message for 5 seconds...
4.  **WHOOSH!** ✨ It sends you on your way to the donation site so you can save some lives.

## 🏃‍♀️💨 Getting Started

Ready to run this thing? All you need is Docker.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/) (The dynamic duo of containerization!)

### Let's Go!

1.  **Clone this project:**
    ```bash
    git clone https://github.com/Sir-BarBosh/blood-donation-redirector
    cd blood-donation-redirector
    ```

2.  **Fire it up!**
    Use this magic command to build and run the app in the background:
    ```bash
    docker-compose up -d --build
    ```

3.  **Visit the launchpad:**
    Open your browser and head to 👉 [http://localhost:9110](http://localhost:9110)

    You'll see our countdown, and then you'll be whisked away to your destination!

## 💻 Running Locally (without Docker)

If you prefer to run the application directly on your machine without Docker, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd blood-donation-redirector
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Access the application:**
    Open your web browser and head to [http://localhost:3000](http://localhost:3000).

    The application will run in development mode.

## ✅ Testing

This project does not currently include specific unit or integration tests. However, standard Next.js projects typically use testing frameworks like Jest or React Testing Library.

To build the project for production locally:

```bash
npm run build
npm run start
```

## 🛠️ Tinker Time! (Configuration)

Want to add more countries or change a URL? Easy peasy.

Just open up `src/data/donation-sites.json` and edit away!

## 🛑 All Done?

When you're finished, you can stop the container with:
```bash
docker-compose down
```

Thanks for checking it out! Now go be a hero. ❤️

### NOTE: Readme.md file written by AI because nobody got times for docs