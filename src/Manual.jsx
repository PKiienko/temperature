import React from 'react';

import './Manual.css';

const Manual = () => {
  return (
    <div className='manual-container'>
      <div>
        <img
          src={require('./assets/interface.png')}
          alt=''
        />
      </div>
      <div className='manual-description no-select'>
        <p>1. Поточне значення температур.</p>
        <p>2. Графік архівних значень температури.</p>
        <p>3. Календар чергувань охорони.</p>
        <p>4. Інструкція.</p>
        <p>5. Оновити значення температури.</p>
        <p>6. Вибір категорії об’єктів.</p>
        <p>7. Місцеположення термометра.</p>
        <p>8. Значення температури.</p>
        <p>9. Температура у нормі.</p>
        <p>10. Дата і час останнього вимірювання.</p>
        <p>11. Вихід температури за верхню межу.</p>
        <p>12. Значення не оновлювалося більше 5 хвилин.</p>
        <p>13. Вихід температури за нижню межу.</p>
      </div>
    </div>
  );
};

export default Manual;
