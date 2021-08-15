import React from "react";
import PropTypes from "prop-types";
import {NextSeo} from "next-seo";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import {openDB} from "../openDB";

export default function Faq({faq}) {
  return (
    <>
      <NextSeo title="FAQ" description="Frequently asked questions" />
      {faq.map((f) => (
        <Accordion allowMultiple key={f.id}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {f.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{f.answer}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const db = await openDB();
  const faq = await db.all("SELECT * FROM FAQ ORDER BY createDate DESC");
  return {
    props: {
      faq,
    },
  };
}

Faq.propTypes = {
  faq: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    }),
  ),
};
