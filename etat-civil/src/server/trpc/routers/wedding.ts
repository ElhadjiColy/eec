import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { MentionsMarginalesRaison, PersonType, Prisma, RegimeMatrimonial, Sexe, WeddingType } from "@prisma/client";

const defaultWifeSelect = Prisma.validator<Prisma.WifeSelect>()({
  husbandId: true,
  delegate_aux_person: true,
});

export const wifeRouter = router({
  create: publicProcedure
    .input(
      z.object({
        husbandId: z.string(),
        delegate_aux_person: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.wife.create({
        data: {
          husband: {
            connect: {
              id: input.husbandId,
            },
          },
          delegate_aux_person: {
            connect: {
              id: input.delegate_aux_person,
            },
          },
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
  wife: true,
  delegate_aux_person: true,
});

export const husbandRouter = router({
  create: publicProcedure
    .input(
      z.object({
        wife: z.array(z.string()),
        delegate_aux_person: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.husband.create({
        data: {
          wife: {
            connect: input.wife.map((id) => ({ id })),
          },
          delegate_aux_person: {
            connect: {
              id: input.delegate_aux_person,
            },
          },
        },
        select: defaultHusbandSelect
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.husband.findMany({
      include: {
        delegate_aux_person: true,
      },
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


export const defaultWeddingSelect = Prisma.validator<Prisma.WeddingSelect>()({
  husbandId: true,
  wifeId: true,
  weddingType: true,
  weddingDate: true,
  regimeMatrimonial: true,
  mentionsLegales: true,
  registerNumber: true,
  registeredAt: true,
});

export const weddingRouter = router({
  create: publicProcedure
    .input(
      z.object({
        husbandId: z.string(),
        wifeId: z.string(),
        weddingType: z.nativeEnum(WeddingType),
        weddingDate: z.date(),
        regimeMatrimonial: z.nativeEnum(RegimeMatrimonial),
        mentionsLegales: z.array(z.nativeEnum(MentionsMarginalesRaison)),
        registerNumber: z.number(),
        registeredAt: z.date(),
      })
    )
    .mutation(({ input }) =>
      prisma.wedding.create({
        data: {
          husbandId: input.husbandId,
          wifeId: input.husbandId,
          weddingType: input.weddingType,
          weddingDate: input.weddingDate,
          registerNumber: input.registerNumber,
          registeredAt: input.registeredAt,
          regimeMatrimonial: input.regimeMatrimonial,
          mentionsLegales: input.mentionsLegales,
        },
        select: defaultWeddingSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.wedding.findMany({
      select: defaultWeddingSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
        husbandId: z.string(),
        wifeId: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.wedding.delete({
        where: {
          weddingId: {
            husbandId: input.husbandId,
            wifeId: input.wifeId,
          }
        },
        select: defaultWeddingSelect,
      });
    }),
});
