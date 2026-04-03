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
  try {
    console.log("Recherche du token:", token.substring(0, 10) + "...");

    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = getDatabaseId();

    // Appel API direct pour la recherche
    const searchResponse = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        filter: {
          property: "Token",
          rich_text: {
            equals: token,
          },
        },
      }),
    });

    if (!searchResponse.ok) {
      const errorData = await searchResponse.json();
      console.error("Erreur recherche Notion:", errorData);
      throw new Error(`Notion API error: ${errorData.message}`);
    }

    const searchData = await searchResponse.json();
    console.log("Résultats trouvés:", searchData.results.length);

    if (searchData.results.length === 0) {
      console.log("Aucune inscription trouvée avec ce token");
      return false;
    }

    const page = searchData.results[0];
    console.log("Page trouvée:", page.id);

    // Appel API direct pour la mise à jour
    const updateResponse = await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        properties: {
          "Statut": {
            select: { name: "Confirmé" },
          },
        },
      }),
    });

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.error("Erreur mise à jour Notion:", errorData);
      throw new Error(`Notion API error: ${errorData.message}`);
    }

    console.log("Statut mis à jour avec succès");
    return true;
  } catch (error) {
    console.error("Erreur dans confirmInscription:", error);
    throw error;
  }
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

  // Utiliser databases.query au lieu de dataSources.query
  const response = await (getNotionClient() as any).databases.query({
    database_id: getDatabaseId(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    filter: filter as any,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.results.map((page: any) => {
    const properties = (page as unknown as { properties: NotionPageProperties }).properties;

    return {
      nom: properties["Nom"]?.rich_text?.[0]?.plain_text || "",
      prenom: properties["Prénom"]?.title?.[0]?.plain_text || "",
      standId: properties["Stand ID"]?.rich_text?.[0]?.plain_text || "",
      creneau: properties["Créneau ID"]?.rich_text?.[0]?.plain_text || "",
    };
  });
}
