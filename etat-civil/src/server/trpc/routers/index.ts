import { router } from "../trpc";
import { birthRouter } from "./birth";
import { noteRouter } from "./notes";
import { fatherRouter, motherRouter } from "./parent";
import { personRouter } from "./person";
import { husbandRouter, wifeRouter } from "./wedding";

export const appRouter = router({
  note: noteRouter,
  birth: birthRouter,
  person: personRouter,
  mother: motherRouter,
  father: fatherRouter,
  wife: wifeRouter,
  husband: husbandRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
