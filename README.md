# Space Invaders 👾

Space Invaders in vanilla JavaScript.

I used [this guide](http://www.classicgaming.cc/classics/space-invaders/play-guide) to help set the specs for the feature set. See [the features list](./features.md), which is basically a roadmap for this project. So far, I've only done one of the dozens of features!!

It's deployed [here](https://space-invaderz.netlify.com/). Give it a whirl!

## Getting started

Install dependencies:
```
npm install
```

Run the app in dev mode:
```
npm start
```
This should open the app in a browser, but if it doesn't, take a look at http://localhost:8080/

Lint the code:
```
npm run lint
```
This checks for a (very few) usage rules, and then enforces a code style using Prettier. My philosophy is to keep the linting very simple. I'll add more linting rules if and when they solve a problem that I'm actually having. 


Build for production:
```
npm run build
```
Grab the stuff from ./dist and take it on the road.

## Play
Use the arrow keys to move your laser left and right. Hit the spacebar to fire a missile.

## Design

My goal is to stick to basic JavaScript. No frameworks, no libraries. I'm using Webpack, but added nothing beyond the most basic loaders needed to compile the js and html.