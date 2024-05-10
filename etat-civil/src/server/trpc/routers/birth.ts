import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { PersonType, Prisma } from "@prisma/client";


const defaultBirthSelect = Prisma.validator<Prisma.ChildSelect>()({
  id: true,
  firstName: true,
  lastName: true,
  sexe: true,
  birthDate: true,
  birthPlace: true,
  type: true,
  father: true,
  mother: true,
});
export const birthRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        sexe: z.enum(["M", "F"]),
        father: z.string(),
        mother: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        type: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.child.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          sexe: input.sexe,
          father: {
            connect: {
              id: input.father,
            },
          },
          mother: {
            connect: {
              id: input.mother,
            },
          },
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          type: PersonType.Child,
        },
        select: defaultBirthSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.child.findMany({
      select: defaultBirthSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.child.delete({
        where: {
          id: input.id,
        },
        select: defaultBirthSelect,
      });
    }),
});
