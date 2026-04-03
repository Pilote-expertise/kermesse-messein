import { z } from "zod";

export const inscriptionSchema = z.object({
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  role: z.enum(["maman", "papa", "autre"]),
  prenomEnfant: z.string().min(2, "Le prénom de l'enfant doit contenir au moins 2 caractères"),
  classeEnfant: z.enum([
    "Petite Section",
    "Moyenne Section",
    "Grande Section",
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2",
  ]),
  commentaire: z.string().optional(),
  standId: z.string(),
  standName: z.string(),
  creneau: z.enum(["creneau1", "creneau2"]),
  creneauLabel: z.string(),
});

export type InscriptionData = z.infer<typeof inscriptionSchema>;
