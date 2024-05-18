import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Logo from "/src/assets/radeef-logo.jpg";

export default function TemplateDecompteDefinitif({ data }) {
  if (!data) return <></>;
  // const total = data?.attachement[0].detailArticleAttachements?.reduce(
  //   (acc, e) => acc + e.qte * e.price_UT,
  //   0
  // );
  /************************** */

  let tableTemp = [];
  let tableArticle = [];
  data.decomptes.forEach((decompte) =>
    decompte.attachement.forEach((e) => {
      e.detailArticleAttachements.forEach((elem) => {
        let obj = {
          idActicleMarche: elem.detailArticleMarche.id,
          qteMarche: elem.detailArticleMarche.qte,
          priceMarche: elem.detailArticleMarche.price_UT,
          articleName: elem.detailArticleMarche.article.name,
          articleUnity: elem.detailArticleMarche.article.unity,
          // idAttachment: elem.id,
          qteAttachment: elem.qte,
          // priceAttachment: elem.price_UT,
        };
        tableTemp.push(obj);
      });
    })
  );

  tableArticle = [];

  const isExisted = (list, data) => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].idActicleMarche === data.idActicleMarche) return index;
    }
    return -1;
  };

  tableTemp.forEach((element) => {
    const index = isExisted(tableArticle, element);
    if (index > -1) {
      tableArticle[index].qteAttachment += element.qteAttachment;
    } else {
      tableArticle = [...tableArticle, element];
    }
  });


  /************************* */
  const total = tableArticle?.reduce(
    (acc, e) => acc + e.qteAttachment * e.priceMarche,
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
            {
              data?.decomptes[0]?.attachement[0]?.marche?.departement
                ?.nameDepartement
            }
          </p>
          <p>Division : </p>
          <p>Service : </p>
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          <div style={{ flex: 1 }}>
            <p>
              Titulaire du marché :{" "}
              {data?.decomptes[0]?.attachement[0]?.marche?.fournisseur?.name}{" "}
            </p>
            <p>
              Rib:{" "}
              {
                data?.decomptes[0]?.attachement[0]?.marche?.fournisseur?.ribs[0]
                  ?.rib
              }{" "}
            </p>
            <p>Ouvert à: </p>
            <p>
              Agence:{" "}
              {
                data?.decomptes[0]?.attachement[0]?.marche?.fournisseur?.ribs[0]
                  ?.agency
              }
            </p>
            <p>RC:</p>
            <p>
              N° CNSS:{" "}
              {
                data?.decomptes[0]?.attachement[0]?.marche?.fournisseur
                  ?.numberCNSS
              }
            </p>
            <p>
              Patente:{" "}
              {data?.decomptes[0]?.attachement[0]?.marche?.fournisseur?.patent}
            </p>
            <p>
              Identité Fiscale:{" "}
              {
                data?.decomptes[0]?.attachement[0]?.marche?.fournisseur
                  ?.identifyFiscal
              }
            </p>
            <p>
              ICE:{" "}
              {data?.decomptes[0]?.attachement[0]?.marche?.fournisseur?.ice}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <p>
              Marché N°:{" "}
              {data?.decomptes[0]?.attachement[0]?.marche?.numberMarche}
            </p>
            <p>
              Objet du marché :
              {data?.decomptes[0]?.attachement[0]?.marche?.libelle}
            </p>
            <p>
              Notifié le:{" "}
              {data?.decomptes[0]?.attachement[0]?.marche?.date_notif}
            </p>
            <p>Ordre de servicen°01:</p>
            <p>
              Attachement N° : du{" "}
              {data?.decomptes[0]?.attachement[0]?.date_works_start} au{" "}
              {data?.decomptes[0]?.attachement[0]?.date_works_end}{" "}
            </p>
            <br />
            <p>
              <b> Montant du décompte: {total*1.2} DHS TTC </b>
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
          <h4>DECOMPTE DEFINITIF</h4>
        </div>
        <>
          <Table
            sx={{
              // transform :"scale(0.9)" ,
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
            <TableHead
            // sx={{ border: "1px solid #000" }}
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
                <TableCell align="center">Qté réalisée</TableCell>
                <TableCell align="center">PU HT</TableCell>
                <TableCell align="center">PT HT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableArticle.map((e, i) => (
                <TableRow key={i}>
                  <TableCell scope="row" align="center">
                    <b>{i + 1}</b>
                  </TableCell>
                  <TableCell align="left" sx={{ flex: 3 }} width={"150px"}>
                    <b style={{ width: "100px" }}>{e.articleName}</b>
                  </TableCell>
                  <TableCell align="center">{e.articleUnity}</TableCell>
                  <TableCell align="center">{e.qteMarche}</TableCell>
                  <TableCell align="center">{e.qteAttachment}</TableCell>
                  <TableCell align="center">{e.priceMarche}</TableCell>
                  <TableCell align="center">
                    {e.priceMarche * e.qteAttachment}
                  </TableCell>
                </TableRow>
              ))}

              {/* *--------------------* */}
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Total Travaux Hors TVA</b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  {total} Dhs
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Total Travaux Hors TVA après rabais</b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  -{/* dhs */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Montant TVA 20%</b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                   {total*0.2 } Dhs
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Total Travaux TTC </b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                {total*1.2 } Dhs
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Total Avenants TTC</b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  -{/* dhs */}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left" colSpan={3}>
                  <b>Total y compris avenants</b>
                </TableCell>
                <TableCell align="center" colSpan={6}>
                  -{/* dhs */}
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
            paddingTop: "28px",
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
    </div>
  );
}
