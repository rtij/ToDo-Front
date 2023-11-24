export type ServerData = [] | Object;
export type ServiceData = { name: string, data: ServerData }[];

export class ServiceDataManager<T>{

    DataSetter(type: new () => T, ServiceData: ServiceData, ServerData: ServerData) {
        let r = ServiceData.find((item) => {
            return item.name == type.name;
        });
        if (r) {
            r.data = ServerData;
        } else {
            let name: string = type.name
            ServiceData.push({ "name": name, "data": ServerData });
        }
        return ServiceData;
    }
}