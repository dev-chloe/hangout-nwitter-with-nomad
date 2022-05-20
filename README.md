# Nwitter

Twitter (mini)clone with React and Firebase

## Project

### Initiation

```bash
# Create new react project
npx create-react-app hangout-nwitter-with-nomad
```

### Set dependencies

1. [**firebase**](https://firebase.google.com/)
    > 구글에서 운영하고 있는 웹, 모바일 개발 플랫폼이다.
    ```bash
    # firebase
    npm install --save firebase
    ```
    ```javascript
    // set SDK 
    // firebase.js
    import { initializeApp } from "firebase/app";

    const firebaseConfig = {
      apiKey: process.env.FB_API_KEY,
      authDomain: process.env.FB_AUTH_DOMAIN,
      projectId: process.env.FB_PROJECT_ID,
      storageBucket: process.env.FB_STORAGE_BUCKET,
      messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
      appId: process.env.FB_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    ```

2. [**dotenv**](https://www.npmjs.com/package/dotenv)
    > Node.js 서버의 포트, DB 관련정보등 다양한 정보를 .env 파일로 관리할 수 있게 해주는 Node.js 패키지이다.
    ```bash
    # dotenv
    npm install dotenv --save
    ```
    ```javascript
    // set .env 
    // .evn
    FB_API_KEY="__SENSITIVE__"
    FB_AUTH_DOMAIN="__SENSITIVE__"
    FB_PROJECT_ID="__SENSITIVE__"
    FB_STORAGE_BUCKET="__SENSITIVE__"
    FB_MESSAGING_SENDER_ID="__SENSITIVE__"
    FB_APP_ID="__SENSITIVE__"
    ```
    > env 파일에 선언한 변수를 process.env에 로드해주는 무의존성(zero-dependency) 모듈이다.  
    > React의 자바스크립트 파일은 node.js 그 자체가 아니기 때문에 필요한 패키지를 설치 후 import해서 의존적으로 사용하기 때문에 추가적인 파일 설정이 필요하다.
    ```javascript
    // set webpack.config 
    // webpack.config.js
    const webpack = require('webpack');
    const dotenv = require('dotenv');
      
    dotenv.config();

    module.exports = {
      plugins: [
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(process.env),
        })
      ]
    }
    ```
    > Webpack의 DefinePlugin을 사용해 process.env라는 전역 변수를 정의해준다.  

