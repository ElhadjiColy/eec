import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


const defaultBirthSelect = Prisma.validator<Prisma.ChildSelect>()({
  id: true,
  delegate_aux_person: true,
  father: true,
  mother: true,
});
export const birthRouter = router({
  create: publicProcedure
    .input(
      z.object({
        father: z.string(),
        mother: z.string(),
        delegate_aux_person: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.child.create({
        data: {
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
          delegate_aux_person: {
            connect: {
              id: input.delegate_aux_person,
            },
          },
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
