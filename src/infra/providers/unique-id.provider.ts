import ShortUniqueId from "short-unique-id"

export class UniqueIdProvider {
  execute = () => {
    const uid = new ShortUniqueId({ length: 6})
    return uid.randomUUID()
  }
}