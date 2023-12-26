import type {
    IEditorModel,
    IPlayerModel,
    IContentMetadata,
} from "@lumieducation/h5p-server";
import { CONTENT_URL } from "../config";

export interface IContentListEntry {
    contentId: string;
    mainLibrary: string;
    title: string;
    originalNewKey?: string;
}

export interface IContentService {
    delete(contentId: string): Promise<void>;
    getEdit(contentId: string): Promise<IEditorModel>;
    getPlay(
        contentId: string,
        contextId?: string,
        asUserId?: string,
        readOnlyState?: boolean,
    ): Promise<unknown>;
    list(): Promise<IContentListEntry[]>;
    save(
        contentId: string,
        requestBody: { library: string; params: unknown },
    ): Promise<{ contentId: string; metadata: IContentMetadata }>;
    generateDownloadLink(contentId: string): string;
}

export class ContentService implements IContentService {
    /**
     *
     */
    constructor(protected baseUrl: string = "") {
        this.baseUrl += "/h5p";
        ``;
        const login = async () => {
            fetch(CONTENT_URL + "/login", {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    username: "admin",
                    password: "admin",
                }),
            })
                .then(async (res) => {
                    if (res.status === 200) {
                        const loginData = await res.json();
                        if (loginData.csrfToken) {
                            localStorage.setItem("csfr", loginData.csrfToken);

                            this.setCsrfToken(loginData.csrfToken);
                        }
                    }
                })
                .catch(() => {});
        };
        login();
    }

    private csrfToken: string | undefined = undefined;

    delete = async (contentId: string): Promise<void> => {
        const result = await fetch(`${this.baseUrl}/${contentId}`, {
            method: "delete",
            headers: {
                "CSRF-Token": this.csrfToken ?? "",
            },
        });
        if (!result.ok) {
            throw new Error(
                `Error while deleting content: ${result.status} ${
                    result.statusText
                } ${await result.text()}`,
            );
        }
    };

    getEdit = async (contentId: string): Promise<IEditorModel> => {
        const res = await fetch(`${this.baseUrl}/${contentId}/edit`);
        if (!res || !res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    };

    getPlay = async (
        contentId: string,
        contextId?: string,
        asUserId?: string,
        readOnlyState?: boolean,
    ): Promise<IPlayerModel> => {
        const query = new URLSearchParams();
        if (contextId) {
            query.append("contextId", contextId);
        }
        if (asUserId) {
            query.append("asUserId", asUserId);
        }
        if (readOnlyState === true) {
            query.append("readOnlyState", "yes");
        }

        const queryString = query.toString();

        const res = await fetch(
            `${this.baseUrl}/${contentId}/play${
                queryString ? `?${queryString}` : ""
            }`,
        );
        if (!res || !res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }
        return res.json();
    };

    list = async (): Promise<IContentListEntry[]> => {
        const result = await fetch(this.baseUrl, {
            headers: {
                "CSRF-Token":
                    localStorage.getItem("csfr") ??
                    "PADv2lCb-41hVK4v644fV-cfrkFwM33ves90",
            },
        });
        if (result.ok) {
            return result.json();
        }
        throw new Error(
            `Request to REST endpoint returned ${result.status} ${
                result.statusText
            }: ${await result.text()}`,
        );
    };

    save = async (
        contentId: string,
        requestBody: { library: string; params: unknown },
    ): Promise<{ contentId: string; metadata: IContentMetadata }> => {
        const body = JSON.stringify(requestBody);

        const res = contentId
            ? await fetch(`${this.baseUrl}/${contentId}`, {
                  method: "PATCH",
                  headers: {
                      "Content-Type": "application/json",
                      "CSRF-Token": this.csrfToken ?? "",
                  },
                  body,
              })
            : await fetch(this.baseUrl, {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json",
                      "CSRF-Token": this.csrfToken ?? "",
                  },
                  body,
              });

        if (!res || !res.ok) {
            throw new Error(
                `${res.status} ${res.statusText} - ${await res.text()}`,
            );
        }
        return res.json();
    };
    generateDownloadLink = (contentId: string): string =>
        `${this.baseUrl}/download/${contentId}`;

    setCsrfToken = (csrfToken: string): void => {
        this.csrfToken = csrfToken;
    };
    getCsrfToken = (): string | undefined => {
        return this.csrfToken;
    };
}

export const ContentServiceInstance = new ContentService(CONTENT_URL);
