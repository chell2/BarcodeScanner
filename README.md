<div align="center">
<samp>

# ADA2nd 課題

💜  No.03  メモ帳 💜

</samp>
</div>



### 1.プロダクト名

「BEERBAN用:バーコードスキャナー」

### 2.課題内容（どんな作品？）

- ハッカソンで開発したビール[BEERBAN](https://www.canva.com/design/DAGNho9uiao/QX6LuQQR9JsrUZRs6-_yag/view?utm_content=DAGNho9uiao&utm_campaign=designshare&utm_medium=link&utm_source=editor)のための、バーコード読み取り機能です🍺

### 3.DEMO

- https://barcode-scanner-iota-one.vercel.app/
- テスト用バーコード：<br>
<img width="120" alt="BarcodeSample01" src="https://raw.githubusercontent.com/chell2/kadai03_memopad/main/public/barcode_sample1.jpg">  <img width="120" alt="BarcodeSample02" src="https://raw.githubusercontent.com/chell2/kadai03_memopad/main/public/barcode_sample2.jpg">  <img width="120" alt="BarcodeSample03" src="https://raw.githubusercontent.com/chell2/kadai03_memopad/main/public/barcode_sample3.jpg">  <img width="120" alt="BarcodeSample04" src="https://raw.githubusercontent.com/chell2/kadai03_memopad/main/public/barcode_sample4.jpg"><br>
※現時点ではテスト用バーコードのみ対応。最終的には、樽に貼ったバーコードを読み取って管理用DBから情報を取り出すことを想定しています。

### 4.作ったアプリケーション用のIDまたはPasswordがある場合

- なし

### 5.工夫した点・こだわった点

- バーコード読み取りがスムーズにいくよう工夫しているところです。
- そして、Next.jsのApp Routerとたたかっています...
- ローカルストレージを使って読み取り履歴を表示する際、重複データを省き、また、10件以上はデータを自動削除されるようにしました。

### 6.難しかった点・次回トライしたいこと(又は機能)

- バーコードを読み取る際、どうしても大量の回数の読み取りをおこなってしまうため、必要量のみの結果表示ができるようにするのが難しかったです。

- この読み取り結果を、リアルタイムで入力フォームに反映させられるようにしていきたい。

### 7.次回ミニ講義で聞きたいこと

- 

### 8.フリー項目（感想、シェアしたいこと等なんでも）

- 使用技術関連
  - [App Router](https://nextjs.org/docs/app)
  - [QuaggaJS](https://serratus.github.io/quaggaJS/#gettingstarted)

- 参考にした記事
  - [QuaggaJS+αであっさりバーコードリーダ&メーカ](https://zenn.dev/sdkfz181tiger/articles/f79b40d655b254)