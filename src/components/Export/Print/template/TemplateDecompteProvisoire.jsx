import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Logo from "/src/assets/radeef-logo.jpg";

export default function TemplateDecompteProvisoire({ data }) {
  console.log("TemplateDecompteprovisoir -----> ", data);

  if (!data) return <></>;
  const total = data?.attachement[0]?.detailArticleAttachements?.reduce(
    (acc, e) => acc + e.qte * e.price_UT,
    0
  );
  const oldTotal = data?.attachement[0]?.detailArticleAttachements?.reduce(
    (acc, e) => acc + e.oldQte * e.price_UT,
    0
  );
  return (
    <div
      style={{
        fontSize: "11px",
        fontFamily: "serif",
        width: "100%",
        height: "auto",
        aspectRatio: " 3508/2480 ",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        // width: "2480px",
        // height: "3508px",
        // // transform:"scale(0.3)"
        // aspectRatio: " 3508/2480 ",
        //   background: "#fff",
      }}
    >
      {/* ---------------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          gap: "12px",
        }}
      >
        <div>
          <img src={Logo} alt="logo" width={"36px"} />
        </div>
        <div style={{ fontSize: "10px", fontWeight: "bold" }}>
          <p>REGIE AUTONOME INTERCOMMUNALE</p>
          <p>DE DISTRIBUTION D’EAU ET D’ELECTRICITE DE FES</p>
        </div>
      </div>
      {/* ---------------- */}
      <div style={{ fontWeight: "bold", padding: " 22px 0 12px" }}>
        <p>
          Département :{" "}
          {data?.attachement[0].marche.departement.nameDepartement}
        </p>
        <p>Division : </p>
        <p>Service : </p>
      </div>
      <div style={{ display: "flex", gap: "36px" }}>
        <div style={{ flex: 1 }}>
          <p>
            Titulaire du marché : {data.attachement[0].marche.fournisseur.name}{" "}
          </p>
          <p>Rib: {data.attachement[0].marche.fournisseur.ribs[0].rib} </p>
          <p>Ouvert à:</p>
          <p>
            Agence: {data.attachement[0].marche.fournisseur.ribs[0].agency}{" "}
          </p>
          <p>RC:</p>
          <p>N° CNSS : {data.attachement[0].marche.fournisseur.numberCNSS} </p>
          <p>Patente: {data.attachement[0].marche.fournisseur.patent} </p>
          <p>
            Identité Fiscale:{" "}
            {data.attachement[0].marche.fournisseur.identifyFiscal}{" "}
          </p>
          <p>ICE: {data.attachement[0].marche.fournisseur.ice} </p>
        </div>
        <div style={{ flex: 1 }}>
          <p>Marché N°: {data.attachement[0].marche.numberMarche} </p>
          <p>Objet du marché : {data.attachement[0].marche.libelle}</p>
          <p>Notifié le: {data.attachement[0].marche.date_notif} </p>
          <p>Ordre de service °01 : </p>
          <p>
            Attachement N° : du {data.attachement[0].date_works_start} au{" "}
            {data.attachement[0].date_works_end}{" "}
          </p>
          <br />
          <p>
            <b> Montant du décompte: {total * 1.2} DHS TTC </b>
          </p>
        </div>
      </div>
      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          padding: "24px  0",
          textDecoration: "underline",
        }}
      >
        <h4>DECOMPTE PROVISOIRE N° {data?.numberInsYear}</h4>
      </div>
      <>
        <Table
          sx={{
            // transform :"scale(0.9)" ,
            border: "1px solid #000",
            boxShadow: "none",
            "& td, & th": {
              borderLeft: "1px solid #000",
              borderRight: "1px solid #000",
              borderColor : "#000" , 

              py: 0.75,
              px: 1,
            },
            "& th ": { fontWeight: "bold", fontSize: "11px" },
            "& td ": { fontSize: "9px" },
          }}
          aria-label="simple table"
        >
          <TableHead
          // sx={{ border: "1px solid #88888855" }}
          >
            <TableRow>
              <TableCell align="center">N°</TableCell>
              <TableCell
                align="left"
                width={"212px"}
                sx={{ flex: 3, minWidth: "100px" }}
              >
                Nom d'article
              </TableCell>
              <TableCell align="center">Unité</TableCell>
              <TableCell align="center"> Qté Marché</TableCell>
              <TableCell align="center">Qté réalisée précédement </TableCell>
              <TableCell align="center">Qté réalisée attachement</TableCell>
              <TableCell align="center">Quantité Cumulée </TableCell>
              <TableCell align="center">PU HT</TableCell>
              <TableCell align="center">PT HT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.attachement[0].detailArticleAttachements?.map((e, i) => (
              <TableRow key={i}>
                <TableCell scope="row" align="center">
                  <b>{i + 1}</b>
                </TableCell>
                <TableCell align="left" sx={{ flex: 3 }} width={"150px"}>
                  <b style={{ width: "100px" }}>
                    {e?.detailArticleMarche.article.name}
                  </b>
                </TableCell>
                <TableCell align="center">
                  {e?.detailArticleMarche.article.unity}
                </TableCell>
                <TableCell align="center">
                  {e?.detailArticleMarche.qte}
                </TableCell>
                <TableCell align="center"> {e?.oldQte} </TableCell>
                <TableCell align="center"> {e?.qte}</TableCell>
                <TableCell align="center"> {e?.qte + e?.oldQte}</TableCell>
                <TableCell align="center" style={{ width: "50px" }}>
                  {e?.price_UT}
                </TableCell>
                <TableCell align="center" style={{ width: "80px" }}>
                  {e?.qte * e?.price_UT}
                </TableCell>
              </TableRow>
            ))}

            {/* *--------------------* */}
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <b>Totale DH/HT</b>
              </TableCell>
              <TableCell align="center" colSpan={6}>
                {total} dhs
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <b>Total Travaux Hors TVA après rabais </b>
              </TableCell>
              <TableCell align="center" colSpan={6}>
                {"-"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <b>TVA 20% </b>
              </TableCell>
              <TableCell align="center" colSpan={6}>
                {total * 0.2} dhs
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" colSpan={3}>
                <b>Totale DH/TTC</b>
              </TableCell>
              <TableCell align="center" colSpan={6}>
                {total * 1.2} dhs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>
      {/* <div
              style={{
                height:
                  heightTableDecompte > 500
                    ? 360 - heightTableDecompte + 500 - 100
                    : 0,
              }}
            ></div> */}
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          flexDirection: "column",
          padding: "0 5%",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            padding: "28px  1% 16px",
            textDecoration: "underline",
          }}
        >
          <h4>RECAPITULATION</h4>
        </div>
        <Table
          sx={{
            // transform :"scale(0.9)" ,
            maxWidth: "60%",
            border: "1px solid #88888855",
            boxShadow: "none",
            "& td, & th": {
              borderLeft: "1px solid #88888855",
              borderRight: "1px solid #88888855",
              py: 0.75,
              px: 1,
            },
            "& th ": { fontWeight: "bold", fontSize: "11px" },
            "& td ": { fontSize: "9px" },
          }}
          aria-label="simple table"
        >
          <TableBody>
            <TableRow>
              <TableCell align="left" sx={{ width: "50%" }}>
                <b>Total TTC</b>
              </TableCell>
              <TableCell align="center" sx={{ width: "50%" }}>
                {total * 1.2 + oldTotal * 1.2} dhs
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Total TTC des décomptes précédents</b>
              </TableCell>
              <TableCell align="center"> {oldTotal * 1.2} dhs </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Montant du décompte actuel</b>
              </TableCell>
              <TableCell align="center"> {total * 1.2} dhs </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Retenue de garantie</b>
              </TableCell>
              <TableCell align="center"> - </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">
                <b>Reste à payer</b>
              </TableCell>
              <TableCell align="center">
                {data.attachement[0].marche.montant -
                  (total * 1.2 + oldTotal * 1.2)}{" "}
                dhs
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ padding: "14px 0" }}>
          <b>
            Arrêté le présent décompte provisoire n° à la somme toutes taxes
            comprises de:
          </b>
        </div>
      </div>
      {/* <div
              style={{
                height:
                  heightTableDecompte > 100 && heightTableDecompte < 500
                    ? 250 - heightTableDecompte + 240 - 100
                    : 0,
              }}
            ></div> */}
      <div
        style={{
          paddingTop: "36px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              border: "1.2px solid #242424",
              height: "128px",
              flex: 1,
              borderRight: 0,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "11px",
                textDecoration: "underline",
              }}
            >
              <h4>Agents chargés de suivi de l'exécution du marché </h4>
            </div>
          </div>
          <div
            style={{
              border: "1.2px solid #242424",
              height: "128px",
              flex: 1,
              borderRight: 0,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "11px",
                textDecoration: "underline",
              }}
            >
              <h4>Chef de Service</h4>
            </div>
          </div>
          <div
            style={{
              border: "1.2px solid #242424",
              height: "128px",
              flex: 1,
              borderRight: 0,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "11px",
                textDecoration: "underline",
              }}
            >
              <h4>Chef de Division</h4>
            </div>
          </div>
          <div
            style={{
              border: "1.2px solid #242424",
              height: "128px",
              flex: 1,
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "11px",
                textDecoration: "underline",
              }}
            >
              <h4>Chef de Département</h4>
            </div>
          </div>
        </div>
        <div
          style={{
            border: "1.2px solid #242424",
            height: "122px",
            borderTop: 0,
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              textDecoration: "underline",
            }}
          >
            <h4>La Directrice Générale</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
