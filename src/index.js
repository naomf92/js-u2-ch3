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
  fetchData().then((res) => {
    const json = res.json();
    //console.log(json);
    if (res.status !== 200) {
      json.then((result) => {
        console.log(result.message);
        return Promise.reject(result.message);
      })
    } else {
      //console.log();
      //return Promise.resolve();
    }
  })
}

/*fetchを使ってデータを取得します。*/
function fetchData(id=2) {// 検証のため、わざとAPIでJSON形式のデータが取得できないURLにリダイレクトさせます
  const url = `${endpoint}/properties/${id}`
  const initObj = {
    method: "GET",
    cache: 'default',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, initObj);
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", getData);
}