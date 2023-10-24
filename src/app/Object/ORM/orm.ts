import "reflect-metadata";
export function attributeToDisplay() {
    return (target: Object, propertyKey: string) => {
        let attributes: string[] = Reflect.getMetadata("attributes", target) || [];
        attributes.push(propertyKey);
        Reflect.defineMetadata("attributes", attributes, target);
    }
}