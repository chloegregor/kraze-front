import DrawerText from './drawerText';


export default function GuideSection( {sizes, composition, entretien, livraison}) {

  return (

  <>
    <DrawerText title ="GUIDE DES TAILLES">
      <div>
        {sizes?.map((size) => (
          <div key ={size.id}>
            <p>{size.symbole} - Tour de taille: {size.tour_de_taille}cm - Tour de poitrine: {size.tour_de_poitrine}cm</p>
          </div>
        ))}
      </div>
    </DrawerText >
    <DrawerText title="COMPOSITION">
      {composition?.map((compo) => (
        <div key={compo.id}>
          <p>{compo.pourcentage}% {compo.matiere.type}</p>
        </div>
      )
    )}
    </DrawerText>

    <DrawerText title="ENTRETIEN" >
      <p>{entretien}</p>
    </DrawerText>

    <DrawerText  title="LIVRAISON">
      <p className="last-center">{livraison.policy}</p>
    </DrawerText>

  </>
  )
}
