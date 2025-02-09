import type { List, Listitem } from "sunbeam-types";
import { fetchSpace, getSpaceAppID } from "../../utils";
import type { Project, Build } from "../../types";

export async function builds(args: string[]): Promise<List> {
  const id = args[0] ?? getSpaceAppID();

  if (!id) {
    throw new Error("Expected 1 argument 'id'.");
  }

  const project = await fetchSpace<Project>(`apps/${id}`);
  const data = await fetchSpace<{ builds: Build[] }>(`builds?app_id=${project.id}`);
  const builds = data.builds.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return {
    type: "list",
    title: project.name,
    emptyView: {
      text: "No builds found.",
      actions: [
        {
          type: "reload",
          title: "Reload",
          key: "r",
        },
      ],
    },
    items: builds.map((b) => build(b)),
  };
}

function build(build: Build): Listitem {
  return {
    title: build.tag,
    id: build.id,
    subtitle: build.id,
    accessories: [build.status, new Date(build.created_at).toString()],
    actions: [
      {
        type: "copy",
        title: "Copy tag",
        text: build.tag,
      },
    ],
  };
}
