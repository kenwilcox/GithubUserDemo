# GithubUserDemo
going from simple angular to building with gulp

I'd like to take the project data from GitHub's API and make it more like a resume with the list of languages I've played with, maybe a pie graph or something similar to show that I've used one more than the other.

## TODO
  - [x] get the users repo from GitHub API.
  - [x] cache that - currently local storage, but could use something else.
  - [x] figure out how to get the language data without going over the API usage calls.
  - [x] cache that^
  - [ ] go over the languages and calculate the percentages used
  - [ ] display it all pretty like

### Info
Store the repo's in a dictionary of repoName: {values}, get the data out like so...

```
  var repos = [];
  var repo = {"test": {url: "something.com", val: "value..."}};
  repos.push(repo);
  var obj = repos[0];
  obj[Object.keys(obj)[0]].url 
```