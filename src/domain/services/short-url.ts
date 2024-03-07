import { ShorterUrlRepository } from "../../infra/database/shorter-url.repository";
import { PuppeteerProvider } from "../../infra/providers/puppeteer.provider";
import { UniqueIdProvider } from "../../infra/providers/unique-id.provider";

export class ShortUrl {
  constructor(
    private readonly uniqueIdProvider: UniqueIdProvider,
    private readonly shortenedProvider: ShorterUrlRepository,
    private readonly puppeteerProvider: PuppeteerProvider
  ) {}

  execute = async (url: string) => {
    const smallerUrl = this.uniqueIdProvider.execute();
    
    console.log("🚀 ~ ShortUrl ~ execute= ~ url:", url)
    try {
      const {
        title,
      } = await this.puppeteerProvider.crawlContent(url);


      const created = await this.shortenedProvider.create({
        originalUrl: url,
        shortenedUrl: smallerUrl,
        title
      });
      
      return created;
    } catch (e) {
      console.log("🚀 ~ ShortUrl ~ execute= ~ e", e);
      throw new Error(`${url} seems to not be a valid url`);
    }
  };
}
