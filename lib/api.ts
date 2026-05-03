import type { ColumbusRecruitmentData } from "@/types/columbus";

export async function getColumbusData(): Promise<ColumbusRecruitmentData> {
  const url = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  if (!url || !apiKey) throw new Error("Missing Columbus API env vars");

  const res = await fetch(url, {
    headers: { "x-api-key": apiKey },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
