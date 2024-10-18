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
      <Preview>Finalizacion de demo bookforce</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Text style={titleContent}>
                Asunto: ¡Tu demo está por expirar! ¿Ya elegiste tu plan?
            </Text>
            <Text style={paragraph}>
                Esperamos que hayas disfrutado tu experiencia con Bookforce.io. Queremos recordarte que tu <strong> demo gratuito expirará en 48 horas.</strong>
            </Text>
            <br />
            <Text style={paragraph}>
            Para seguir disfrutando de todas las funciones y herramientas que Bookforce.io te ofrece, te invitamos a explorar nuestros planes y elegir el que mejor se ajuste a tus necesidades. Así, podrás seguir utilizando nuestra plataforma sin interrupciones.
            </Text>
            
            <br />
            <Text style={paragraph}>
                <strong>Explora nuestros Planes Bookforce [insertar link]</strong>
            </Text>
            <br />
            <Text style={paragraph}>
            Si tienes alguna pregunta o necesitas ayuda para elegir el plan ideal, no dudes en contactar a uno de nuestros ejecutivos [Enlace de contacto]. ¡Estaremos encantados de ayudarte!
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
                  
  