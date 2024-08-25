const LOCAL_STORAGE_KEY = 'scannedProducts' as const; //as constは定数アサーション

// ローカルストレージからデータを取得
export const getFromLocalStorage = (): { name: string; brewery: string }[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  console.log(data);
  return data ? JSON.parse(data) : [];
};

// ローカルストレージにデータを保存
export const saveToLocalStorage = (newProduct: {
  name: string;
  brewery: string;
}) => {
  const products = getFromLocalStorage();

  // 重複チェック
  const isDuplicate = products.some(
    (product) =>
      product.name === newProduct.name && product.brewery === newProduct.brewery
  );

  if (!isDuplicate) {
    // 重複していなければ新しいデータを追加
    products.push(newProduct);

    // 10件以上になった場合に最初の要素を削除
    if (products.length > 10) {
      products.shift();
    }

    // 更新したデータをローカルストレージに保存
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
  }
};
