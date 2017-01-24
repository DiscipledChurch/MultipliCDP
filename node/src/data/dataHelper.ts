export class DataHelper {
    public static execute(tmp: Function) : any {
        var rTmp = tmp();
    }

    public static create<T>(tmp: Function) : T {
        var rTmp : T;

        return rTmp;
    }

}