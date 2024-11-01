import { invoke } from "@/lib";
import { useQueryClient } from "@tanstack/react-query";

export const usePluginActions = (pluginId: string) => {
  const queryClient = useQueryClient();

  const reloadQueries = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["sources"],
      exact: false,
    });

    await queryClient.invalidateQueries({
      queryKey: ["plugins"],
    });
  };

  const disablePlugin = async () => {
    await reloadQueries();
    const disabled = await invoke("plugins:disable", pluginId);

    if (!disabled) return;

    return disabled;
  };

  const enablePlugin = async () => {
    await reloadQueries();
    const enabled = await invoke("plugins:enable", pluginId);

    if (!enabled) return;

    return enabled;
  };

  const uninstallPlugin = async () => {
    const uninstalled = await invoke("plugins:delete", pluginId);

    if (!uninstalled) return;

    await reloadQueries();

    return uninstalled;
  };

  return {
    disablePlugin,
    enablePlugin,
    uninstallPlugin,
  };
};
