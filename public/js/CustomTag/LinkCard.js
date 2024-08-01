class LinkCard extends HTMLElement {

    // コンストラクタ
    constructor() {
        super();
        this._innerText = null;
    }

    // この変数に宣言された属性は、追加/削除/更新されたときに attributeChangedCallback が呼ばれる
    static observedAttributes = ["url"];

    // 属性値が更新されたら呼び出されるコールバック。
    attributeChangedCallback(name, oldValue, newValue) {
        this._innerText = newValue;
        this._updateRendering();
    }

    // JavaScript でタグ作成したときの属性パラメータ
    get url() {
        return this._innerText;
    }
    set url(v) {
        this.setAttribute("url", v);
    }

    // カスタム関数。ココでは Shadow DOM を宣言して、span タグを作って表示するだけ。
    _updateRendering() {
        this.innerHTML = null;
        let url = (this._innerText).replace(/”/g, "");

        fetch(url)
            .then(res => res.text())
            .then(text => {
                let head = new DOMParser().parseFromString(text, 'text/html').head.children;
                let metadata = {
                    title: '',
                    image: '',
                    description: '',
                }
                Array.from(head).map(k => {
                    const prop = k.getAttribute('property');
                    if (!prop) return;
                    // console.log(prop + " : " + k.getAttribute('content'))

                    switch (prop) {
                        case 'og:title':
                            metadata.title = k.getAttribute('content')
                            break;
                        case 'og:image':
                            metadata.image = k.getAttribute('content')
                            break;
                        case 'og:description':
                            metadata.description = k.getAttribute('content')
                            break;
                    }
                })

                let html =
                    `<a href={url} class="no-underline">
                        <div class="p-2 border-2 rounded-2xl shadow">
                            <div class="grid" style="grid-template-columns: 1.25fr 2.75fr">
                                <div class="border rounded-l-lg" style="
                                height: 9rem;
                                background-image: url('${metadata.image}');
                                background-repeat: no-repeat;
                                background-size: cover;
                                background-position: center center;">
                                </div>
                                <div class="grid grid-rows-2 pl-2">
                                    <div class="truncate font-bold text-xl">${metadata.title}</div>
                                    <span class="truncate"
                                          style="font-size: 0.75rem">${url.replace(/(http:\/\/)?(https:\/\/)?/, "")}</span>
                                    <span class="line-clamp-3 text-lg">${metadata.description ?? ''}</span>
                                </div>
                            </div>
                        </div>
                    </a>`;

                this.insertAdjacentHTML(
                    'beforebegin', html);
            })
    }
}

// カスタム要素として、ブラウザに登録する
customElements.define("link-card", LinkCard);