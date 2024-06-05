import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


const defaultMotherSelect = Prisma.validator<Prisma.MotherSelect>()({
  cni: true,
  children: true,
});

const defaultFatherSelect = Prisma.validator<Prisma.FatherSelect>()({
  cni: true,
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
            connect: input.children.map((cni) => ({ cni })),
          },
          delegate_aux_person: {
            connect: {
              cni: input.delegate_aux_person,
            },
          },
        },
        select: defaultMotherSelect,
      })
    ),
  /*getMotherByCNI: publicProcedure.query((cni) => {
    return prisma.mother.findUnique({
      where: {
        delegate_aux_person: {
          cni: cni.toString(),
        },
      },
      select: defaultMotherSelect,
    });
    }),*/
  list: publicProcedure.query(() => {
    return prisma.mother.findMany({
      select: defaultMotherSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        cni: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.mother.delete({
        where: {
          cni: input.cni,
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
            connect: input.children.map((cni) => ({ cni })),
          },
          delegate_aux_person: {
            connect: {
              cni: input.delegate_aux_person,
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
        cni: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.father.delete({
        where: {
          cni: input.cni,
        },
        select: defaultFatherSelect,
      });
    }),
});
// export type definition of API
export type ParentRouter = typeof motherRouter;
export type FatherRouter = typeof fatherRouter;
