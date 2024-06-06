import Javascript from '@/assets/icon/JavaScript.svg';
import NodeJS from '@/assets/icon/NodeJS.svg';
import Php from '@/assets/icon/PHP-Light.svg';
import ReactIcon from '@/assets/icon/React.svg';
import Typescript from '@/assets/icon/TypeScript.svg';
import Vue from '@/assets/icon/Vue.svg';

interface ISvgIcon {
  [key: string]: string;
}

export const SKILL_ICON: ISvgIcon = {
  Vue: Vue,
  React: ReactIcon,
  Javascript: Javascript,
  Typescript: Typescript,
  php: Php,
  NodeJS: NodeJS,
};
