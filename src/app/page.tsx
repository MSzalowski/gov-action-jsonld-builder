"use client";
import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { compact } from "jsonld";

const GOVERNANCE_ACTION_CONTEXT = {
  "@language": "en-us",
  CIP100:
    "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0100/README.md#",
  CIP108:
    "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0108/README.md#",
  hashAlgorithm: "CIP100:hashAlgorithm",
  body: {
    "@id": "CIP108:body",
    "@context": {
      references: {
        "@id": "CIP108:references",
        "@container": "@set" as const,
        "@context": {
          GovernanceMetadata: "CIP100:GovernanceMetadataReference",
          Other: "CIP100:OtherReference",
          label: "CIP100:reference-label",
          uri: "CIP100:reference-uri",
          referenceHash: {
            "@id": "CIP108:referenceHash",
            "@context": {
              hashDigest: "CIP108:hashDigest",
              hashAlgorithm: "CIP100:hashAlgorithm",
            },
          },
        },
      },
      title: "CIP108:title",
      abstract: "CIP108:abstract",
      motivation: "CIP108:motivation",
      rationale: "CIP108:rationale",
    },
  },
  authors: {
    "@id": "CIP100:authors",
    "@container": "@set" as const,
    "@context": {
      name: "http://xmlns.com/foaf/0.1/name",
      witness: {
        "@id": "CIP100:witness",
        "@context": {
          witnessAlgorithm: "CIP100:witnessAlgorithm",
          publicKey: "CIP100:publicKey",
          signature: "CIP100:signature",
        },
      },
    },
  },
};
const CIP_100 =
  "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0100/README.md#";
const CIP_108 =
  "https://github.com/cardano-foundation/CIPs/blob/master/CIP-0108/README.md#";

export default function Home() {
  const [title, setTitle] = React.useState("");
  const [abstract, setAbstract] = React.useState("");
  const [motivation, setMotivation] = React.useState("");
  const [rationale, setRationale] = React.useState("");
  const [jsonLd, setJsonLd] = React.useState("");

  const generateJsonLd = async () => {
    const doc = {
      [`${CIP_108}body`]: {
        [`${CIP_108}title`]: title,
        [`${CIP_108}abstract`]: abstract,
        [`${CIP_108}motivation`]: motivation,
        [`${CIP_108}rationale`]: rationale,
      },
      [`${CIP_100}hashAlgorithm`]: "blake2b-256",
      [`${CIP_100}authors`]: [],
    };

    const compacted = await compact(doc, GOVERNANCE_ACTION_CONTEXT);
    setJsonLd(JSON.stringify(compacted, null, 2));
  };

  return (
    <Box display="flex" flexDirection="row" minHeight="100vh">
      <Box flex={1} p={4} borderRight={1} flexDirection="column" display="flex">
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box height={8} />
        <TextField
          label="Abstract"
          variant="outlined"
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
        />
        <Box height={8} />
        <TextField
          label="Motivation"
          variant="outlined"
          value={motivation}
          onChange={(e) => setMotivation(e.target.value)}
        />
        <Box height={8} />
        <TextField
          label="Rationale"
          variant="outlined"
          value={rationale}
          onChange={(e) => setRationale(e.target.value)}
        />
        <Box height={8} />
        <Button variant="outlined" onClick={generateJsonLd}>
          Generate JSON-LD
        </Button>
      </Box>
      <Box flex={1} p={4}>
        <Typography variant="h4">JSON-LD</Typography>
        <pre>{jsonLd}</pre>
      </Box>
    </Box>
  );
}
