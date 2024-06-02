// FIXME: utils은 보통 함수들이 들어가 있기 때문에, 파스칼 케이스로 파일을 대부분 만들지 않습니다.
//        또한 tsx는 jsx 문법을 사용하여 export하는 파일의 확장자이기 때문에, util은 .ts로 해도 됩니다.
// FIXME: 함수명은 prefix로 동사를 사용합니다. 맞춰서 수정해주시면 좋을 것 같아요. 현재 파일명이 변경되어 formatter이기때문에, format~ 으로 해도 좋습니다.
export function firstLetterToUpper(string: string): string {
  return string.replace(/\b[a-z]/, letter => letter.toUpperCase());
}
