import { ShorterUrlRepository } from "@/infra/database/shorter-url.repository";
import { UniqueIdProvider } from "@/infra/providers/unique-id.provider";

export class ShortUrl {
  constructor(
    private readonly uniqueIdProvider: UniqueIdProvider,
    private readonly shortenedProvider: ShorterUrlRepository
  ) {}

  execute = async (url: string) => {
    const smallerUrl = this.uniqueIdProvider.execute();

    try {
      const response = await fetch(url);
      const created = await this.shortenedProvider.create({
        originalUrl: url,
        shortenedUrl: smallerUrl,
      });
      
      return created;
    } catch (e) {
      console.log("🚀 ~ ShortUrl ~ execute= ~ e", e);
      throw new Error(`${url} seems to not be a valid url`);
    }
  };
}
