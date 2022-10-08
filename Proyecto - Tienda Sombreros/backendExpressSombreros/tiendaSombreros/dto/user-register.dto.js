var Type = require('@sinclair/typebox');
var Ajv = require('ajv');
var addFormats = require('ajv-formats');
var addErrors = require('ajv-errors');

const RegisterDTOSchema = Object({
    
		id: Number({
            format:'uuid', 
            errorMessage: {
                type: 'El tipo de id no es valido',
                format: 'el formato no es valido'
            }
        }),
		nombre: String({
            minLength: 2,
            maxLength: 20,
            errorMessage: {
                minLength: 'El nombre debe de tener minimo 2 caracteres de longitud',
                maxLength: 'El nombre debe tener como maximo 20 caracteres de longitud'
            }
        }),
		apellido: String({
            minLength: 4,
            maxLength: 50,
            errorMessage: {
                minLength: 'El apellido debe de tener minimo 2 caracteres de longitud',
                maxLength: 'El apellido debe tener como maximo 20 caracteres de longitud'
            }
        }),
		usario: String(),
		direccion: {
			pais: String(),
			ciudad: String(),
			calle: String()
		},
		correo: String({
            format: 'email',
            errorMessage: {
                type: 'El email no es valido',
                format: 'El formato del emaio no es valido'
            }
        }),
		clave: String({
            format: 'password',
            minLength: 8,
            maxLength: 25,
            errorMessage: {
                type: 'El tipo de la contraseña no es valido',
                format: 'El formato de la contraseña no es valido',
                minLength: 'La clave debe de tener minimo 8 caracteres de longitud',
                maxLength: 'La clave debe tener como maximo 25 caracteres de longitud'
            }
        }),
		img_url: String()

})

const ajv = new Ajv({allErrors: true});
ajv.addFormat('password', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema);
const userRegisterDTO = (req, res, next) => {
    const isDTOValid = validateSchema(req.body)
    if(!isDTOValid){
        return res.status(400).send(ajv.errorsText(validateSchema.errors, {separator: '\n'}))
    }
    next();
}
