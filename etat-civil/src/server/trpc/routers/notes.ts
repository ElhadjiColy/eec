import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { Note } from '../../../note';
import { prisma } from '../prisma';
import { Prisma } from '@prisma/client';

let noteId = 0;
const notes: Note[] = [];
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
      /*notes.push({
        id: noteId++,
        note: input.note,
        createdAt: new Date().toISOString(),
      })*/
      prisma.note.create({
        data: {
          note: input.note,
        },
        select: defaultNoteSelect,
      })
    ),
  list: publicProcedure.query(() =>
    {
      /*return notes;*/
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
      /*const index = notes.findIndex((note) => input.id === note.id);
      notes.splice(index, 1);*/
      return prisma.note.delete({
        where: {
          id: input.id, // Convert input.id to a string
        },
        select: defaultNoteSelect,
      });
    }),
});
