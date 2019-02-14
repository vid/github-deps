# github-deps

NB this project generates a static view (using HTML/React components), and doesn't currently support private repos.

Generate graphs from github uses marked up with convention-using tags. Look at this repo's Issues to see how dependences are created.

![sample](Sample.png)


1. Set up config.js:

```
module.exports = {
	owner: 'Vid',
	repo: 'github-deps',
	dependsOn: 'DependsOn'
};
```

2. run `npm run gen`. This generates data files which are imported from the client-side pages in src.
3. run `npm run build` to build those pages.
4. Access those pages, for example, `npm install -g serve` then `serve -s build`.
