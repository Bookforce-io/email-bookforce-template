import {
  Body,
  Button,
  Container,
  Head,
  Row,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Column,
  Section,
  Text,
  Font
} from "@react-email/components";
import * as React from "react";

const baseUrl = ""
export const StripeWelcomeEmail = () => (
  <Html>
    <Head>
    <Font
          fontFamily="Poppings"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
    </Head>
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Text style={titleContent}>
          CANCELACIÓN DENTRO DEL PLAZO
          </Text>
          <Text style={paragraph}>
            HOLA, Nombre del Cliente
          </Text>
          <br />
          <Text style={paragraph}>
          Queremos informarte que hemos procesado exitosamente la cancelación de tu compra de tickets. Las entradas solicitadas han sido anuladas de manera efectiva. 
          </Text>
          <Text style={paragraph}>
          A continuación, te proporcionamos el detalle de la operación:
          </Text>
          <br />
     
          <Row style={headingTable}>
                <Column >Detalle de la Cancelación</Column>
            </Row>
            
            <Row>
                <Column style={cellTableColumn} >Evento</Column>
                <Column style={{ ...cellTableColumn, ...cellTableColumnBorderRight }}>[Nombre del Evento]</Column>
            </Row>
            <Row>
                <Column style={cellTableColumn}>Fecha del Evento</Column>
                <Column style={{ ...cellTableColumn, ...cellTableColumnBorderRight }}>[Fecha del Evento]</Column>
            </Row>
            <Row>
                <Column style={cellTableColumn}>Número de Entradas Canceladas</Column>
                <Column style={{ ...cellTableColumn, ...cellTableColumnBorderRight }}>[Cantidad de Entradas]</Column>
            </Row>
            <Row>
                <Column style={cellTableColumn}>Importe Reembolsado</Column>
                <Column style={{ ...cellTableColumn, ...cellTableColumnBorderRight }}>[Monto Total Reembolsado]</Column>
            </Row>
            <Row>
                <Column style={cellTableColumn}>Costo por Servicio</Column>
                <Column style={{ ...cellTableColumn, ...cellTableColumnBorderRight }}>[Monto del Costo X Servicio]</Column>
            </Row>
            <br />
            <Text   style={paragraph}>
                Dado que realizaste la cancelación dentro del tiempo estipulado, recibirás un reembolso total de <b>[Monto Total Reembolsado + Monto del Costo por Servicio],</b> correspondiente a Cancelación Gratis.
            </Text>
            <br />
            <Text  style={paragraph} >
                El reembolso se efectuará a la tarjeta de crédito utilizada para la compra, y se reflejará en tu cuenta dentro de un plazo de 10 a 15 días hábiles.
            </Text>
            <br />
            <Text  style={paragraph}>
                Si ya has recibido un correo con la confirmación de tu cancelación, por favor omite este mensaje.
            </Text>
            <br />
            <Text  style={paragraph} >
                Saludos cordiales, <br />
                [Nombre de la Empresa]
            </Text>
            
          
          
        </Section>
      </Container>
    </Body>
  </Html>
);

export default StripeWelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const box = {
  padding: "0 48px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const paragraph = {
  color: "#707070",
  fontSize: "14px",
  textAlign: "left" as const,
  margin: "0",
  fontWeight: "100",
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const titleContent = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#000000",
  textAlign: "center" as const,
  marginBottom: "20px",
};

const headingTable = {
  backgroundColor: "#1C2858",
  height: '50px',
  textAlign: "center" as const,
  fontWeight: "bold",
  borderRadius: "5px 5px 0 0",
  color: "#fff",

};

const cellTableColumn = {
  width: "50%",
  height: '50px',
  color: '#707070',
  padding: '0 10px',
  borderLeft: "1px solid #E2E4E9",
  borderBottom: "1px solid #E2E4E9",
};
           
const cellTableColumnBorderRight = {
  borderRight: "1px solid #E2E4E9",
 
};
                
