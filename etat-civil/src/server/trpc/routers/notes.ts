import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { prisma } from "../prisma";
import { Prisma } from "@prisma/client";


const defaultNoteSelect = Prisma.validator<Prisma.NoteSelect>()({
  id: true,
  note: true,
  createdAt: true,
});
export const noteRouter = router({
  create: publicProcedure
    .input(
      z.object({
        note: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.note.create({
        data: {
          note: input.note,
        },
        select: defaultNoteSelect,
      })
    ),
  list: publicProcedure.query(() => {
    return prisma.note.findMany({
      select: defaultNoteSelect,
    });
  }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      return prisma.note.delete({
        where: {
          id: input.id,
        },
        select: defaultNoteSelect,
      });
    }),
});
