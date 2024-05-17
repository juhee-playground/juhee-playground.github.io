import  Vue from '@/assets/icon/Vue.svg';
import ReactIcon from '@/assets/icon/React.svg';
import Javascript from '@/assets/icon/JavaScript.svg';
import Typescript from '@/assets/icon/TypeScript.svg';
import Php from '@/assets/icon/PHP-Light.svg';
import NodeJS from '@/assets/icon/NodeJS.svg';


interface SvgIcon {
  [key: string]: string
}

export const skillIcon: SvgIcon = {
  Vue: Vue,
  React: ReactIcon,
  Javascript: Javascript,
  Typescript: Typescript,
  php: Php,
  NodeJS: NodeJS
}


