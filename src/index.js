const endpoint = "http://localhost:3000"

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  return getData()
    .then((data) => {
      const propertyData = data.propertyData;
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p><b>タイトル: </b>${propertyData.propertyName}</p>
          <p><b>タイプ: </b>${propertyData.propertyType}</p>
          <p><b>キャンセルポリシー: </b>${propertyData.cancelPolicy}</p>
          <p><b>部屋数: </b>${propertyData.roomNum}</p>
          <p><b>バスルーム数: </b>${propertyData.bathroomNum}</p>
          <p><b>一泊あたり: </b>${propertyData.priceInDollars}ドル</p>
          <p><b>ホスト: </b>${propertyData.host.firstName}</p>
        </div>
      `
    })
    .catch((e) => {
      mainEl.innerHTML = `
        <div className="property-info-wrapper">
          <p>${e.message}</p>
        </div>
      `
    })
}

/*fetchDataを呼び出し、responseのステータスを元にデータ取得成功か失敗かを判断しましょう。成功ならpropertyDataをPromise.resolveで返します。失敗ならエラーメッセージをPromise.rejectで返します。*/
function getData() {
  // fetchData()
  // .then((response) => {})
  // .catch((error) => {})
}

/*fetchを使ってデータを取得します。*/
function fetchData(propertyId) {// idでも意味が通じるので短くいきましょう。初期値は今回は既に1と代入しておいて大丈夫です
  // propertyのidを文字列の数値で入れるのではなく、引数で渡すと1件以上ある時でも対応しやすいです
  // ヒント: propertyのidを引数として用意しておくと良さそうですね
  const url = `${endpoint}/properties/${propertyId}`
  const initObj = {
    method: "GET",
    mode: 'cores',
    cache: 'default',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch(url, initObj)
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}