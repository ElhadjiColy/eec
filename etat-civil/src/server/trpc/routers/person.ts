import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { prisma } from "../prisma";
import { PersonType, Profession, Sexe } from "@prisma/client";


const defaultPersonSelect = {
  id: true,
  firstName: true,
  firstName1: true,
  firstName2: true,
  firstName3: true,
  firstName4: true,
  firstName5: true,
  lastName: true,
  birthDate: true,
  birthPlace: true,
  address: true,
  phone: true,
  email: true,
  profession: true,
  sexe: true,
  type: true,
  cni: true
};
export const personRouter = router({
  create: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        firstName1: z.string(),
        firstName2: z.string(),
        firstName3: z.string(),
        firstName4: z.string(),
        firstName5: z.string(),
        lastName: z.string(),
        birthDate: z.string(),
        birthPlace: z.string(),
        address: z.string(),
        phone: z.string(),
        email: z.string(),
        profession: z.nativeEnum(Profession),
        sexe: z.nativeEnum(Sexe),
        cni: z.string(), // Add the missing property 'cni'
        type: z.nativeEnum(PersonType) // Add the missing property 'type'
      })
    )
    .mutation(({ input }) =>
      prisma.person.upsert({
        where: {
          cni: input.cni,
        },
        create: {
          firstName: input.firstName,
          firstName1: input.firstName1,
          firstName2: input.firstName2,
          firstName3: input.firstName3,
          firstName4: input.firstName4,
          firstName5: input.firstName5,
          lastName: input.lastName,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          address: input.address,
          phone: input.phone,
          email: input.email,
          profession: input.profession,
          sexe: input.sexe,
          cni: input.cni, // Add the missing property 'cni'
          type: input.type // Add the missing property 'type'
        },
        update: {
          firstName: input.firstName,
          firstName1: input.firstName1,
          firstName2: input.firstName2,
          firstName3: input.firstName3,
          firstName4: input.firstName4,
          firstName5: input.firstName5,
          lastName: input.lastName,
          birthDate: input.birthDate,
          birthPlace: input.birthPlace,
          address: input.address,
          phone: input.phone,
          email: input.email,
          profession: input.profession,
          sexe: input.sexe,
          cni: input.cni, // Add the missing property 'cni'
          type: input.type // Add the missing property 'type'
        },
        select: defaultPersonSelect,
      })
    ),
  findUnique: publicProcedure.query((cni) => {
    return prisma.person.findUnique({
      where: {
        cni: cni.toString() // Convert cni to a string
      },
      select: defaultPersonSelect
    });
  }),
  list: publicProcedure.query(() => {
    return prisma.person.findMany({
      select: defaultPersonSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.person.delete({
        where: {
          id: input.id,
        },
        select: defaultPersonSelect,
      });
    }),
});
