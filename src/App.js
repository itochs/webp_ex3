import { useState } from "react"
import { fetchName } from "./api"

function Header() {
    return (
        <div>
            <header className="hero is-dark is-bold">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title">犬の年齢予測?</h1>
                    </div>
                </div>
            </header>
        </div>
    );
}

function Form(props) {
    function checkStr(str) {
        let reg = new RegExp(
            /^[0-9a-zA-Z]+$/
        );
        let res = reg.test(str);

        if (!res) {
            console.log("input again");
        }
        return res;
    }
    function nameSubmit(event) {
        event.preventDefault();
        const name = event.target.elements[0].value;
        if (!checkStr(name)) {
            console.log("faild")
        } else {
            props.onFormSubmit(name)
            event.target.elements[0].value = null;
        }
    }
    return (
        <div className="tile is-ancestor">
            <form className="tile is-parent" onSubmit={nameSubmit}>
                <div className="tile is-child">
                    <img
                        src="https://www.pakutaso.com/shared/img/thumb/SSK_minatabokkowosururetoribar_TP_V.jpg"
                        width="90%"
                        alt="sleepy dog"
                    />
                </div>
                <div className="tile is-vertical">
                    <div className="tile is-child" />
                    <div className="tile is-child">
                        <div className="content is-large">
                            <p>名前をつけてね．名前から年齢を予想するよ</p>
                            <label className="label">犬の名前</label>
                            <div className="control">
                                <input
                                    className="input is-medium"
                                    placeholder="ローマ字で入力 (例 poti)">
                                </input>
                                <button className="button" type="submit">Give a name</button>
                            </div>
                        </div>
                    </div>
                    <div className="tile is-child" />
                </div>
            </form>
        </div>
    );
}

function Result(props) {
    // have a name?
    if (props.name == null) {
        return (
            <div className="content is-medium" />
        );
    } else {
        // have a age?
        if (props.age == null) {
            return (
                <div className="content is-large">
                    <p>おっと，唯一無二の名前かもしれない．年齢は予想できなかった．申し訳ない．</p>
                    <p className="is-large"><strong>{props.name}</strong>? 個性的な名前だね．</p>
                </div>
            );
        } else {
            return (
                <div className="content is-large">
                    <p>OK．良い名前だと思う．</p>
                    <p>多分... <strong>{props.name}は{Math.floor(props.age / 4)}歳</strong>? どう思う?</p>
                </div>
            );
        }
    }
}

function Main() {
    const [name, setName] = useState(null);
    const [age, setAge] = useState(null);
    function reloadGetName(name) {
        console.log(`name is ${name}`)
        fetchName(name).then((data) => {
            console.log(`get data is`);
            console.log(data)
            setName(data.name);
            setAge(data.age);
        });
    }
    return (
        <div>
            <main>
                <section className="section">
                    <Form onFormSubmit={reloadGetName} />
                </section>
                <section className="section">
                    <Result name={name} setName={setName} age={age} setAge={setAge} />
                </section>
            </main>
        </div>
    );
}

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="content has-text-centered">
                    <p>
                        使用したAPIサイト : <strong><a href="https://agify.io/">agify</a></strong>
                    </p>
                    <p>
                        犬の画像 :
                        <strong>
                            <a href="https://www.pakutaso.com" title="フリー写真素材ぱくたそ" >フリー写真素材ぱくたそ </a>
                        </strong>
                    </p>
                    <p>このサイトは，日本大学文理学部情報科学科 Webプログラミングの演習課題で作成されたものです．</p>
                    <p>&copy; 5420042 伊東晴紀</p>
                </div>
            </footer>
        </div>
    )
}

function App() {
    console.log("start")
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;