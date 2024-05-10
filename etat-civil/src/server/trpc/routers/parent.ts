import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { PersonType, Prisma, Sexe } from "@prisma/client";


const defaultMotherSelect = Prisma.validator<Prisma.MotherSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  birthDate: true,
  birthPlace: true,
  type: true,
  children: true,
});

const defaultFatherSelect = Prisma.validator<Prisma.FatherSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  birthDate: true,
  birthPlace: true,
  type: true,
  children: true,
});

export const motherRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        children: z.array(z.string()),
      })
    )
    .mutation(({ input }) =>
      prisma.mother.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          sexe: Sexe.F,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          type: PersonType.Mother,
          children: {
            connect: input.children.map((id) => ({ id })),
          },
        },
        select: defaultMotherSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.mother.findMany({
      select: defaultMotherSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.mother.delete({
        where: {
          id: input.id,
        },
        select: defaultMotherSelect,
      });
    }),
});

export const fatherRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        children: z.array(z.string()),
      })
    )
    .mutation(({ input }) =>
      prisma.father.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          sexe: Sexe.M,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          type: PersonType.Father,
          children: {
            connect: input.children.map((id) => ({ id })),
          },
        },
        select: defaultFatherSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.father.findMany({
      select: defaultFatherSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.father.delete({
        where: {
          id: input.id,
        },
        select: defaultFatherSelect,
      });
    }),
});
// export type definition of API
export type ParentRouter = typeof motherRouter;
export type FatherRouter = typeof fatherRouter;
