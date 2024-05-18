import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


const defaultMotherSelect = Prisma.validator<Prisma.MotherSelect>()({
  id: true,
  children: true,
});

const defaultFatherSelect = Prisma.validator<Prisma.FatherSelect>()({
  id: true,
  children: true,
});

export const motherRouter = router({
  create: publicProcedure
    .input(
      z.object({
        children: z.array(z.string()),
        delegate_aux_person: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.mother.create({
        data: {
          children: {
            connect: input.children.map((id) => ({ id })),
          },
          delegate_aux_person: {
            connect: {
              id: input.delegate_aux_person,
            },
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
        children: z.array(z.string()),
        delegate_aux_person: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.father.create({
        data: {
          children: {
            connect: input.children.map((id) => ({ id })),
          },
          delegate_aux_person: {
            connect: {
              id: input.delegate_aux_person,
            },
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
