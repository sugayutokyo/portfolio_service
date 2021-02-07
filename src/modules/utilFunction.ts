/**
 * ランダムな文字列を生成する
 * @param randomNum 生成したい文字数
 *
 * @return ランダムな文字列(randomNum個)
 */
export const genRandomChar = (randomNum: number = 16): string => {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' // ランダムな文字列を作成する際に必要な文字列
  return Array.from(crypto.getRandomValues(new Uint32Array(randomNum))) // randomNum個の乱数を作成（Uint32Arrayで2^32の数字を表すことができる）
    .map((n) => S[n % S.length]) //S.lengthで割った余りを取得することでS[n % S.length]はSで定義された文字列のどれかを必ず示す
    .join('') // 配列を空文字で連結して文字列を返す
}

/**
 * モーダルのStyleを適用する
 */
export const applyModelStyle = () => {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}
