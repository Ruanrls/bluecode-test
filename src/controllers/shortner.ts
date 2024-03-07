import { GetOriginalUrl } from "@/domain/services/get-original-url";
import { ShortUrl } from "../domain/services";
import { Router, Response, Request } from "express";
import { GetTopVisited } from "@/domain/services/get-top-visited";

export class ShortnerController {
  public readonly router: Router;

  constructor(
    private readonly shortnerService: ShortUrl,
    private readonly getOriginalUrlService: GetOriginalUrl,
    private readonly getTopVisited: GetTopVisited
  ) {
    this.router = Router();

    this.router.post("/shortner", this.shortner);
    this.router.get("/shortner/:id", this.shortnedRedirect);
    this.router.get("/shortner", this.topVisited)
  }

  shortner = async (req: Request, res: Response) => {
    const url = req?.body?.url;

    if (!url) {
      return res.status(400).json({ message: "URL is required" });
    }

    const smallerUrl = await this.shortnerService.execute(url);
    return res.status(200).json({ shorten: smallerUrl });
  };

  shortnedRedirect = async (req: Request, res: Response) => {
    const { id } = req.params;

    const incrementAccess = true
    const originalUrl = await this.getOriginalUrlService.execute(id, incrementAccess);
    if (!originalUrl) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(originalUrl);
  };

  topVisited = async (req: Request, res: Response) => {
    const topVisited = await this.getTopVisited.execute();

    return res.status(200).json({ topVisited });
  };
}
