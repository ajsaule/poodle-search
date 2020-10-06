# Poodle Search 

#### Demo [here]()

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
- CricleCI (❌ Attempted for a numebr of hours then looked for alternative)
- Vercel (✅ Current working build)

Using Surge for deployment I was looking for a feature that would support the ability to store secret keys in the build without the need to create a server. Also eliminating the requirement for having to restrict requests that come from only my IP address so that key is protected. After a few hours of attempting to setup a build in CircleCI and reading docs, I decided to look for alternatives and came across Vercel.

Vercel allowed a quick and easy setup including callable (process.env.SUPER_SECRET_PRIVATE_KEY) within your application build. 

Hope you enjoy using the demo.

p.s. Don't be evil. 