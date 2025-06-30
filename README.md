# Weather-App

The app is designed using Tailwind CSS and programmed using React. It is a responsive Weather application named Weatherly. 
The features of the app are as follows: 
1) It is responsive so it displays seamlessly on devices of all sizes.
2) It is a dynamic web application. It is coded such that it changes its background color based on the temeperature of the place the user is searching for.
3) It has toggle options(°C/°F) for displaying weather.
4) Search bar with auto-complete and suggestion feature.
5) Current location feature for displaying weather of user's current location.
6) It displays details about various metrics like humidity, wind, sunrise, sunset and various more features.
7) It displays 3-hour and daily weather forecast.
8) The system shows color-coded toast notifications like blue for fetching data, green after fetching data and red when the data is not fetched. 

**Instructions**
1. Clone the repository on your device or download the Zip folder. 
2. To run the file run the following commands in the terminal
3. Go to the destination folder i.e weather --> cd weather
4. then install the npm files ---> npm install
5. Then run the file --> npm run dev

**Steps to deploy website**

1. change folder using terminal --> cd weather
2. run command --> npm install gh-pages / npm install gh-pages --save-dev --> to install github pages
3. open vite.config.js and add --> base: '/Weather-App/'
4. open package.json and add --> "homepage": "https://vaibhaveegamit-20.github.io/Weather-App",
under scripts add --> "predeploy": "npm run build",
                      "deploy": "gh-pages -d dist"
5. push the changes to the repository using commands --> git add .
                                                     --> git commit -m "message"
                                                     --> git push origin main
6. run command --> npm run deploy
7. After the deploy command go to repository on github
8. In settings, go to pages option
9. Under Build and Deploy option --> In Branch option --> select gh-pages(branch) and /root(folder) --> click save
10. The website will be published.

