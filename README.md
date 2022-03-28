# Read Changelog 

Read the [changelog](./changelog.txt) to see details about the commits and observations

# Condor's React.js assessment challenge!

Welcome to Condor's React.js assessment challenge!

Please fork the repo to start. Once finished, issue a pull request to our repo so we can review your solution.

This challenge requires:

- NodeJS (> v14.7.0)
- NPM or Yarn
- A cup of ☕ or 🍵

The repo is pre-configured, so just by running `npm i` or `yarn`, should be able to install these basic packages:

- React Router + Axios: To fetch data and navigate through the site.
- Parcel + React.js: To serve and build a simple front-end.
- Json Server: To serve and expose a basic json db.

In the main `package.json` you'll have access to the following scripts:

- `npm run app`: To run the react app.
- `npm run server`: To start the local db.
- `npm run proxy`: To start the proxy ajax server.

You may use any other package of your choice to enrich your development experience.

## The challenge

> _Tasks are not ordered or weighted! Before coding, read all rhe items carefully and prioritize as you consider._

During the SOW meeting, our customer voiced these requests:

> We need a simple web site for our students.
>
> They should be able to select the university they are interested in and add it to a list to later compare their country's data.
>
> Nobody likes to study on a rainy day.

In response to our client's request, we made a simple Figma mockup that we need you to recreate. The images can be found in the `./graphics` folder with the name of the required screen and width, like `search`. Additionally, you may use the [basic prototype](https://www.figma.com/proto/K54hpF6ajDqzPHCQJ9xK8T/Untitled?page-id=0%3A1&node-id=3%3A694&viewport=241%2C48%2C0.25&scaling=scale-down&starting-point-node-id=3%3A694) for reference. 

Since this is the only wireframe, feel free to use any ui lib or style you like.

Do note that responsiveness has to perform correctly. We won't be evaluating design quality, but responsiveness-related-code quality.

Finally, if any design element does not comply with best practices, we expect you to take care of fixing it.

## The task

Using react and the apis referenced in the resources section, create a simple web app consisting of four screens:

1. Login: A login/register screen
1. Search: A universities search screen, with results
1. University country details

Aside from the screens, the app has to comply with the following specs:

- Search values have to be autocompleted with the correct (or close-to-correct) university name.
- A menu to go to the search page, the user profile, and logout.
- User data must include at least an email, password, and a universities list.
  > Use Json-server for this. Do not worry about hashing or security as this is only a basic local db. We just want to see how you handle the data.

Personal user data (like the email) may or may not be shown depending on your preference, but a way for the user to identify that he/she is logged in would be appreciated.

## What we'll be looking at

- Clean, formatted, readable, KISS, DRY code
- Commits structures and information
- Componentization and reusability
- State management
- API implementation
- UI-Logic detachment
- Error handling
- Design responsiveness
- Coding following the industry best practices
- UX patterns

## Submission Guidelines

Please fork the repo to start. 

Feel free to add or replace any package. The only one that is mandatory, is React.js.

Once finished, issue a pull request to our repo so we can review your solution.

## Resources

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/docs/en/v6)
- [Axios](https://axios-http.com/docs/intro): Fetch client
- [Parcel](https://parceljs.org/recipes/react/)
- [JSON Server](https://github.com/typicode/json-server#getting-started)
- [Hipolabs Universities API](https://github.com/Hipo/university-domains-list-api): An API and JSON list with domains, names and countries of most of the universities of the world.
- [RestCountries](https://restcountries.com/#api-endpoints-v3-name): Rest api with countries' data like latitude and longitude.
- [7Timer](https://github.com/Yeqzids/7timer-issues/wiki/Wiki): Weather data.