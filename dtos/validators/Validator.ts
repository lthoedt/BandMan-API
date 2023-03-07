export default abstract class Validator {
    protected abstract validationFunctions : Array<(value : string) => string | undefined>;
    
    public validate(value : string) : string[] {
        const errors : string[] = [];

        for (const validator of this.validationFunctions) {
            const result : string | undefined = validator(value)
            if (result === undefined) continue;

            errors.push(result);
        }

        return errors;
    }

    public reset() {};
}