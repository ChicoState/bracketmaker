## Bracket Maker

## Developers
-Will Lyons, [wtlyons54](https://github.com/wtlyons54)
-Paul Davis, [paultherobert](https://github.com/paultherobert)
-Devang Raval, [DevangRaval1](https://github.com/DevangRaval1)
-Cameron Wright, [mrwrightcgw](https://github.com/mrwrightcgw)

## Get Node.js
# WSL / Ubuntu / Debian

- get NVM (node version manager)
```$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash```

- install nvm
```$ $HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion```



- Use NVM to install node.js
```$ nvm insatall node 16```

- download all the packages in package.json
```$ npm install```

- update browserslist
```$ npx browserslist@latest --update-db```

--------------------------------------
Once setup is complete these two commands are all you need to start a new dev session

-- build the project with node
```$ npm run build```

- spin up webserv
```$ npm run start```
