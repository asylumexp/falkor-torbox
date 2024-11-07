import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLanguageContext } from "@/contexts/I18N";
import AccountsTable from "@/features/accounts/components/table";
import { useSettings } from "@/hooks";
import SettingTitle from "../../title";
import SettingsContainer from "../container";
import AddAccountButton from "./addAccountButton";

const AccountSettings = () => {
  const { t } = useLanguageContext();
  const { settings, updateSetting } = useSettings();

  return (
    <div>
      <SettingTitle>{t("settings.titles.accounts")}</SettingTitle>

      <SettingsContainer>
        <div className="flex gap-4">
          <AddAccountButton />
          <div className="flex items-center space-x-2">
            <Switch
              id="use-accounts-for-downloads"
              checked={settings.useAccountsForDownloads}
              onCheckedChange={() =>
                updateSetting(
                  "useAccountsForDownloads",
                  !settings.useAccountsForDownloads
                )
              }
            />
            <Label htmlFor="use-accounts-for-downloads">
              {t("settings.settings.accounts_use_for_downloads")}
            </Label>
          </div>
        </div>

        <AccountsTable />
      </SettingsContainer>
    </div>
  );
};

export default AccountSettings;