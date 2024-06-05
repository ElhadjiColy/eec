import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


const defaultBirthSelect = Prisma.validator<Prisma.ChildSelect>()({
  cni: true,
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
              cni: input.father,
            },
          },
          mother: {
            connect: {
              cni: input.mother,
            },
          },
          delegate_aux_person: {
            connect: {
              cni: input.delegate_aux_person,
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
        cni: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.child.delete({
        where: {
          cni: input.cni,
        },
        select: defaultBirthSelect,
      });
    }),
});
