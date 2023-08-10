// Uvoz vseh potrebnih knjižnic, modulov in React komponent.
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './App.css';
import OblikovanjeComboboxov from './OblikovanjeComboboxov';

//kreiranja konstante/spremenljivke število strani ter konstanto za upravljanje njene vrednosti
//kreiranje komponente za določitev izbrane strani
function App() {
  const [stevStrani, setStevStrani] = useState(null);
  const [izbStran, setIzbStran] = useState(1);

  //funkcij, katera se izvede ob uspešnem nalaganju pdf-ja ter določitev število strani ter določi za itbrano stran prvo stran
  function uspesnostNalaganja({ stevStrani }) {
    setStevStrani(stevStrani);
    setIzbStran(1);
  }

  //določitev razdelka med stranmi
  const prostorMedStranmi = 5;

  return (
    <div>
      <div>
        {/* Prikaz teksta iz pdf-ja ter določitev poti do želenega pdf-ja. */}
        <Document file="./poskus.pdf" onLoadSuccess={uspesnostNalaganja}>
          {/* Prikaz posamezne strani. */}
          <div className="objekt-strani">
            {Array.from(new Array(stevStrani), (el, index) => (
              <React.Fragment key={`page_${index + 1}`}>
                {index !== 0 && <div style={{ height: prostorMedStranmi }}></div>}
                <div>
                  {/* Določitev strani na kateri bo prikazan Dropdown forma, in sicer na prvi strani, ter sam prikaz. */}
                  <Page pageNumber={index + 1}>
                    {index === 0 ? <OblikovanjeComboboxov /> : null}
                  </Page>
                </div>
              </React.Fragment>
            ))}
          </div>
        </Document>
      </div>
    </div>
  );
}

export default App;
