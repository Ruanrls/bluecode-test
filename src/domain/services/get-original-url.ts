import { ShorterUrlRepository } from "@/infra/database/shorter-url.repository";

export class GetOriginalUrl {
  constructor(private readonly shortenedRepository: ShorterUrlRepository) {
  }

  execute = async (shortenedUrl: string, shouldIncrementAccess?: boolean) => {
    const url = await this.shortenedRepository.getByShortenedUrl(shortenedUrl, shouldIncrementAccess)

    const originalUrl = url?.originalUrl
    return originalUrl
  }
}