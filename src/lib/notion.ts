import { Client } from "@notionhq/client";
import { InscriptionData } from "./validation";

// Initialisation lazy pour éviter les erreurs au build
let notion: Client | null = null;

function getNotionClient(): Client {
  if (!notion) {
    if (!process.env.NOTION_API_KEY) {
      throw new Error("NOTION_API_KEY non configurée");
    }
    notion = new Client({ auth: process.env.NOTION_API_KEY });
  }
  return notion;
}

function getDatabaseId(): string {
  if (!process.env.NOTION_DATABASE_ID) {
    throw new Error("NOTION_DATABASE_ID non configurée");
  }
  return process.env.NOTION_DATABASE_ID;
}

export async function createInscription(
  data: InscriptionData,
  token: string
): Promise<string> {
  const response = await getNotionClient().pages.create({
    parent: { database_id: getDatabaseId() },
    properties: {
      "Prénom": {
        title: [{ text: { content: data.prenom } }],
      },
      "Nom": {
        rich_text: [{ text: { content: data.nom } }],
      },
      "Email": {
        email: data.email,
      },
      "Rôle": {
        select: { name: data.role },
      },
      "Prénom enfant": {
        rich_text: [{ text: { content: data.prenomEnfant } }],
      },
      "Classe enfant": {
        select: { name: data.classeEnfant },
      },
      "Stand": {
        rich_text: [{ text: { content: data.standName } }],
      },
      "Stand ID": {
        rich_text: [{ text: { content: data.standId } }],
      },
      "Créneau": {
        select: { name: data.creneauLabel },
      },
      "Créneau ID": {
        rich_text: [{ text: { content: data.creneau } }],
      },
      "Commentaire": {
        rich_text: [{ text: { content: data.commentaire || "" } }],
      },
      "Statut": {
        select: { name: "En attente" },
      },
      "Token": {
        rich_text: [{ text: { content: token } }],
      },
      "Date inscription": {
        date: { start: new Date().toISOString() },
      },
    },
  });

  return response.id;
}

export async function confirmInscription(token: string): Promise<boolean> {
  // Rechercher la page avec ce token
  const response = await getNotionClient().dataSources.query({
    data_source_id: getDatabaseId(),
    filter: {
      property: "Token",
      rich_text: {
        equals: token,
      },
    },
  });

  if (response.results.length === 0) {
    return false;
  }

  const page = response.results[0];

  // Mettre à jour le statut
  await getNotionClient().pages.update({
    page_id: page.id,
    properties: {
      "Statut": {
        select: { name: "Confirmé" },
      },
    },
  });

  return true;
}

interface NotionPageProperties {
  "Prénom": { title: Array<{ plain_text: string }> };
  "Nom": { rich_text: Array<{ plain_text: string }> };
  "Stand ID": { rich_text: Array<{ plain_text: string }> };
  "Créneau ID": { rich_text: Array<{ plain_text: string }> };
}

export async function getConfirmedInscriptions(
  standId?: string,
  creneau?: string
): Promise<Array<{ nom: string; prenom: string; standId: string; creneau: string }>> {
  // Construire le filtre dynamiquement
  type PropertyFilter = {
    property: string;
    select?: { equals: string };
    rich_text?: { equals: string };
  };

  const filterConditions: PropertyFilter[] = [
    {
      property: "Statut",
      select: { equals: "Confirmé" },
    },
  ];

  if (standId) {
    filterConditions.push({
      property: "Stand ID",
      rich_text: { equals: standId },
    });
  }

  if (creneau) {
    filterConditions.push({
      property: "Créneau ID",
      rich_text: { equals: creneau },
    });
  }

  // Utiliser un filtre simple si une seule condition, sinon utiliser "and"
  const filter = filterConditions.length === 1
    ? filterConditions[0]
    : { and: filterConditions };

  const response = await getNotionClient().dataSources.query({
    data_source_id: getDatabaseId(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: filter as any,
  });

  return response.results.map((page) => {
    const properties = (page as unknown as { properties: NotionPageProperties }).properties;

    return {
      nom: properties["Nom"]?.rich_text?.[0]?.plain_text || "",
      prenom: properties["Prénom"]?.title?.[0]?.plain_text || "",
      standId: properties["Stand ID"]?.rich_text?.[0]?.plain_text || "",
      creneau: properties["Créneau ID"]?.rich_text?.[0]?.plain_text || "",
    };
  });
}
