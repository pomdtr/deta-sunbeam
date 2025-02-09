import { projects } from "./projects";
import { builds } from "./builds";
import { revisions } from "./revisions";
import { releases } from "./releases";

export async function builder(args: string[]) {
  switch (args[0]) {
    case "projects":
      return await projects();

    case "builds":
      return await builds(args.slice(1));

    case "revisions":
      return await revisions(args.slice(1));

    case "releases":
      return await releases(args.slice(1));

    default:
      return await projects();
  }
}
