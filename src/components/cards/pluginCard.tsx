import { Button } from "@/components/ui/button";
import { useLanguageContext } from "@/contexts/I18N";
import { usePluginActions } from "@/hooks";

interface Props {
  image: string;
  banner?: string;
  description: string;
  name: string;
  id: string;
  version: string;

  installed?: boolean;
  disabled: boolean;
}

const PluginCard = ({
  image,
  name,
  id,
  version,
  description,

  installed = false,
  disabled,
}: Props) => {
  const { disablePlugin, enablePlugin, uninstallPlugin } = usePluginActions(id);
  const { t } = useLanguageContext();

  return (
    <div className="grid items-center gap-4 px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col items-start gap-4">
        <div className="flex self-start gap-3">
          <img
            src={image}
            alt={name}
            className="rounded object-contain size-[40px] bg-card-foreground"
          />
          <div className="flex flex-col items-start justify-end">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {id} - V{version}
            </p>

            <h3 className="text-sm font-semibold truncate">{name}</h3>
          </div>
        </div>

        <p className="text-xs font-medium text-left">{description}</p>
      </div>
      <div className="flex items-center justify-end gap-2">
        {disabled ? (
          <Button variant={"secondary"} onClick={enablePlugin}>
            Enable
          </Button>
        ) : (
          <Button variant={"destructive"} onClick={disablePlugin}>
            Disable
          </Button>
        )}

        {installed ? (
          <Button variant="destructive" onClick={uninstallPlugin}>
            {t("uninstall")}
          </Button>
        ) : (
          <Button variant="secondary">{t("install")}</Button>
        )}
      </div>
    </div>
  );
};

export default PluginCard;
