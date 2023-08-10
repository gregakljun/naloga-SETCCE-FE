// Uvoz vseh potrebnih knjižnic in modulov.
import React, { useState, useEffect } from 'react';

// Kreiranje funkcije za oblikovanje Combobox-ov.
const OblikovanjeComboboxov = () => {
  // Kreiranje konstante za vsebovanje dobljenih podatkov JSON formata ter konstanta za spreminjanje le-te.
  const [apiPodatki, setApiPodatki] = useState([]);


  useEffect(() => {
    // pridobivanje podatkov na podlagi povezave do API-ja
    fetch('https://639335b5ab513e12c50722ff.mockapi.io/job')
      .then(response => response.json())
      .then(data => {
        const zacPodatki = data.length > 0 ? data[0] : null;
          setApiPodatki(zacPodatki.documentField);
      });
  }, []);

  //oblikovanje combobox-ov na podalgi pridobljenih podatkov.
  const oblikaDropdowna = (item) => {
    const { visualisation, comboboxExtras } = item.options;

    return {
      position: 'absolute',
      left: `${visualisation.location.x * 100}%`,
      top: `${visualisation.location.y * 100}%`,
      width: `${visualisation.width * 100}%`,
      height: `${visualisation.height * 100}%`,
      borderWidth: visualisation.borderWidth,
      borderColor: `rgba(${visualisation.borderColor}, 1)`,
      borderStyle: visualisation.borderStyle,
      fontSize: visualisation.fontSize,
      fontStyle: visualisation.fontStyle,
      color: `rgba(${visualisation.fontColor}, 1)`,
      padding: `${visualisation.padding}px`,
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
    };
  };

  return (
    <div>
      {apiPodatki.map((item, itemIndex) => (
        <div
          key={`combobox_${itemIndex}`}
          className="combobox"
          style={oblikaDropdowna(item)}
        >
          <select
            defaultValue={item.options.comboboxExtras.defaultOptionKey}
            style={{
              fontSize: `${item.options.visualisation.fontSize}px`,
              borderWidth: `${item.options.visualisation.borderWidth}px`,
              borderColor: `rgba(${item.options.visualisation.borderColor}, 1)`,
              borderStyle: item.options.visualisation.borderStyle,
              width: '100%',
              height: '100%',
            }}
          >
            {Object.entries(item.options.comboboxExtras.options).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default OblikovanjeComboboxov;
