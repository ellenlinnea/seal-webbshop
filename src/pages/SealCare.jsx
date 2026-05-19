import './InfoPage.css'

function SealCare() {
  return (
    <div className="info">
      <p className="info__eyebrow">Sälvård</p>
      <h1 className="info__title">Att leva med<br />en <em>säl.</em></h1>
      <p className="info__lead">
        Grattis till ditt köp. Du äger nu en säl. Det är ett beslut vi respekterar,
        men vi vill vara ärliga med att det inte alltid är enkelt. Den här guiden
        är framtagen av Björn-Erik, som har levt med sälar i sju år och ännu
        inte funnit sig i det.
      </p>

      <div className="info__section">
        <h2 className="info__section-title">Boende & miljö</h2>
        <p className="info__section-text">
          Sälar trivs bäst nära vatten, helst salt. Om du bor i lägenhet: badkaret
          fungerar som temporär lösning, men räkna med att det inte längre är ditt badkar.
          Rumsrena sälar (se produktbeskrivning) kan vistas inomhus, men begreppet "rumsren"
          är något vi tolkar generöst. Stig, till exempel, är rumsren i teorin.
        </p>
        <p className="info__section-text">
          Placera inte sälen nära högtalare. De reagerar starkt på baskvalitet och
          har åsikter om musik som de gärna delar med sig av, högt, vid tre på natten.
        </p>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Mat & dryck</h2>
        <ul className="info__list">
          <li>Sill är grundpelaren i varje säls kost. Köp in i god tid</li>
          <li>Strömming är kontroversiellt — vissa sälar vägrar kategoriskt (se Stig)</li>
          <li>Lax accepteras men upplevs som lite pretentiöst av äldre sälar</li>
          <li>Kaffe ska aldrig erbjudas, men Stig har ändå börjat kräva det varje morgon</li>
          <li>Vatten ska vara kallt. Ljummet vatten är en förolämpning</li>
          <li>Ge aldrig sushi — det är fel nivå av bearbetning och skapar förväntningar</li>
        </ul>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Pälsvård</h2>
        <p className="info__section-text">
          Sälar ska inte borstas med vanlig borste — använd en bred kamning med händerna
          i pilriktningen, det vill säga bakåt mot stjärten. Om sälen growlar under
          proceduren gör du det åt fel håll. Om den somnar gör du det rätt.
        </p>
        <p className="info__section-text">
          Bada sälen minst tre gånger i veckan. De flesta sälar föredrar att bada själva
          och tar illa upp om man antyder att de inte gör det tillräckligt. Hantera
          detta diplomatiskt.
        </p>
      </div>

      <div className="info__section">
        <h2 className="info__section-title">Socialt beteende</h2>
        <ul className="info__list">
          <li>Sälar är sociala varelser och kräver uppmärksamhet, helst konstant</li>
          <li>En säl som ignoreras kommunicerar detta tydligt och ljudligt</li>
          <li>Måndag är en svår dag för de flesta sälar — planera inte något viktigt</li>
          <li>Om sälen stirrar på dig under längre tid är det antingen kärlek eller en maktdemonstration. Ofta båda</li>
          <li>Tillåt inte sälen att se på nyheter — de blir uppjagade och sover sämre</li>
        </ul>
      </div>

      <div className="info__box">
        <p className="info__box-title">Varningssignaler</p>
        <div className="info__box-rows">
          <div className="info__box-row">
            <span className="info__box-label">Sälen vägrar äta</span>
            <span className="info__box-value">Byt fisk. Det är fisken.</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Ovanligt tyst</span>
            <span className="info__box-value">Den planerar något</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Stirrar mot havet</span>
            <span className="info__box-value">Normal. Låt den hållas.</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Snarkar högt</span>
            <span className="info__box-value">Normalt. Köp öronproppar.</span>
          </div>
          <div className="info__box-row">
            <span className="info__box-label">Har tagit dina tofflor</span>
            <span className="info__box-value">De är borta nu. Acceptera det.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SealCare
