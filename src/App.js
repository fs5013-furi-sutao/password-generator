import './css/App.css';
import React, { useState } from 'react';
import { UppercaseLetters, LowercaseLetters, Symbols, Numbers } from './components/Characters'

function App() {

  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState(20);
  const [includeUp, setIncludeUp] = useState(false);
  const [includeLow, setIncludeLow] = useState(false);
  const [includeNum, setIncludeNum] = useState(false);
  const [includeSym, setIncludeSym] = useState(false);
  const [alert, setAlert] = useState('');
  const [isAlert, setIsAlert] = useState(false);

  const onChangeFunc = (e) => {
    setStrength(e.target.value);
  }

  const onBlurFunc = (e) => {
    if (e.target.value < 8) {
      e.target.value = 8;
      setIsAlert(true);
      setAlert('設定できる長さの最小値は 8 です');
      setTimeout(() => { setAlert(''); }, 2000);
    }

    if (e.target.value > 20) {
      e.target.value = 20;
      setIsAlert(true);
      setAlert('設定できる長さの最大値は 20 です');
      setTimeout(() => { setAlert(''); }, 2000);
    }
    
    setStrength(e.target.value);
  }

  const handlePassword = (e) => {
    let characterList = '';

    if (includeUp) {
      characterList += UppercaseLetters;
    }

    if (includeLow) {
      characterList += LowercaseLetters;
    }

    if (includeNum) {
      characterList += Numbers;
    }

    if (includeSym) {
      characterList += Symbols;
    }

    setPassword(createPassword(characterList));

    if (characterList === "") {
      setIsAlert(true);
      setAlert('どの文字を含めるか、指定してください');
      setTimeout(() => { setAlert(''); }, 1000);
    } else {
      setIsAlert(false);
      setAlert('パスワードを生成しました');
      setTimeout(() => { setAlert(''); }, 1000);
    }
  }

  const createPassword = (characterList) => {
    let password = '';
    const CharacterListLength = characterList.length;

    for (let i = 0; i < strength; i++) {
      const characterIndex = Math.floor(Math.random() * CharacterListLength);
      password += characterList.charAt(characterIndex);
    }

    return password;
  }

  const handleCopy = (e) => {
    navigator.clipboard.writeText(password);
    if (password.length > 0) {
      setIsAlert(false);
      setAlert('コピーしました！');
      setTimeout(() => { setAlert(''); }, 1000);

    } else {
      setIsAlert(true);
      setAlert('パスワードを生成してください');
      setTimeout(() => { setAlert(''); }, 1000);
    }
  }
  return (
    <div className="App">
      <div className="container">
        <div className="generator">
          <h1 className="generator_header">
            <i className="fas fa-key"></i> パスワード生成ツール
          </h1>
          <div className="generator_password">
            <h3>{password}</h3>
            <button onClick={handleCopy} className="copy_button">
              <i className="far fa-clipboard"></i>
            </button>
          </div>

          <div className="message_area">
            {isAlert && <p className='alert_Message'>{alert}</p>}
            {!isAlert && <p className='success_Message'>{alert}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password-strength">パスワードの長さ</label>
            <input
              defaultValue={strength}
              onChange={onChangeFunc}
              onBlur={onBlurFunc}
              type="number"
              id='password-strength'
              name="password-strength"
              max="20" min="8" step="1"
              
            />
          </div>

          <div className="form-group">
            <label htmlFor="uppercase-letters">大文字を含める</label>
            <input
              onChange={(e) => setIncludeUp(e.target.checked)}
              checked={includeUp}
              type="checkbox"
              id='uppercase-letters'
              className="ItemBox-CheckBox-Input"
              name="uppercase-letters"
            />
            <label htmlFor="uppercase-letters" className="ItemBox-CheckBox-Label"></label>
          </div>

          <div className="form-group">
            <label htmlFor="lowercase-letters">小文字を含める</label>
            <input
              onChange={(e) => setIncludeLow(e.target.checked)}
              checked={includeLow}
              type="checkbox"
              id='lowercase-letters'
              className="ItemBox-CheckBox-Input"
              name="lowercase-letters"
            />
            <label htmlFor="lowercase-letters" className="ItemBox-CheckBox-Label"></label>
          </div>

          <div className="form-group">
            <label htmlFor="include-symbols">記号を含める</label>
            <input
              onChange={(e) => setIncludeSym(e.target.checked)}
              checked={includeSym}
              type="checkbox"
              id='include-symbols'
              className="ItemBox-CheckBox-Input"
              name="include-symbols"
            />
            <label htmlFor="include-symbols" className="ItemBox-CheckBox-Label"></label>
          </div>

          <div className="form-group">
            <label htmlFor="include-numbers">数字を含める</label>
            <input
              onChange={(e) => setIncludeNum(e.target.checked)}
              checked={includeNum}
              type="checkbox"
              id='include-number'
              className="ItemBox-CheckBox-Input"
              name="include-number"
            />
            <label htmlFor="include-number" className="ItemBox-CheckBox-Label"></label>
          </div>
          <div className="generateBtn_Div">
            <button onClick={handlePassword} className="generator_btn">
              <i className="fa fa-cogs"></i>
              &nbsp;&nbsp;パスワードを生成する
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;