import { Guid as GuidPackage } from 'js-guid';

export default class Guid extends GuidPackage {
    toUniqueString = () : string => this.toString().replace(/[^a-zA-Z]/g, "");
}