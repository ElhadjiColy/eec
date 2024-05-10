import { router } from "../trpc";
import { birthRouter } from "./birth";
import { noteRouter } from "./notes";

export const appRouter = router({
  note: noteRouter,
  birth: birthRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
