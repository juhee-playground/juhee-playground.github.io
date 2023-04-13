# React - typescript 세팅

react - typescript app 생성

``` code
npx create-react-app 프로젝트명 --template typescript

또는

yarn create react-app 프로젝트명 --template typescript 
```

프로젝트 폴더로 이동  
`cd 프로젝트명`

- 정상 설치되었는지 확인  
`npm start` 또는 `yarn start`  
- github와 연결

```code
git remote add origin git@github.com:{username}/{repogitoryname}.git
git branch -M main
git push -u origin main
```

## 불필요한 파일 삭제

```text
/public
    index.html 주석 삭제 및 noscript 태그 삭제
    robots.txt 사용하지 않는 경우 삭제 
    logo192.png, logo512.png 삭제
```

```text
/src
    App.test.js 삭제
    logo.svg 삭제
    setupTest.tsx 삭제
    reportWebVitals.ts 삭제
    report-app-env.d.ts 삭제
    에러 위치 확인 후 import 코드 삭제
```

*환경변수 설정*
root 위치에 .. 파일 생성  
    .gitignore에 .env 추가  
    .env에 key 추가

``` javascript
    REACT_APP_DEVELOPMENT = https://api.sample.com
    REACT_APP_PRODUCTION = https://api.sample.com
```

*절대경로 사용을 위한 설정*
`@craco/craco` 및 `craco-alias` 설치

```code
    npm install @craco/craco
    npm install -D craco-alias
```

*root 위치에 `tsconfig.path.json` 파일 생성 및 아래 내용 저장*

```javascript
 //tsconfig.path.json
    {
     "compilerOptions": {
       "baseUrl": "./",
       "paths": {
         "@/*": ["src/*"]
       }
     }
    }
```

*root 위치에 `craco.config.js` 파일 생성 및 아래 내용 저장*

```javascript
    //craco.config.js
    const CracoAlias = require("craco-alias");
    
    module.exports = {
      plugins: [
        {
          plugin: CracoAlias,
          options: {
            source: "tsconfig",
            tsConfigPath: "tsconfig.paths.json",
          },
        },
      ],
    };
```

*`tsconfig.json` 파일에 extends 추가*

```javascript
    //tsconfig.json
{
    "extends": "./tsconfig.paths.json",
    "compilerOptions": {
    ...
    }
    "include": [
    "src",
    "tsconfig.paths.json"
    ]
}
```

*`package.json` 파일 수정*

```javascript
    //package.json
    "scripts": {
      "start": "craco start",
      "build": "craco build",
      "test": "craco test",
      "eject": "craco eject"
    },
```

## ESLint, Prettier란?

### ESLint는

- JavaScript, JSX의 정적 분석 도구 입니다.
- 코드를 분석해 문법적인 오류나 안티 패턴을 찾아주어 일관된 코드 스타일을 유지할 수 있도록 도와줍니다.
- 때문에 팀 프로젝트에서 코드컨벤션을 지키기위해 꼭 필요한 도구입니다.
- 확장성이 좋아 Airbnb Style Guide, Google Style Guide와 같은 확장 도구들을 적용할 수 있습니다.

#### Prettier는

- ESLint와는 조금 다르게 정해진 규칙에 따라 자동으로 코드 스타일을 정리 해주는 도구입니다.
- 직접 사용하면서도 적용이 가능하고, 코드를 작성하고 ctrl+S 를 눌러 저장할 때 자동으로 코드를 정리해줄 수도 있습니다.
- 가독성을 높이고 코드 스타일을 통일하는데 많은 도움을 줍니다.

## ESLint 설치 및 설정

> `npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser`
>`npm install -D eslint-config-airbnb eslint-config-airbnb-typescript eslint-config-prettier eslint-plugin-prettier`

### ESLint 설정 옵션 알아보기

- env
  - 사전 정의된 전역 변수 사용을 정의합니다.
  - 옵션들에 대한 설명은 [여기](https://eslint.org/docs/user-guide/configuring#specifying-environments)에서 확인해주세요.
- parser  
  - ESLint는 구문 분석을 위해 기본적으로 Espree 파서를 사용합니다.
  - `@typescript-eslint/parser`는 Typescript의 구문 분석을 합니다.
- plugin  
  - 원하는 규칙 집합을 확장해주는 역할을 합니다.
  - 플러그인 만으로는 규칙이 적용되지 않습니다.
  - ES6에서 제공되는 import를 추가
- extends  
  - 추가한 플러그인에서 사용할 규칙을 설정합니다.
- globals
  - 선언되지 않은 전역변수를 사용하는 경우 ESLin 경고가 발생하지 않도록 사용자 전역 변수를 추가할 수 있습니다.
- parserOptions
  - ESLint 사용을 위해 지원하려는 JavaScript 언어 옵션을 지정할 수 있습니다.
  - ecmaVersion: 사용할 ECMAScript 버전을 설정
  - sourceType: parser의 export 형태를 설정
  - ecmaFeatures: ECMAScript의 언어 확장 기능을 설정(jsx)
- rules
  - ESLin에는 프로젝트에서 사용하는 규칙을 수정할 수 있습니다.
- settings
  - ESLint 구성 파일에 설정 개체를 추가할 수 있으며, 실행될 모든 규칙에 제공됩니다.
  
*`.eslintrc` 파일을 ESLint 적용을 원하는 프로젝트의 root 경로에 생성(FE or BE 폴더)*

```javascript
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint","import"],
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "prettier/react",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  }, 
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "linebreak-style": 0,
    "import/no-dynamic-require": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "global-require": 0,
    "import/no-extraneous-dependencies": 0,
    "jsx-quotes": ["error", "prefer-single"],
    "react/jsx-props-no-spreading": 0, 
    "react/forbid-prop-types": 0,
    "react/jsx-filename-extension": [2, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    "import/extensions": 0,
    "no-use-before-define": 0, 
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "no-shadow": "off",
    "react/prop-types": 0,
    "no-empty-pattern": 0,
    "no-alert": 0,
    "react-hooks/exhaustive-deps": 0
  },
  "settings": { 
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".js"] 
    }, 
    "import/resolver": { 
      "typescript": "./tsconfig.json" 
    }
  }
}
```

## Prettier 설치 및 설정

> .eslintrc 와 똑같이 적용되길 원하는 프로젝트의 디렉토리에 `.prettierc` 파일을 만들어준다.

``` code
npm -D install prettier prettier-eslint
```

### .prettierc 파일내용

```json
{
  "parser": "typescript",
  "singleQuote": true,
  "printWidth": 110,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": true,
  "trailingComma": "all",
  "arrowParens": "always",
  "endOfLine": "auto",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "vueIndentScriptAndStyle": false 
}
```

*scss 사용*
`npm install node-sass`

*react router dom*
`npm install react-router-dom`
