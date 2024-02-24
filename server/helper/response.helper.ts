import l, { logger } from '../common/logger';


export interface IErrorObject {
	message: string,
	code: number
}


export function manageError(err, uniqueKeysMapList = []): IErrorObject {

	l.error(err);
	

	logger.error(err);

	let errObject = {
		message: 'Error in operation',
		code: 400,
		...err
	};

	const code = err.code || err.statusCode;

	if (Array.isArray(err.errors)) {
		let msg = '';
		err.errors.forEach(function (err) {
			if (msg) msg += ' ,';
			msg += err.message;
		});

		errObject.message = msg;

		errObject.code = 422;
	}


	if (err.message && code) {
		if (err.code === 11000) {
			uniqueKeysMapList.forEach((uniqueKeyMap) => {
				if (err.message.includes(uniqueKeyMap.searchable)) {
					errObject[uniqueKeyMap.key] = {
						message: `${uniqueKeyMap.key} already exists`
					};
				}
			});
		} else {
			errObject.message = err.message;
			errObject.code = code;
		}

	}
	else if (err.message && err.name == 'TypeError') {
		errObject.message = err.message;
		errObject.code = 422;
	}
	else if (err.message) {
		errObject.message = err.message;
		errObject.code = 422;
	}

	if (typeof errObject.code !== 'number' || errObject.code > 500 || errObject.code < 400) {

		errObject.code = 400;
		errObject.message = 'Please contact with admin for this issue!'
	}

	return errObject;
}