import "@/@types/accounts/torbox";
import { TorBoxAPI } from "./models/api";
import {
  TorBoxAddDdl,
  TorBoxAvailableDdl,
  TorBoxResponse,
  TorBoxDdlInfoResult,
} from "@/@types/accounts/torbox";

export class Webdl extends TorBoxAPI {
  constructor(accessToken: string) {
    super(accessToken);
  }
  public async getHashInfo(hash: string): Promise<TorBoxDdlInfoResult | null> {
    const currentDownloads = await this.getCurrent();

    if (currentDownloads?.length) {
      const foundInCurrent = currentDownloads.find(
        (webDownload) => webDownload.hash.toLowerCase() === hash.toLowerCase()
      );
      if (foundInCurrent) return foundInCurrent;
    }

    return null;
  }

  public async getCurrent(): Promise<TorBoxDdlInfoResult[] | null> {
    const response = await this.makeRequest<
      TorBoxResponse<TorBoxDdlInfoResult[]>
    >(`webdl/mylist?bypass_cache=true`, "GET", true);

    return response?.data || null;
  }

  public async instantAvailability(
    hash: string
  ): Promise<TorBoxAvailableDdl | null> {
    const response = await this.makeRequest<
      TorBoxResponse<TorBoxAvailableDdl[] | null>
    >(`webdl/checkcached?hash=${hash}&format=list`, "GET", false);

    if (response.data && response.data.length > 0) {
      return response.data[0];
    }

    return null;
  }

  public async addDDL(
    link: string,
    password?: string
  ): Promise<TorBoxAddDdl | null> {
    const body = new FormData();
    body.append("link", link);
    if (password) {
      body.append("password", password);
    }

    const response = await this.makeRequest<TorBoxResponse<TorBoxAddDdl>>(
      "webdl/createwebdownload",
      "POST",
      true,
      body
    );

    if (response.data) {
      return response.data;
    }
    return null;
  }

  public async getZipDL(ddlId: string): Promise<string | null> {
    const response = await this.makeRequest<TorBoxResponse<string | null>>(
      `webdl/requestdl?token=${this.accessToken}&web_id=${ddlId}&zip_link=true`,
      "GET",
      false
    );

    if (response.success && response.data) {
      return response.data;
    }

    return null;
  }

  public async delete(hash: string): Promise<boolean> {
    const torrent = await this.getHashInfo(hash);
    if (!torrent) {
      return false;
    }
    const body = new URLSearchParams({
      torrent_id: torrent.id.toString(),
      operation: "delete",
    });
    await this.makeRequest(
      `webdl/controlwebdownload`,
      "POST",
      true,
      body.toString()
    );
    return true;
  }
}
