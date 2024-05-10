import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { PersonType, Prisma, Sexe } from "@prisma/client";

const defaultWifeSelect = Prisma.validator<Prisma.WifeSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  birthDate: true,
  birthPlace: true,
  type: true,
  address: true,
  husband: true,
});

export const wifeRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        children: z.array(z.string()),
        sexe: z.enum(["F", "M"]),
        address: z.string(),
        husbandId: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.wife.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          sexe: Sexe.F,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          type: PersonType.Wife,
          husbandId: input.husbandId,
          address: input.address
        },
        select: defaultWifeSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.wife.findMany({
      select: defaultWifeSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.wife.delete({
        where: {
          id: input.id,
        },
        select: defaultWifeSelect,
      });
    }),
});

export const defaultHusbandSelect = Prisma.validator<Prisma.HusbandSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  birthDate: true,
  birthPlace: true,
  type: true,
  wife: true,
  address: true,
});

export const husbandRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        address: z.string(),
        wife: z.array(z.string()),
        sexe: z.enum(["F", "M"]),
      })
    )
    .mutation(({ input }) =>
      prisma.husband.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          sexe: Sexe.M,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          type: PersonType.Husband,
          wife: {
            connect: input.wife.map((id) => ({ id })),
          },
          address: input.address,
        },
        select: defaultHusbandSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.husband.findMany({
      select: defaultHusbandSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.husband.delete({
        where: {
          id: input.id,
        },
        select: defaultHusbandSelect,
      });
    }),
});
