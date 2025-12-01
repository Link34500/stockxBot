import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  Interaction,
} from "discord.js";
import * as fs from "fs";
import * as path from "path";
import config from "@/config";

const localesPath = path.join(__dirname, "..", "..", "common", "locales"); // Assuming 'locales' folder is one level up from 'utils'

type TranslationData = {
  [key: string]: any;
};

let cachedTranslations: { [locale: string]: TranslationData } = {};

async function loadTranslations(locale: string): Promise<TranslationData> {
  if (cachedTranslations[locale]) {
    return cachedTranslations[locale];
  }

  const filePath = path.join(localesPath, `${locale}.json`);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const jsonData: TranslationData = JSON.parse(fileContent);
    cachedTranslations[locale] = jsonData;
    return jsonData;
  } catch (error: any) {
    console.error(
      `Error loading translation file for locale ${locale}:`,
      error.message
    );
    return {}; // Return an empty object to avoid crashing, handle missing translations gracefully.
  }
}

export async function translate(
  interaction: ChatInputCommandInteraction,
  key: string,
  context: { [key: string]: string } = {}
): Promise<string> {
  const locale = interaction.locale.slice(0, 2) ?? "en"; // Default to 'en' if no locale is provided
  const translations = await loadTranslations(locale);

  const keys = key.split(".");
  let value: any = translations;

  for (const k of keys) {
    if (value && typeof value === "object" && k in value) {
      value = value[k];
    } else {
      console.warn(`Translation key "${key}" not found in locale ${locale}.`);
      return key; // Return the key itself as a fallback
    }
  }

  if (typeof value === "string") {
    // Apply context replacements
    let translatedString = value;
    for (const key in context) {
      if (context.hasOwnProperty(key)) {
        const placeholder = new RegExp(`{${key}}`, "g");
        translatedString = translatedString.replace(placeholder, context[key]);
      }
    }
    return translatedString;
  } else {
    console.warn(
      `Translation key "${key}" does not resolve to a string in locale ${locale}.`
    );
    return key; // Return the key itself as a fallback
  }
}

// Helper function to apply context to a string
function applyContext(
  text: string,
  context: { [key: string]: string }
): string {
  let replacedText = text;
  for (const key in context) {
    if (context.hasOwnProperty(key)) {
      const placeholder = new RegExp(`{${key}}`, "g");
      replacedText = replacedText.replace(placeholder, context[key]);
    }
  }
  return replacedText;
}

export async function createEmbed(
  interaction: Interaction,
  key: string,
  context: { [key: string]: string } = {}
): Promise<EmbedBuilder> {
  const locale = interaction.locale.slice(0, 2) ?? "en";
  const translations = await loadTranslations(locale);

  const keys = key.split(".");
  let embedData: any = translations;

  for (const k of keys) {
    if (embedData && typeof embedData === "object" && k in embedData) {
      embedData = embedData[k];
    }
  }

  const embed = new EmbedBuilder();

  if (embedData?.title) {
    embed.setTitle(applyContext(embedData.title, context));
  }
  if (embedData?.description) {
    embed.setDescription(applyContext(embedData.description, context));
  }

  embed.setColor(embedData?.color ?? config.defaultColor);

  // Apply context to fields (if any)
  if (embedData?.fields && Array.isArray(embedData.fields)) {
    const fieldsWithContext = embedData.fields.map((field: any) => ({
      name: applyContext(field.name, context),
      value: applyContext(field.value, context),
      inline: field.inline || false, // Keep inline property
    }));
    embed.addFields(fieldsWithContext);
  }

  return embed;
}
