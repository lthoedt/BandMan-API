import FailedToConvertFromJSONException from "../../exceptions/dtos/FailedToConvertFromJSONException";
import DTO from "../DTO";
import RequiredValidator from "../validators/RequiredValidator";
import Validator from "../validators/Validator";

const requiredMetadataKey = Symbol("required");

// This class holds all errors for a a given field when converting to DTO.
export class FieldError {
	field: string;
	errors: string[] = [];

	constructor(field: string, errors?: string[]) {
		this.field = field;
		if (errors !== undefined) this.errors = errors;
	}

	public hasErrors = (): boolean => this.errors.length > 0;

	public addErrors = (errors: string[]): void => {
		this.errors = this.errors.concat(errors);
	};
}

// Automatically builds a DTO.
// It only builds the fields that have a default value.
export function buildDTO(
	target: typeof DTO,
	name: string,
	descriptor: PropertyDescriptor
) {
	const original: Function = descriptor.value;

	if (typeof original !== "function") return descriptor;

	descriptor.value = (json: any) : DTO | Error => {
		// Create the DTO object.
		const dto: DTO = new target();

		// Each property of the DTO.
		for (const [property, defaultValue] of Object.entries(dto)) {
			let value: Object | DTO;

			// Parse to DTO if the prop is a DTO.
			if (defaultValue instanceof DTO) {
				// @ts-ignore
				value = defaultValue.constructor.fromJSON(json);
			} else {
				// It is not a dto, so it must be a field.
				value = json[property];
				// Undefined means its optional and not given.
				if (value !== undefined) {
					// Keep string as string and not string object.
					if (typeof defaultValue != "string")
						value = new defaultValue.constructor(value);
				}
			}

			Object.defineProperty(dto, property, { value: value });
		}

		return dto;
	};

	return descriptor;
}

// Runs for each field, its validators. If a validation fails, it throws an error.
export function applyValidators(
	target: Object,
	name: string,
	descriptor: PropertyDescriptor
) {
	const original: Function = descriptor.value;
	if (typeof original !== "function") return descriptor;

	const properties: Map<string, Validator[]> = Reflect.getOwnMetadata(
		requiredMetadataKey,
		target
	);

	// Returns true if it is isnt required and it has no value.
	const optionalParameterIsEmpty = (validators: Validator[], value: string) =>
		!(validators[0] instanceof RequiredValidator) &&
		new RequiredValidator().validate(value).length > 0;

	const resetValidators = () => {
		for (const validators of properties.values()) {
			for (const validator of validators) validator.reset();
		}
	};

	descriptor.value = (json: any) : DTO | Error => {
		// Errors generated when a property is created.
		const errors: FieldError[] = [];

		// Run validators per field.
		properties.forEach((validators: Validator[], field) => {
			// Value supplied by the user in the json.
			const value: string = json[field];

			// Skip validation if this field is optional and empty.
			if (optionalParameterIsEmpty(validators, value)) return;

			const fieldError: FieldError = new FieldError(field);

			// Validate each validator.
			for (const validator of validators) {
				const validationErrors: string[] = validator.validate(value);

				// Add potential errors to the fieldError object.
				fieldError.addErrors(validationErrors);

				// If the RequiredValidator returned invalid, dont check the other validators.
				if (validator instanceof RequiredValidator && fieldError.hasErrors()) break; 
			}
			
			// Store field error if it has errors.
			if (fieldError.hasErrors()) errors.push(fieldError);
		});

		resetValidators();

		// There are no errors so the converting will go successfully.
		if (errors.length == 0) return original.apply(this, [json]);
		// There are errors, send them to the used.
		else throw new FailedToConvertFromJSONException(errors);
	};

	return descriptor;
}

export function validateWith(...validators: (typeof Validator | Validator)[]) {
	return (
		target: DTO | Object | undefined,
		propertyKey: string | ClassFieldDecoratorContext
	) => {
		if (typeof propertyKey != "string" || target == undefined) return;

		let existingRequiredParameters: Map<string, Validator[]> =
			Reflect.getOwnMetadata(requiredMetadataKey, target.constructor) ||
			new Map<string, Validator[]>();

		existingRequiredParameters.set(
			propertyKey,
			validators.map<Validator>(
				// @ts-ignore, (maby typescript can handle extended of types someday.)
				(validator: typeof Validator | Validator) =>
					typeof validator == "object"
						? validator
						: new validator(propertyKey)
			)
		);

		Reflect.defineMetadata(
			requiredMetadataKey,
			existingRequiredParameters,
			target.constructor
		);
	};
}
