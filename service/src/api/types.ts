type Api = {
    getData: () => Promise<DynamicData>;
};

type Adapter = (defaultApi: Api) => Api;

export type { Api, Adapter };
