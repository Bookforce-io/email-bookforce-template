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
      <Section style={{ background: '#1C2858', height: '10px', width: '100%' }}></Section>
        <Section style={box}>
        <br />
        <br />
        
          <Text style={paragraph}>
            Hola [Nombre del Cliente],
          </Text>
          <br />
          <Text style={paragraph}>
            Te escribo para agradecer tu apoyo a market/proveedor, tu compra marca una gran diferencia en nuestro crecimiento.
          </Text>
          <Text style={paragraph}>
          Nos encontramos en constante estado de evolución y mejora, es por esto, que queremos pedirte tu opinión. 
          </Text>
          <br />
          <Text style={paragraph}>
            ¡Comentarios de usuarios como tú nos ayudan a que futuros usuarios confíen en market/proveedor también!
          </Text>
          
     
 
        </Section>
        <Section style={mainButtonContainer}>
          <Button
              href="#"

              style={{ background: "#1C2858", color: "#fff", padding: "12px 20px", borderRadius: "5px", }}
          >
              Danos tu comentarios aquí
          </Button>
        </Section>
        <Section style={box}>
          <Text style={paragraph}>
          Estamos muy agradecidos por tu ayuda y apoyo.
            </Text>
            <Text style={paragraph}>
            Equipo  market 
            </Text>
        </Section>

        <Section style={footerContainer}>
          <Text style={TextFooter}>
            Muchas gracias
          </Text>
          <Text style={TextFooter}>
              Equipo | MARKET |
          </Text>
          
        </Section>
        
      </Container>
    </Body>
  </Html>
);

export default StripeWelcomeEmail;

const footerContainer = {
  textAlign: "center" as const,
  margin: "40px  0 0 0",
  backgroundColor: "#1C2858",
};

const TextFooter = {
  color: "#FFF",
  fontSize: "12px",
}

const mainButtonContainer = {
  textAlign: "center" as const,
  margin: "40px 0",
}

const main = {
  backgroundColor: "#f6f9fc",

  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "0px 0 0",
  marginBottom: "64px",
};

const box = {
  padding: "24px",
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
                
