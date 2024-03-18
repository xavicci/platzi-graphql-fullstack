// import { createHash } from 'crypto'

// @ts-ignore
import type { Attributes, Avocado, PrismaClient, Prisma } from '@prisma/client'

type ResolverContext = {
  orm: PrismaClient,
}

export function findAll(
  parent: unknown,
  args: {skip?:number,take?:number,where:Prisma.AvocadoWhereInput},
  ctx: ResolverContext): Promise<Avocado[]> {
  return ctx.orm.avocado.findMany({
    include: {
      attributes: true,
    },
    skip:args.skip,
    take:args.take,
    where:args.where
  })
}

export function findOne(parent: unknown, args: { id: string }, ctx: ResolverContext): Promise<Avocado | null> {
  return ctx.orm.avocado.findUnique({
    where: { id: parseInt(args.id, 10) },
    include: {
      attributes: true,
    },
  })
}

export const resolver: Record<
  keyof (Avocado & { attributes: Attributes }),
  (parent: Avocado & { attributes: Attributes }) => unknown
> = {
  id: (parent) => parent.id,
  createdAt: (parent) => parent.createdAt,
  updatedAt: (parent) => parent.updatedAt,
  deletedAt: (parent) => parent.deletedAt,
  sku: (parent) => parent.sku,
  name: (parent) => parent.name,
  price: (parent) => parent.price,
  image: (parent) => parent.image,
  attributes: (parent) => ({
    description: parent.attributes.description,
    shape: parent.attributes.shape,
    hardiness: parent.attributes.hardiness,
    taste: parent.attributes.taste,
  }),
}

export function createAvo(
  parent: unknown,
  {
    data,
  }: { data: Pick<Avocado, 'name' | 'price' | 'image' | 'sku'> & Attributes },
  ctx: ResolverContext,
): Promise<Avocado> {
  const { name, sku, price, image, ...attributes } = data
  return ctx.orm.avocado.create({
    data: {
      name,
      price,
      image,
      sku,
      attributes: {
        create: {
          ...attributes,
        },
      },
    },
  })
}
