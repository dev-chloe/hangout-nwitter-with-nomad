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
    // fbase.js
    import { initializeApp } from "firebase/app";

    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID
    };

    const app = initializeApp(firebaseConfig);
    ```

    - Authentication setting
      - go Authentication section in firebase consloe
      - choose Sign-in providers(ex, google, email, github..)
      - github setting needs to set up in github.
        - settings > Developer settings > OAuth apps

    - Firestore Database setting
      - go Firestore Database section in firebase consloe
      - choose test mode or production mode
      - see cloude Firestore location 
        - asia-northeast1 Tokyo
        - asia-northeast2 Osaka
        - asia-northeast3 Seoul


2. [**dotenv**](https://www.npmjs.com/package/dotenv)
    > Node.js 서버의 포트, DB 관련정보등 다양한 정보를 .env 파일로 관리할 수 있게 해주는 Node.js 패키지이다.
    ```bash
    # dotenv
    npm install dotenv --save
    ```
    ```javascript
    // set .env 
    // .evn
    REACT_APP_API_KEY="__SENSITIVE__"
    REACT_APP_AUTH_DOMAIN="__SENSITIVE__"
    REACT_APP_PROJECT_ID="__SENSITIVE__"
    REACT_APP_STORAGE_BUCKET="__SENSITIVE__"
    REACT_APP_MESSAGING_SENDER_ID="__SENSITIVE__"
    REACT_APP_APP_ID="__SENSITIVE__"
    ```
    > env 파일에 선언한 변수를 process.env에 로드해주는 무의존성(zero-dependency) 모듈이다.  
    > create-react-app을 사용한 경우 환경변수를 설정할 때 'REACT_APP_"SOMETHING"'으로 이름을 붙여주어야 한다.(원칙)  
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

    > **그러나 create-react-app으로 만든 react 프로젝트의 경우 이미 dotenv 패키지가 내장되어 있어 별도의 추가나 설정 없이 .env 파일을 생성해 변수를 선언하는 것만으로 환경 변수를 사용할 수 있다.**  
    > **REACT_APP_로 시작하는 환경 변수만 읽도록 설정되어 있으므로 반드시 REACT_APP_로 시작해야 한다.**

    - [참조](https://db2dev.tistory.com/entry/React-Webpack%EC%9C%BC%EB%A1%9C-%EA%B5%AC%EC%B6%95%ED%95%9C-React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90%EC%84%9C-%ED%99%98%EA%B2%BD-%EB%B3%80%EC%88%98env-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0) 

3. [**ReactRouter**](https://reactrouter.com/)

    ```bash
    # react router
    npm install react-router-dom
    ```
    ```javascript
    // v6 
    <Route path="*" element={<Navigate replace to="/" />} />
    ```
    > 버전 6에서는 Redirect가 없애고 Routes안에는 Route만 넣을 것을 권고하고 있다.  
    > Redirect는 Route 아래 element 속성에 Navigate로 replace속성과 to="url" 속성을 넣어줘서 redirect가 가능하도록 한다.

    - [참조](https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb)