import prisma from "."

type CreateParams = {
  originalUrl: string
  shortenedUrl: string
  title: string
}


export class ShorterUrlRepository {
  constructor() {}

  create = async ({originalUrl, shortenedUrl, title}: CreateParams) => {
    const alreadyExists = await prisma.shortenedUrl.findUnique({
      where: {
        originalUrl
      }
    })
    console.log("🚀 ~ ShorterUrlRepository ~ create= ~ alreadyExists:", alreadyExists)

    if(!!alreadyExists) {
      return alreadyExists
    }

    return await prisma.shortenedUrl.create({
      data: {
        originalUrl,
        shortenedUrl,
        title
      }
    })
  }

  getByShortenedUrl = async (shortenedUrl: string, incrementAccess?: boolean) => {
    const originalUrl =  await prisma.shortenedUrl.findUnique({
      where: {
        shortenedUrl
      }
    })

    if(!originalUrl) {
      return null
    }

    if(incrementAccess) {
      await prisma.shortenedUrl.update({
        where: {
          shortenedUrl
        },
        data: {
          accessCount: {
            increment: 1
          }
        }
      })
    }

    return originalUrl
  }

  getTopVisited = async (amount: number = 100) => {
    return await prisma.shortenedUrl.findMany({
      take: amount,
      orderBy: {
        accessCount: 'desc'
      }
    })
  }
}