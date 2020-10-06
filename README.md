# Poodle Search 

#### Try out the demo [here](https://poodle-search-q0w6ixiac.vercel.app/)

![Poodle search demo](public/assets/images/poodle-demo-img.png)

This was part of a comapny coding challenge that I decided to replicate the popular search engine UI, have a guess which one that was. 

The serach querys a sometimes *SLOW* API (so the dog might run a few circles before the results load) this API has a limited database of existing demonstration files. 

My aim is to imporve the UI and make is have almost all the feature that the inspiration search engine has at the moment. 

### Technologies used: 
- React, React Hooks, React Router 
- Axios for HTTP requests

The biggest challenge here was moving from Class based compoents to using Hooks and refactoring the code for it to work with the new useState() hook. In the end it seems a lot more intuitive and the redability is improved ten-fold in my opinion. 

It was fun to implement the loading screen and attempt cloning the worlds most popular search engine UI. 

### Build deployment:
- CricleCI (❌ Attempted for a while then looked for alternative)
- Vercel (✅ Current working build)

Using Surge for deployment I was looking for a feature that would support the ability to store keys in the build without the need to create a server. After a number of attempts to setup a build on the CircleCI platform with using environment variables, reading thorough docs etc. I finally decided to look for alternatives and came across Vercel.

Vercel is an awesome solution for deploying apps, all it takes is just loggin in to your GitHub account and simply with two button clicks and pasting in your GitHub repository URL you can have your app up and running in minutes! 

It also allowed callable environment variables (process.env.SUPER_SECRET_PRIVATE_KEY **not really that super secret private when the API call is going out from the client**) within your application build. 

Hope you enjoy using the [demo](https://poodle-search-q0w6ixiac.vercel.app/).

p.s. Don't be evil. 