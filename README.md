# Application Setup

1. Position yourself using the terminal in the directory where you want the application to be stored.
2. Check if you have Git installed.
3. Run the command:
   ```bash
   git clone https://github.com/IvanCaleta/movies-app.git
4. Check if you have Node.js installed by running the command:
   ```bash
   node --version
5. If Node.js is not installed, download and install it using the following instructions:
    [Node.js and npm Installation Guide](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
6. After successful installation, navigate to the cloned directory by running:
   ```bash
   cd movies-app
7. Install all the required Node modules for this app by running:
   ```bash
   npm install
8. Create your own .env file in the /movies-app directory (not in any subdirectory).
9. Paste the following code into your .env file:
    ```bash
   REACT_APP_API_KEY = "<<YOUR_API_KEY>>"
   REACT_APP_API_URL = "<<YOUR_API_URL>>"
   REACT_APP_IMAGE_PATH = "<<YOUR_IMAGE_PATH>>"
   REACT_APP_VIDEO_URL = "<<YOUR_VIDEO_URL>>"
10. Save the .env file and run:
    ```bash
    npm start
11. Open [http://localhost:3000](http://localhost:3000) in your browser.



## Data sources used
1. For movie information: [The Movie Database (TMDb) API](https://www.themoviedb.org/documentation/api)
2. For streaming : [Pexels Videos](https://www.pexels.com/videos/)
