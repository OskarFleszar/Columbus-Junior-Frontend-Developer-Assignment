import {
  ColumbusDataSchema,
  type ColumbusRecruitmentData,
} from "@/lib/schemas";

const REQUEST_TIMEOUT_MS = 8000;
const CACHE_REVALIDATE_SECONDS = 60;

export async function getColumbusData(): Promise<ColumbusRecruitmentData> {
  const url = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  if (!url || !apiKey) throw new Error("Missing Columbus API env vars");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      headers: { "x-api-key": apiKey },
      signal: controller.signal,
      next: { revalidate: CACHE_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      throw new Error(`Columbus API responded with ${res.status}`);
    }

    const json = await res.json();
    return ColumbusDataSchema.parse(json);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(
        `Columbus API request timed out after ${REQUEST_TIMEOUT_MS}ms`,
      );
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
