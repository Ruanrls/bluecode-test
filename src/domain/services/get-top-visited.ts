import { ShorterUrlRepository } from "@/infra/database/shorter-url.repository";

export class GetTopVisited {
  constructor(private readonly shortenedRepository: ShorterUrlRepository) {
  }

  execute = () => {
    const AMOUNT = 100
    return this.shortenedRepository.getTopVisited(AMOUNT)
  }
}