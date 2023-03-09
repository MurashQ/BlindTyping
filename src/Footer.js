import React from 'react';

function Footer(props) {
  return (
    <footer>
      <div className="footer-info">
        <h2>Информация</h2>
        <p>Русский текст сгенерирован на <a href="https://fish-text.ru">fish-text.ru</a></p>
        <p>Английские слова сгенерированы на <a href="https://random-word-api.herokuapp.com">random-word-api.herokuapp.com</a></p>
      </div>
      <div className="footer-links">
        <h2>Мои ссылки</h2>
        <p></p>
      </div>
    </footer>
    );
}
export default Footer;