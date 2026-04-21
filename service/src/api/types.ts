type Api = {
    getData: () => Promise<UserData>;
};

type Adapter = (defaultApi: Api) => Api;

export type { Api, Adapter };
